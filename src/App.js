import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Options from "./components/Options";
import Selected from "./components/Options";

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

  toggleSelect = () => {
    console.log("change select state");
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Make Up A Gift</h1>
        </header>
        <section className="select">
          <div className="wrap">
            <Options
              toggleSelect={this.toggleSelect()}
              selectedType={this.state.selectedType}
            />
            <Selected
              toggleSelect={this.toggleSelect()}
              selectedType={this.state.selectedType}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
