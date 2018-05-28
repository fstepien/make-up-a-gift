import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

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

  sendEmail = e => {
    e.preventDefault();
    const name = this.nameRef.current.value;
    const email = this.emailRef.current.value;
    const url = "https://filipstepien.com";
    console.log(name, email);
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
        <h2>Send Gift Information by Email</h2>
        <Form className="send-email-form" onSubmit={this.sendEmail}>
          <Input
            name="name"
            ref={this.nameRef}
            type="text"
            placeholder="Name"
            required
          />
          <Input
            name="email"
            ref={this.emailRef}
            type="text"
            placeholder="Email"
            required
          />
          <Input type="submit" />
        </Form>
      </div>
    );
  }
}

export default SendEmail;

const Form = styled.form`
  text-align: center;
`;

const Input = styled.input`
  width: 90%;
  color: #333;
  background: #ffecda;
  border: solid 1px #ff86a0;
  border-radius: 2px;
  margin: 15px auto;
  font-size: 20px;

  padding: 0.3rem 1rem;
  &::placeholder {
    color: #ff86a0;
    font-style: italic;
  }
  &[type="submit"] {
    text-align: center;
    font-weight: bold;
    color: #ff86a0;
    background: #ffecda;
  }
  &[type="submit"]:hover {
    background: #ff86a0;
    color: #ffecda;
  }
`;
