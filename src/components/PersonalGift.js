import React, { Component } from "react";
import axios from 'axios';


class PersonalGift extends Component {
  state = {};
  
  componentDidMount() {
    axios({
      method: "GET",
      url: `https://makeup-api.herokuapp.com/api/v1/products.json`,
      responseType: "json"
    })
    .then(res => {
      const allItems = res.data;
      
      const itemIds = [];
      
      // Get the Id's of the items 
      const item1 = parseInt(this.props.match.params.item1);
      const item2 = parseInt(this.props.match.params.item2);
      const item3 = parseInt(this.props.match.params.item3);
      
      //and push them into the itemIds array
      itemIds.push(item1, item2, item3);
      
      itemIds.map((id) => {
        // console.log(id);
        allItems.filter((item) => {
          const items = { ...this.state.items }
          const selectedItems = item.id === id;
            if (!selectedItems) {
            } else {
              items[item] = item;
              this.setState({ items }); 
            }            
          });          
        });
        // this.setState({ itemIds });
        
        
      })
      .catch(err => console.log(err));
  }



  render() {
    return (
      <div className="your-gift">
        <h2>Your Personal Gift</h2>
        <p>Item 1, ID = {this.props.match.params.product1} {this.props.match.params.item1}</p>
        <p>Item 2, ID = {this.props.match.params.product2} {this.props.match.params.item2}</p>
        <p>Item 3, ID = {this.props.match.params.product3} {this.props.match.params.item3}</p>

      </div>
    )
  }
}

export default PersonalGift;
