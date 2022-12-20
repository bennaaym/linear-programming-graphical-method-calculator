import React from 'react';

const ConstraintField = ({ number, value, onChange, onBlur, name, error }) => {
  return (
    <>
      <div className="input-group">
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type="text"
          className={`form-control ${error ? 'is-invalid' : 'is-valid'}`}
          required
          placeholder="0"
          aria-label="variable"
          aria-describedby="variable x value"
        />
        <span className="input-group-text X" id="basic-addon2">
          X<span className="number">{number}</span>
        </span>
      </div>
    </>
  );
};

export default ConstraintField;
