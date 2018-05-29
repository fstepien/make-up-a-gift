import React from "react";
import styled from "styled-components";

const Slider = props => {

  let {max, min, range} = props.budget
  const maxDollar = (max/100).toLocaleString("en-US", { style: "currency", currency: "USD" });
  const minDollar = (min/100).toLocaleString("en-US", { style: "currency", currency: "USD" });
  const rangeDollar = (range/100).toLocaleString("en-US", {style: "currency", currency: "USD"});
  console.log(min, max)
  
  return (
    <div className="sliderContainer">
      <p>Budget: {rangeDollar} </p>
      <span>
        {minDollar}
        <input
          type="range"
          min={min}
          max={max}
          onChange={e => {
            props.setBudget(e.target.value);
          }}
        />
        {maxDollar}
      </span>
    </div>
  );
};

export default Slider;

const Input = styled.input`
  border: 1px solid black; 
`;
