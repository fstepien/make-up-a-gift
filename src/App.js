import React, { Component, Fragment } from "react";
import axios from "axios";
import "./App.css";
import Options from "./components/Options";
import Selected from "./components/Selected";
import Slider from "./components/Slider";
import ProductDisplay from "./components/ProductDisplay";
import { Toggle, Portal, Modal } from "./utilities";

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
    budget: {
      min: null,
      max: null,
      range: null,
      minThree: [],
      maxThree: [],
      loader: false
    }
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

        this.setState({ minmax }, this.checkThree());
      })
      .catch(err => console.log(err));
  };

  toggleSelect = key => {
    const selectedType = { ...this.state.selectedType };
    selectedType[key] = !selectedType[key];
    this.setState({ selectedType }, this.checkThree);
    //if three items are selected set budget
  };

  checkThree = () => {
    Object.values(this.state.selectedType).reduce(
      (accumulator, currentValue, currentIndex, array) =>
        accumulator + currentValue
    ) === 3
      ? // ? console.log(true)
        // : console.log(false);
        this.checkTypesLoaded()
      : this.setBudgetRange(null);
  };

  checkTypesLoaded = () => {
    const arraySelected = Object.keys(this.state.selectedType).filter(
      key => this.state.selectedType[key]
    );

    // if data is available
    if (arraySelected.every(type => this.state.products[type].length > 0)) {
      console.log("data available");
      const budget = { ...this.state.budget };
      budget.loader = false;
      this.setState({ budget });
      this.setBudget();
    } else {
      console.log("NOT data available");
      const budget = { ...this.state.budget };
      budget.loader = true;
      this.setState({ budget });
    }
  };

  setBudget = () => {
    const budget = { ...this.state.budget };
    const minmax = { ...this.state.minmax };
    const arraySelected = Object.keys(this.state.selectedType).filter(
      key => this.state.selectedType[key]
    );
    arraySelected.forEach(type => {
      budget.minThree.push(this.state.minmax[type].min);
      budget.maxThree.push(this.state.minmax[type].max);
    });

    // update min, max based on minThree and maxThree
    budget.min = budget.minThree.reduce((acc, val) => acc + val);
    budget.max = budget.maxThree.reduce((acc, val) => acc + val);

    //set avarage
    budget.range = parseInt((budget.min + budget.max) / 2);
    //and display slider
    this.setState({ budget });
  };

  setBudgetRange = value => {
    const budget = { ...this.state.budget };
    budget.range = value;
    this.setState({ budget });
  };

  generateDisplay = locked => {
    // Triggered when generate button is clicked in ProductDisplay
    // Locked product state passed from ProductDisplay
  };

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
            {this.state.budget.loader === true &&
              this.state.budget.range === null && <div>display loader </div>}
            {this.state.budget.range !== null && (
              <Slider
                budget={this.state.budget}
                setBudget={this.setBudgetRange}
              />
            )}
          </div>
        </section>
        <section className="display wrap">
          {/* <ProductDisplay
            product1={product1}
            product2={product2}
            product3={product3}
            generate={this.generateDisplay}
          /> */}

          <Toggle>
            {({ on, toggle }) => (
              <Fragment>
                <button onClick={toggle}>Email My Results</button>
                <Modal on={on} toggle={toggle}>
                  <SendEmail />
                </Modal>
              </Fragment>
            )}
          </Toggle>
        </section>
      </div>
    );
  }
}

export default App;
