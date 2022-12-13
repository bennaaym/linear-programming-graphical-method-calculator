from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from solver import solve_lpp
from model.lpp_model import LPP
import json



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint
@app.post("/")
def solve(lpp: LPP):
  result = solve_lpp(lpp)
  return {
    "result": result,
  }

@app.get("/examples")
def get_examples():
  with open("./db/examples.json") as file:
    examples = json.load(file)
    return examples