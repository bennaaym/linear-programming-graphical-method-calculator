import React, { useEffect, useState } from 'react';

const Examples = ({ setSelected, selected }) => {
  const [examples, setExamples] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('examples'));
    if (items) {
      setExamples(items);
    }
  }, []);
  return (
    <div>
      <h3>Predefined Examples</h3>
      <div
        className="btn-toolbar d-flex justify-content-center"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div className="btn-group me-2" role="group" aria-label="First group">
          {examples.map((item, i) => (
            <button
              type="button"
              onClick={() => setSelected(i + 1)}
              className={`btn ${
                i + 1 !== selected ? 'btn-outline-primary' : 'btn-primary'
              }`}
              key={i}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Examples;
