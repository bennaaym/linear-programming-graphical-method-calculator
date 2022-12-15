import solutionService from "../services/solution.service"
import { setResult } from "../redux/actions/setResultAction"
export const solve = async (objective,objective_function,constraints,dispatch) => {
    const constraints_modified = constraints.map((item,i) => {
        return ({...item,sign: item.sign === '≥' ? '>=' : '<='})
    })
    await solutionService.solve({objective: objective === 'Maximize' ? 'maximization' : 'minimization',objective_function,constraints: [...constraints_modified,
      {
        a: 1,
        b: 0,
        sign: ">=",
        y: 0
      },
      {
        a: 0,
        b: 1,
        sign: ">=",
        y: 0
      }]}).then(response => {
        dispatch(setResult(response.data?.result))
      })
      .catch(error => console.error(error))
}