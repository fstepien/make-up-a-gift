import React, { Component, Fragment } from "react";
import axios from 'axios';
import Header from './Header';

class PersonalGift extends Component {
  state = {
    ids: [],
    products: []
  };
  
  componentDidMount() {
    // Get ids from the URL    
    const ids = this.state.ids
    const item1 = parseInt(this.props.match.params.item1, 10);
    const item2 = parseInt(this.props.match.params.item2, 10);
    const item3 = parseInt(this.props.match.params.item3, 10);
    ids.push(item1, item2, item3)

    this.setState({ ids }, () => {
      const products = this.state.products;      
        
      ids.map((id) => {          
        this.getProducts(products, id)
      });
    });    
  }
  
  getProducts = (products, id) => { 
    axios({
      method: "GET",
      url: `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`,
      responseType: "json"
    })
    .then(res => {     
      // products.push(res.data);
      const prodClone = Array.from(this.state.products);    
      prodClone.push(res.data);
      this.setState({
        products: prodClone
      })                
    })
    .catch(err => console.log(err));     
  }

  renderProducts = (arrayToCopy) => {   
    const newArray = Array.from(arrayToCopy);

    let markup = [];
    newArray.map((product, i) => {
        markup.push(
          <div className="product" key={i}>
            <p>{product.name} by - {product.brand.toUpperCase()}</p>
            <img src={product.api_featured_image} alt={product.name} className="displayImg"/>
            <a href={product.product_link} target="_blank">Buy me</a>
          </div>
        )
      console.log(product.name);       
    });    
    return markup;   
  }

  render() {
    return (
      <Fragment>
        <Header/>
      <div className="wrap clearfix">
  
        <h2>Your Personal Gift</h2>      
        <div>
          {this.renderProducts(this.state.products)}
        </div>
      </div>
      </Fragment>
    )
  }
}

export default PersonalGift;
