from typing import List, Dict, Union
from pydantic import BaseModel


class LPP(BaseModel):
  """
  Data model for a linear programming problem
  """
  objective: str
  objective_function: Dict[str, int]
  constraints: List[Dict[str, Union[int, str]]]
