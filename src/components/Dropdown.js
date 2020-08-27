import React, { useState, useEffect, useRef, Fragment } from "react";

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    if (selected.value === option.value) {
      return null;
    }
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <Fragment>
      <div ref={ref} className="ui form">
        <div className="field">
          <label className="label">{`Select a ${label}`}</label>
          <div
            onClick={() => setOpen(!open)}
            className={`ui selection dropdown ${open ? `visible active` : ``}`}
          >
            <i className="dropdown icon"></i>
            <div className="text">{selected.label}</div>
            <div className={`menu ${open ? `visible transition` : ``}`}>
              {renderedOptions}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dropdown;