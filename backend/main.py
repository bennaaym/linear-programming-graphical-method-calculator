from fastapi import FastAPI, HTTPException
from solver import solve_lpp
from model.lpp_model import LPP



app = FastAPI()

# Endpoint
@app.post("/")
def solve(lpp: LPP):
  result = solve_lpp(lpp)
  return {
    "result": result,
  }