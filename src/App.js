import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Options from "./components/Options";
import Selected from "./components/Selected";
import Slider from "./components/Slider";

class App extends Component {
  state = {
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
    },
    minmax: {
      blush: { min: 0, max: 0, avg: 0 },
      bronzer: { min: 0, max: 0, avg: 0 },
      eyebrow: { min: 0, max: 0, avg: 0 },
      eyeliner: { min: 0, max: 0, avg: 0 },
      eyeshadow: { min: 0, max: 0, avg: 0 },
      foundation: { min: 0, max: 0, avg: 0 },
      lip_liner: { min: 0, max: 0, avg: 0 },
      lipstick: { min: 0, max: 0, avg: 0 },
      mascara: { min: 0, max: 0, avg: 0 },
      nail_polish: { min: 0, max: 0, avg: 0 }
    },
    budget: { min: 1, max: 1000, range: 500 }
  };

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
        const minmax = { ...this.state.minmax };
       
        const newTest = res.data.filter((item)=> {
          if (item.price !== null && item.price !== ''){ 
            return parseInt(item.price) 
          }
        });
        console.log(newTest);
        

        products[product] = res.data;
        this.setState({ products });
      })
      .catch(err => console.log(err));
  }

  toggleSelect = key => {
    const selectedType = { ...this.state.selectedType };
    selectedType[key] = !selectedType[key];
    this.setState({ selectedType });
  };

  setBudget = value => {
    const budget = { ...this.state.budget };
    budget.range = value;
    this.setState({ budget });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Make Up A Gift</h1>
        </header>
        <section className="select">
          <div className="wrap type">
            <Options
              toggleSelect={this.toggleSelect}
              selectedType={this.state.selectedType}
            />
            <Selected
              toggleSelect={this.toggleSelect}
              selectedType={this.state.selectedType}
            />
          </div>
          <div className="slider wrap">
            <Slider budget={this.state.budget} setBudget={this.setBudget} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
