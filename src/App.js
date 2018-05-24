import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedType: {
        blush: false,
        bronzer: false,
        eyebrow: false,
        eyeliner: false,
        eyeshadow: false,
        foundation: false,
        lip_liner: false,
        lipstick: false,
        mascara: false,
        nail_polish: false
      },
      products: {
        blush: [],
        bronzer: [],
        eyebrow: [],
        eyeliner: [],
        eyeshadow: [],
        foundation: [],
        lip_liner: [],
        lipstick: [],
        mascara: [],
        nail_polish: []
      }
    };
  }

  componentDidMount() {
    for (let product in this.state.products) {
      this.getProductData(product);
    }
  }

  getProductData(product) {
    axios({
      method: "get",
      url: `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product}`,
      responseType: "json"
    })
      .then(res => {
        const products = { ...this.state.products };
        products[product] = res.data;
        this.setState({ products });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Make Up A Gift</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
