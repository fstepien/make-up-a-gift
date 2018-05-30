import React from "react";
import Overdrive from "react-overdrive";

class Selected extends React.Component {
  render() {
    const { selectedType, toggleSelect } = this.props;
    return (
      <div className="type-list">
        <h2>Selected:</h2>
        {Object.keys(selectedType)
          .filter(key => selectedType[key])
          .map(key => (
            <Overdrive id={key} key={key} duration={1000}>
              <div
                className="type-list-item"
                name={key}
                onClick={() => toggleSelect(key)}
              >
                {key.replace(/_/g, " ").toUpperCase()}
              </div>
            </Overdrive>
          ))}
      </div>
    );
  }
}

export default Selected;
