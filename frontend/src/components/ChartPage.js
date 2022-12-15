import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMaxValues, compute,getPoints } from '../functions/compute'
import { setDisplay } from '../redux/actions/setDisplayAction'
import Chart from './Chart'
import VariablesTable from './VariablesTable'

const ChartPage = () => {
  const { objective,objectiveFunction,constraints,result  } = useSelector(state => state.graphReducer)
  const dispatch = useDispatch()
  const [values,setValues] = useState([])
  const [points,setPoints] = useState([])
  useEffect(() => {
    setValues(compute(constraints));
  },[constraints])
  useEffect(() => {
    if(constraints.length)setPoints(getPoints(constraints,values));
  },[values,constraints])

  
  return (
    <div className='pt-5'>
        <h3>The problem is stated as follows:</h3>
        <h3>Objective Function</h3>
        <p>{objective}{' '}
            <span  className="X" >
                {objectiveFunction.a !== 1 ? objectiveFunction.a : ''}<span className="X plain-text">X<span className='number'>{1}</span></span> + 
                {' '}{objectiveFunction.b !== 1 ? objectiveFunction.b : ''}<span className="X plain-text">X<span className='number'>{2}</span></span>
            </span>
        </p>
        <h3>Subject to:</h3>
        {constraints.map((item,i) => (
                <p key={i}>Constraint {i+1}:{' '}
                    <span className="X" >
                        {item.a !== 1 ? item.a : ''}<span className="X plain-text">X<span className='number'>{1}</span></span> + 
                        {' '}{item.b !== 1 ? item.b : ''}<span className="X plain-text">X<span className='number'>{2}</span></span> {item.sign} {item.y}
                    </span>
                </p>
        ))}

            <span className='d-flex justify-content-center'>
                  <span className="input-group-text X plain-text" id="basic-addon2">X<span className='number'>{1}</span></span>,
                  <span className="input-group-text X plain-text" id="basic-addon2">X<span className='number'>{2}</span></span>
              {'≥'}0
            </span>

        <button type="button" onClick={()=>dispatch(setDisplay("form"))} className="btn btn-outline-info mt-4">Edit coefficients</button>
        <Chart data={points} values={values} extended={points.length ? addMaxValues(constraints,points) : points} />
        <VariablesTable result={result} objectiveFunction={objectiveFunction} values={values} objective={objective} />
        {result.status === "optimal" ? 
        <div className="d-flex justify-content-center align-items-center pt-2">
        <div className="card text-bg-success m-3" style={{maxWidth: '22rem'}}>
            <div className="card-body">
              <h5 className="card-title">The optimal solution is <b>Z = {result.solution.objective}</b></h5>
              <p className="card-text">Obtained for values x1={result.solution.x1}, 
              x2={result.solution.x2}</p>
            </div>
        </div>
        </div>:
          <div className="d-flex justify-content-center align-items-center pt-2">
            <div className="card text-bg-danger mb-3" style={{maxWidth: '18rem'}}>
                <div className="card-body">
                  <h5 className="card-title">There is no solution to this problem, unbounded or infeasible</h5>
                </div>
            </div>
          </div>}   
    </div>
  )
}

export default ChartPage