import React from 'react';

const SelectBox = ({
  title,
  fields,
  selected,
  setSelected,
  onChange,
  name,
}) => {
  function handleChange(e) {
    let value = e.target.value;
    if (setSelected) setSelected(value);
    else if (onChange) onChange(name, value);
  }
  return (
    <>
      <h2 style={{ textAlign: 'left', fontSize: 20 }}>{title || ''}</h2>
      <select
        defaultValue={selected}
        value={selected}
        onChange={(e) => handleChange(e)}
        className="form-select"
        aria-label="Default select example"
      >
        {fields.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectBox;
