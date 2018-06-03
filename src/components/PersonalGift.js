import React, { Component, Fragment } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css";
import ProductItem from "./ProductItem";

class PersonalGift extends Component {
  state = {
    ids: [],
    products: []
  };

  componentDidMount() {
    // Get ids from the URL
    const ids = this.state.ids;
    const item1 = parseInt(this.props.match.params.item1, 10);
    const item2 = parseInt(this.props.match.params.item2, 10);
    const item3 = parseInt(this.props.match.params.item3, 10);
    ids.push(item1, item2, item3);

    this.setState({ ids }, () => {
      const products = this.state.products;

      ids.map(id => this.getProducts(products, id));
    });
  }

  getProducts = (products, id) => {
    axios({
      method: "GET",
      url: `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`,
      responseType: "json"
    })
      .then(res => {
        const prodClone = Array.from(this.state.products);
        prodClone.push(res.data);
        this.setState({
          products: prodClone
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Fragment>
        <Header />
        <h2>Your Personal Gift</h2>
        <div className="wrap clearfix display-box">
          {this.state.products.map((product, i) => {
            return (
              <div className="product" style={{ overflow: "hidden" }}>
                <ProductItem product={product} />
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}

export default PersonalGift;
