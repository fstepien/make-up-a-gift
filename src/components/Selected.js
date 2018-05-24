import React from "react";

const Selected = props => {
  console.log(props.selectedType);

  return <ul>{props.selectedType.map(() => {})}</ul>;
};

export default Selected;
