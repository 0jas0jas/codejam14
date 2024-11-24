import datetime
import json

import requests 

class Stack:
    def __init__(self):
        self.scores = [] # stores the total score
        self.products = [] # stores product name
        self.indiv_scores = [] # stores individual score
        self.max_score = 0
        self.categories = {'good' : 0, 'bad' : 0, 'neutral' : 0}

    def push(self, item):
        self.scores.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Pop from an empty stack")
        self.length -= 1
        self.max_score -= 10
        return self.scores.pop()

    def peek(self):
        if self.is_empty():
            return 0
        return self.scores[-1]

    def is_empty(self):
        return len(self.scores) == 0

    def size(self):
        return len(self.scores)
    
    def add_score(self, score_new : int, prod_name : str):
        self.push(self.peek() + score_new)
        self.max_score += 10
        self.products.append(prod_name)
        if score_new < 0:
            self.indiv_scores.append(str(score_new))
            self.categories['bad'] += 1
        elif score_new > 0:
            self.indiv_scores.append("+" + str(score_new))
            self.categories['good'] += 1
        else: 
            self.indiv_scores.append(str(score_new))
            self.categories['neutral'] += 1

    def __str__(self):
        return f"Stack({self.scores})"

score_stack = Stack()

score_map = {'a' : 10, 'b' : 5, 'c' : 0, 'd' : -5, 'e' : -10}

def RoundProgScore(total_score):
    if total_score % 5 == 0:
        return total_score
        
    for x in range(11):
        peg = 10*x
        peg2 = 5*(2*x + 1)
        if (peg - 2.5) <= total_score and total_score < (peg + 2.5):
            return peg
        elif (peg2 - 2.5) <= total_score and total_score < (peg2 + 2.5):
            return peg2
        

def TotalScoreByNutriscore (stack : Stack, nutri_score_from_stack):
    score_temp = nutri_score_from_stack / stack.max_score # now in range [-1, 1]
    score_final = (score_temp * 50) + 50 # [-1, 1] => [-50, 50] => [0, 100]
    print(RoundProgScore(score_final))
    return RoundProgScore(score_final)

def HealthScoreByID(ID : int):
    # construct API URL and get the response
    product_id = str(ID)
    request_url = f"https://world.openfoodfacts.org/api/v0/product/{product_id}.json"
    response = requests.get(request_url) 
    info_dict = json.loads(response.text)

    #print('response received')

    # product not found in database
    if info_dict['status'] == 0: 
        return -1 

    # find most recent year for which nutriscore exists
    current_year = str(datetime.date.today().year)

    while True:
        if current_year not in info_dict['product']['nutriscore']:
            current_year = int(current_year)
            current_year -= 1
            current_year = str(current_year)
        else:
            #print(current_year)
            break

    grade = info_dict['product']['nutriscore'][current_year]['grade']

    # handle non-letter grades
    if grade not in score_map:
        return -1
        #print(grade)
    else:
        score = score_map[grade]
        #print(score)
        #print('stack before adding', score_stack)
        prod_name = info_dict['product']['product_name']
        score_stack.add_score(score, prod_name)
        #print('stack after adding', score_stack)

        return int(TotalScoreByNutriscore(score_stack, score_stack.peek()))
    
def get_stats():
    return (score_stack.products, score_stack.indiv_scores, score_stack.categories)

if __name__ == '__main__':
    #score_stack.add_score(10)
    #print(score_stack)
    #print(TotalScoreByNutriscore(score_stack, score_stack.peek()))
    print('1st 10')
    s1 = HealthScoreByID(3242274002053)
    #print(score_stack)
    print(s1)

    print('2nd 10')
    s2 = HealthScoreByID(3242274002053)
    #print(score_stack)
    print(s2)

    print('3rd id with 0')
    s3 = HealthScoreByID(123456)
    #print(score_stack)
    print(s3)


    '''
    score_stack.add_score(-10)
    score_stack.add_score(-5)
    score_stack.add_score(-5)
    print(score_stack)

    print(TotalScoreByNutriscore(score_stack, score_stack.peek()))


    score_stack.add_score(10)
    print(score_stack)
    print(TotalScoreByNutriscore(score_stack, score_stack.peek()))

    score_stack.add_score(5)
    print(score_stack)
    print(TotalScoreByNutriscore(score_stack, score_stack.peek()))

    score_stack.add_score(-10)
    print(score_stack)
    print(TotalScoreByNutriscore(score_stack, score_stack.peek()))

    score_stack.add_score(-10)
    print(score_stack)
    print(TotalScoreByNutriscore(score_stack, score_stack.peek()))

    '''

    #s = add_score_by_ID(3045140105502)
    #s = nutriscore_by_ID(123)
    #print(s)