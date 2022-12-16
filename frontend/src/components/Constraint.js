import React from 'react';
import ConstraintField from './ConstraintField';
import SelectBox from './SelectBox';

const Constraint = ({
  number,
  errorA,
  errorB,
  errorY,
  onChange,
  onBlur,
  a,
  b,
  y,
  customName,
  sign,
  setSign,
}) => {
  return (
    <div>
      <h2 style={{ textAlign: 'left', fontSize: 20 }}>Constraint {number} :</h2>
      <div className="p-3 d-flex gap-2 align-items-center">
        <ConstraintField
          number={1}
          error={errorA}
          value={a}
          onChange={onChange}
          onBlur={onBlur}
          name={customName ? `${customName}a` : `cons${number}A`}
        />
        <span>+</span>
        <ConstraintField
          number={2}
          error={errorB}
          value={b}
          onChange={onChange}
          onBlur={onBlur}
          name={customName ? `${customName}b` : `cons${number}B`}
        />
        <SelectBox
          fields={['≤', '≥']}
          selected={sign}
          onChange={setSign}
          name={customName ? `${customName}sign` : `cons${number}Sign`}
        />
        <input
          type="text"
          placeholder="0"
          aria-label="variable"
          aria-describedby="variable x value"
          id={customName ? `${customName}y` : `cons${number}Y`}
          name={customName ? `${customName}y` : `cons${number}Y`}
          value={y}
          onChange={onChange}
          onBlur={onBlur}
          className={`form-control ${errorY ? 'is-invalid' : 'is-valid'}`}
          required
        />
      </div>
      {(errorA || errorB || errorY) && (
        <div className="justify-content-center d-flex">
          <span className="error-message col-3 px-3">{errorA}</span>
          <span className="error-message col-6"> {errorB}</span>
          <span className="error-message col-3"> {errorY}</span>
        </div>
      )}
    </div>
  );
};

export default Constraint;
