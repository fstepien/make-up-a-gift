import React from "react";

const Footer = () => (
  <footer className="App-footer">
    <div className="wrap">
      <p>
        &copy; 2018 Made by{" "}
        <a
          href="https://filipstepien.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Filip
        </a>,{" "}
        <a
          href="https://github.com/Armox"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lucas
        </a>{" "}
        &{" "}
        <a
          href="http://www.zenajun.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zena
        </a>
      </p>
      <p>
        Built using the{" "}
        <a
          href="https://makeup-api.herokuapp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Makeup API
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
