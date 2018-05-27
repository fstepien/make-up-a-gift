import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Options from "./components/Options";
import Selected from "./components/Selected";
import Slider from "./components/Slider";
import ProductDisplay from "./components/ProductDisplay";

//REMOVE SEND EMAIL AND THIS IMPORT AFTER IT IS PLACED IN MODAL
import SendEmail from "./components/SendEmail";

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
    rates: { CAD: 1, GBP: 1, USD: 1 },
    budget: { min: 1, max: 1000, range: 500 }
  };

  componentDidMount() {
    axios({
      method: "GET",
      url:
        "http://data.fixer.io/api/latest?access_key=828f6dfc4a7815f24e3c45fbf819b227",
      responseType: "json"
    })
      .then(res => {
        const rates = { ...this.state.rates };
        // rates compared to EUR - fetching rates first to work with CAD
        rates.GBP = res.data.rates.CAD / res.data.rates.GBP;
        rates.USD = res.data.rates.CAD / res.data.rates.USD;
        this.setState({ rates });
      })
      .then(() => {
        for (let product in this.state.products) {
          this.getProductData(product);
        }
      });
  }

  getProductData = product => {
    axios({
      method: "GET",
      url: `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product}`,
      responseType: "json"
    })
      .then(res => {
        // this section fetches product data and uses the rates info to convert to CAD in cents
        const products = { ...this.state.products };
        products[product] = res.data
          //make sure price is not 0
          .filter(product => parseInt(product.price) > 0)
          .map(product => {
            product.currency === null && (product.currency = "CAD");
            product.price = parseInt(
              Number(product.price) * this.state.rates[product.currency] * 100
            );
            return product;
          });
        this.setState({ products });
      })
      .then(() => {
        // finding min, max, and average for each category
        const minmax = { ...this.state.minmax };
        const productPriceArr = this.state.products[product].map(product =>
          Number(product.price)
        );
        minmax[product].min = Math.min(...productPriceArr);
        minmax[product].max = Math.max(...productPriceArr);
        minmax[product].avg = parseInt(
          productPriceArr.reduce((a, b) => a + b, 0) / productPriceArr.length
        );
        // add min and max to budget if they are lower or higher respectively then current price
        // need to change placeholders or it will not work currently min: 1, max 1000
      })
      .catch(err => console.log(err));
  };

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

  // this function will be run on change of this.state.selectedType
  //if .some are true use those numbers to calc min,max, if some true is false use all to calc min, max

  // adjustBudget = () => {
  //   budget = this.state.budget
  //   console.log(minmax);
  //   budget.min = Math.min([...minmax.map(product => product.min)]);
  //   this.setState({ budget });
  // }
  
  generateDisplay = locked => {
    // Triggered when generate button is clicked in ProductDisplay
    // Locked product state passed from ProductDisplay 
  }
 
  render() {
    const product1 = this.state.products.blush[
      Math.floor(Math.random() * this.state.products.blush.length)
    ];
    const product2 = this.state.products.eyebrow[
      Math.floor(Math.random() * this.state.products.eyebrow.length)
    ];
    const product3 = this.state.products.mascara[
      Math.floor(Math.random() * this.state.products.mascara.length)
    ];

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Make Up A Gift</h1>
        </header>
        <section className="select">
          <div className="wrap type clearfix">
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
        <section className="display">
          <ProductDisplay
            product1={product1}
            product2={product2}
            product3={product3}
            generate={this.generateDisplay}
          />
          <SendEmail />
        </section>
      </div>
    );
  }
}

export default App;
