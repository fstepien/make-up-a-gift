import React, { Component } from "react";

const Slider = (props) => {

    return (
        <div>
            <p>Value: {} </p>
            <input 
                type="range" 
                min={props.budget.min} 
                max={props.budget.max} 
                onChange={(e)=> {props.setBudget(e.target.value)}}/>
        </div>
        )
    }

export default Slider