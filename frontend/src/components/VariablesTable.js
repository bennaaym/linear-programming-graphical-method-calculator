import React from 'react';

const VariablesTable = ({ values, objectiveFunction, result }) => {
  return (
    <div className="d-flex pt-5 justify-content-center ">
      <div className="col-lg-7 col-sm-9">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Point</th>
              <th scope="col">
                Coordinate(
                <span className="X plain-text">
                  X<span className="number">{1}</span>
                </span>
                ,
                <span className="X plain-text">
                  X<span className="number">{2}</span>
                </span>
                )
              </th>
              <th scope="col">
                Objective Function {objectiveFunction.a}
                <span className="X plain-text">
                  X<span className="number">{1} </span>
                </span>{' '}
                + {objectiveFunction.b}
                <span className="X plain-text">
                  X<span className="number">{2} </span>
                </span>{' '}
              </th>
            </tr>
          </thead>
          <tbody>
            {values.map((item, i) => (
              <tr
                key={i}
                className={
                  objectiveFunction.a * item.x1 +
                    objectiveFunction.b * item.x2 ===
                  result.solution?.objective
                    ? 'table-primary'
                    : ''
                }
              >
                <th scope="row">{String.fromCharCode(65 + i)}</th>
                <td>
                  {'('}
                  {item.x1},{item.x2}
                  {')'}
                </td>
                <td>
                  {objectiveFunction.a * item.x1 +
                    objectiveFunction.b * item.x2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariablesTable;
