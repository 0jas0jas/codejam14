import json
from typing import Union
from freestyle import HealthScoreByID, Stack, get_cals, score_stack, get_stats
from fastapi.middleware.cors import CORSMiddleware
from OA import ProdNameByID, isIndian

from fastapi import FastAPI
from OA import generate_new_recipes

health_stack = Stack()

app = FastAPI()
names = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, change to specific domains for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/freestyle/stats")
def get_stats_info(q: Union[str, None] = None):
    prods, indivs, cats = get_stats()
    print(cats["bad"])
    return {"q": q, "good": cats['good'], "bad": cats['bad'], "neutral": cats['neutral'], "products": prods, "individual scores": indivs}

# main(id) -> progressValue
@app.get("/freestyle/{productID}")
def read_item(productID: int, q: Union[str, None] = None):
    names.append(ProdNameByID(productID))
    hScore = HealthScoreByID(productID)
    if hScore == -1:
        return {"Progress Value": health_stack.peek(), "q":q, "health stack": health_stack, "total score stack": score_stack}
    else:
        print(health_stack.push(hScore))
        return {"Progress Value": hScore, "q":q, "health stack": health_stack, "total score stack": score_stack}
    

#
# THIS IS FOR CORNFUSION
#

@app.get("/cornfusion/{productID}")
def read_item(productID: int, q: Union[str, None] = None):
    result = generate_new_recipes(productID)
    # Slice the string and parse it as JSON
    try:
        json_result = json.loads(result[7:-3])
        return json_result  # FastAPI will serialize this to a proper JSON response
    except json.JSONDecodeError as e:
        # Handle cases where the result cannot be parsed as JSON
        return {"error": "Invalid JSON response from generate_new_recipes", "details": str(e)}
    
@app.get("/american/")
def get_cal(q: Union[str, None] = None):
    cals = get_cals()
    print(cals)
    return {"q":q, "total calories": cals}

@app.get("/indian/")
def get_response(q: Union[str, None] = None):
    print(names)
    response = isIndian(names)
    print(response)
    return {"q":q, "is_indian": response}

# 6kcal
# 