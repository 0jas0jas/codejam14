from typing import Union
from freestyle import HealthScoreByID, Stack, score_stack, get_stats
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI

health_stack = Stack()

app = FastAPI()

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
    hScore = HealthScoreByID(productID)
    if hScore == -1:
        return {"Progress Value": health_stack.peek(), "q":q, "health stack": health_stack, "total score stack": score_stack}
    else:
        print(health_stack.push(hScore))
        return {"Progress Value": hScore, "q":q, "health stack": health_stack, "total score stack": score_stack}
    
