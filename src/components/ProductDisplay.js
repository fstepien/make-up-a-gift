import React, { Component, Fragment } from "react";
import ProductItem from "./ProductItem";
import { Toggle, Modal } from "./../utilities";
import SendEmail from "./SendEmail";
import Icon from "./../utilities/Icon";

class ProductDisplay extends Component {
  state = {
    dataLoaded: false,
    products: {
      product1: {
        locked: false,
        id: 0,
        type: {}
      },
      product2: {
        locked: false,
        id: 0,
        type: {}
      },
      product3: {
        locked: false,
        id: 0,
        type: {}
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.product3 !== this.props.product3 &&
      nextProps.product2 !== this.props.product2 &&
      nextProps.product1 !== this.props.product1
    ) {
      const { product1, product2, product3 } = nextProps;
      const products = Object.assign({}, this.state.products);
      products.product1.id = product1.id;
      products.product1.type = product1;
      products.product2.id = product2.id;
      products.product2.type = product2;
      products.product3.id = product3.id;
      products.product3.type = product3;

      this.setState({ dataLoaded: true, products });
    }
  }

  toggleLock = productNumber => {
    let products = { ...this.state.products };
    console.log(products);
    products[productNumber].locked = !products[productNumber].locked;

    this.setState({ products }, this.props.generate(this.state.products));
  };

  render() {
    // const state = Object.assign({}, this.state);
    const { product1, product2, product3 } = this.props;
    const { dataLoaded, products } = this.state;

    return (
      <React.Fragment>
        <h2 style={{ textAlign: "center" }}>
          WHAT DO YOU THINK OF THESE? <br />YOU CAN RESHUFFLE TO GET NEW
          PRODUCTS AND LOCK ANY PRODUCT BEFORE SHUFFLING
        </h2>
        <div className="type clearfix display-box">
          <div className="product">
            {dataLoaded ? (
              <ProductItem
                product={product1}
                productNumber="product1"
                toggleLock={this.toggleLock}
                locked={products.product1.locked}
              />
            ) : (
              <Icon className="loading-icon" name="lipstick" />
            )}
          </div>
          <div className="product">
            {dataLoaded ? (
              <ProductItem
                product={product2}
                productNumber="product2"
                toggleLock={this.toggleLock}
                locked={products.product2.locked}
              />
            ) : (
              <Icon className="loading-icon" name="lipstick" />
            )}
          </div>
          <div className="product">
            {dataLoaded ? (
              <ProductItem
                product={product3}
                productNumber="product3"
                toggleLock={this.toggleLock}
                locked={products.product3.locked}
              />
            ) : (
              <Icon className="loading-icon" name="lipstick" />
            )}
          </div>
          <input
            className="email-btn"
            type="button"
            value="Let's See More Products"
            onClick={() => this.props.generate(this.state.products)}
          />
          <Toggle>
            {({ on, toggle }) => (
              <Fragment>
                <button className="email-btn" onClick={toggle}>
                  Send Me This List
                </button>
                <Modal on={on} toggle={toggle}>
                  <SendEmail products={this.state.products} toggle={toggle} />
                </Modal>
              </Fragment>
            )}
          </Toggle>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductDisplay;
