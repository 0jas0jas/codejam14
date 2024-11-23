import os
import re 
import datetime
import json

import requests 

class Stack:
    def __init__(self):
        self.items = [0]

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Pop from an empty stack")
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Peek from an empty stack")
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)
    
    def add_score(self, score_new):
        self.push(self.peek() + score_new)

    def __str__(self):
        return f"Stack({self.items})"

score_stack = Stack()

score_map = {'a' : 10, 'b' : 5, 'c' : 0, 'd' : -5, 'e' : -10, 'unknown' : 0}

def add_score_by_ID(ID):
    # construct API URL and get the response
    product_id = str(ID)
    request_url = f"https://world.openfoodfacts.org/api/v0/product/{product_id}.json"
    response = requests.get(request_url) 
    info_dict = json.loads(response.text)

    print('response received')

    # find most recent year for which nutriscore exists
    current_year = str(datetime.date.today().year)

    if len(info_dict['product']['nutriscore']) == 0:
            print("No score exists for this product")

    while True:
        if current_year not in info_dict['product']['nutriscore']:
            current_year = int(current_year)
            current_year -= 1
            current_year = str(current_year)
        else:
            print(current_year)
            break
    
    grade = info_dict['product']['nutriscore'][current_year]['grade']

    score = score_map[grade]
        
    score_stack.add_score(score)

    return score


#s = add_score_by_ID(3045140105502)
s = add_score_by_ID(96619281954)
print(s)