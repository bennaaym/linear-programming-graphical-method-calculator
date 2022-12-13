from docplex.mp.model import Model
from model.lpp_model import LPP


def solve_lpp(lpp: LPP) -> None:
  model = Model(name="Graphical Method Model")
  x1 = model.continuous_var(name="x1")
  x2 = model.continuous_var(name="x2")

  # add the constraints
  for constraint in lpp.constraints:
    if constraint["sign"] == "<=":
      model.add_constraint(model.sum([x1 * constraint["a"], x2 * constraint["b"]]) <= constraint["y"])
    elif constraint["sign"] ==  ">=":
      model.add_constraint(model.sum([x1 * constraint["a"], x2 * constraint["b"]]) >= constraint["y"])
    elif constraint["sign"] == "<":
      model.add_constraint(model.sum([x1 * constraint["a"], x2 * constraint["b"]]) < constraint["y"])
    elif constraint["sign"] == ">":
      model.add_constraint(model.sum([x1 * constraint["a"], x2 * constraint["b"]]) > constraint["y"])
    elif constraint["sign"] == "=":
      model.add_constraint(model.sum([x1 * constraint["a"], x2 * constraint["b"]]) == constraint["y"])

  # specify the objective
  if lpp.objective == "maximization":
    model.maximize(x1 * lpp.objective_function["a"] + x2 * lpp.objective_function["b"])
  
  elif lpp.objective == "minimization":
    model.minimize(x1 * lpp.objective_function["a"] + x2 * lpp.objective_function["b"])

  # solve the lpp
  solution = model.solve()

  if solution is not None:
    return {
      "status": solution._solve_details._solve_status,
      "solution": {
        "x1": x1.solution_value,
        "x2": x1.solution_value,
        "objective": solution._objective
      }
    }
  else:
    return {
      "status": model.solve_details.status,
      "solution": None
    }


