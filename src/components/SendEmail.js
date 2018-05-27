import React, { Component } from "react";
import axios from "axios";

class SendEmail extends Component {
  state = {
    productOne: "",
    categoryOne: "",
    productTwo: "",
    categoryTwo: "",
    productThree: "",
    categoryThree: ""
  };

  nameRef = React.createRef();
  emailRef = React.createRef();
  notesRef = React.createRef();

  sendEmail = e => {
    e.preventDefault();
    const name = this.nameRef.current.value;
    const email = this.emailRef.current.value;
    const notes = this.notesRef.current.value;
    const url = "https://filipstepien.com";
    console.log(name, email, notes);
    axios
      .post(`https://us-central1-make-up-a-gift.cloudfunctions.net/httpEmail`, {
        toName: name,
        toEmail: email,
        url: url
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="send-email">
        <h4>Send Gift Information by Email</h4>
        <form className="send-email-form" onSubmit={this.sendEmail}>
          <input
            name="name"
            ref={this.nameRef}
            type="text"
            placeholder="Name"
            required
          />
          <input
            name="email"
            ref={this.emailRef}
            type="text"
            placeholder="Email"
            required
          />
          <textarea
            name="notes"
            ref={this.notesRef}
            id=""
            cols="30"
            rows="10"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default SendEmail;
