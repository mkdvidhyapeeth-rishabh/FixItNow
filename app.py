from fastapi import FastAPI

app = FastAPI()

@app.get("/match")
def match():
    return {"worker": "Best match based on distance"}
