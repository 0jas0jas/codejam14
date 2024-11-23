from typing import Union
from freestyle import HealthScoreByID, Stack, score_stack

from fastapi import FastAPI

health_stack = Stack()

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# main(id) -> progressValue
@app.get("/freestyle/{productID}")
def read_item(productID: int, q: Union[str, None] = None):
    hScore = HealthScoreByID(productID)
    if hScore == -1:
        return {"Progress Value": health_stack.peek(), "q":q, "health stack": health_stack, "score stack": score_stack}
    else:
        print(health_stack.push(hScore))
        return {"Progress Value": hScore, "q":q, "health stack": health_stack, "score stack": score_stack}