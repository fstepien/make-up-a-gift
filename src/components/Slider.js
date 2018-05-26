import React from "react";

const Slider = props => {
  return (
    <div>
      <p>Budget: ${props.budget.range} </p>
      <span>
        {props.budget.min}
        <input
          type="range"
          min={props.budget.min}
          max={props.budget.max}
          onChange={e => {
            props.setBudget(e.target.value);
          }}
        />
        {props.budget.max}
      </span>
    </div>
  );
};

export default Slider;
