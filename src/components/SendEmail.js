import React, { Component } from "react";

export default class SendEmail extends Component {
  state = {
    name: "",
    email: "",
    note: "",
    productOne: "",
    categoryOne: "",
    productTwo: "",
    categoryTwo: "",
    productThree: "",
    categoryThree: ""
  };
  render() {
    return (
      <div className="send-email">
        <h4>Send Gift Information by Email</h4>
      </div>
    );
  }
}
