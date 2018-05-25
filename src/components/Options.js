import React from "react";

class Options extends React.Component {
  render() {
    const { selectedType, toggleSelect } = this.props;
    return (
      <div className="type-list">
        {Object.keys(selectedType)
          .filter(key => !selectedType[key])
          .map((key, i) => (
            <div key={i} name={key} onClick={() => toggleSelect(key)}>
              {key.replace(/_/g, " ").toUpperCase()}
            </div>
          ))}
      </div>
    );
  }
}

export default Options;
