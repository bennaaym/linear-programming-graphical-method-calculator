import React from 'react';
import ConstraintField from './ConstraintField';

const ObjectiveFunction = ({ a, b, onChange, onBlur, errors }) => {
  return (
    <div>
      <h2 style={{ textAlign: 'left', fontSize: 20 }}>Objective Function</h2>
      <div className="p-3 d-flex gap-4 align-items-center">
        <ConstraintField
          error={errors.objFuncA}
          value={a}
          onChange={onChange}
          onBlur={onBlur}
          number={1}
          name="objFuncA"
        />
        <span>+</span>
        <ConstraintField
          error={errors.objFuncB}
          value={b}
          onChange={onChange}
          onBlur={onBlur}
          number={2}
          name="objFuncB"
        />
      </div>
      {(errors.objFuncA || errors.objFuncB) && (
        <div className="justify-content-center d-flex">
          <span className="error-message col-6">{errors.objFuncA}</span>
          <span className="error-message col-5"> {errors.objFuncB}</span>
        </div>
      )}
    </div>
  );
};

export default ObjectiveFunction;
