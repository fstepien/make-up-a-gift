import React, { Component } from "react";
import axios from 'axios';
import { get } from "http";

// http://localhost:3000/your-gift/blush-920/eyeliner-247/lipstick-885

class PersonalGift extends Component {
  state = {
    products: {}
  };
  
  componentDidMount() {
    // Get products and ids from the URL
    const products = { ...this.state.products }; // a copy of the state and child(ren). 

    const product1 = this.props.match.params.product1;
    const item1 = parseInt(this.props.match.params.item1);
    products[product1] = product1;
    products[product1] = item1;      
       
    const product2 = this.props.match.params.product2;
    const item2 = parseInt(this.props.match.params.item2);
    products[product2] = product2;
    products[product2] = item2;
    
    const product3 = this.props.match.params.product3;
    const item3 = parseInt(this.props.match.params.item3);
    products[product3] = product3;  
    products[product3] = item3;

    this.setState({ products }, () => {
      for (let product in products) {      
        const id = products[product];       
        this.getProducts(product, id)           
      }      
    });    
  }
  
  getProducts = (product, id) => {    
    axios({
      method: "GET",
      url: `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product}`,
      responseType: "json"
    })
      .then(res => {  

        const products = {...this.state.product }    
        products[product] = res.data; 
        console.log(products[product]);
        products[product].filter((item) => {
         if (item.id === id) {
           const product = item;
           products[product] = item     
           
                           
           this.setState({ products })
          }
          
        })
        
      })
      .catch(err => console.log(err));
  }



  render() {
    return (
      <div className="your-gift">
        <h2>Your Personal Gift</h2>
        <p>Item 1, {this.props.match.params.product1} {this.props.match.params.item1} </p>
        <p>Item 2, {this.props.match.params.product2} {this.props.match.params.item2} </p>
        <p>Item 3, {this.props.match.params.product3} {this.props.match.params.item3} </p>

      </div>
    )
  }
}

export default PersonalGift;
