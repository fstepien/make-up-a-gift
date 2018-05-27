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
        // console.log(res.data);
        
        const item1 = parseInt(this.props.match.params.item1);
        const item2 = parseInt(this.props.match.params.item2);
        const item3 = parseInt(this.props.match.params.item3);

        allItems.filter((item) => {
          if (item.id === item1) {
            const selected1 = item;
            console.log(selected1);
            
            
            this.setState({
              item1: selected1
            });
          }
          // const selected1 = item.id === item1
          // const selected2 = item.id === item2;
          // const selected3 = item.id === item3;
          // console.log(selected1, selected2, selected3);
          

          // if (!selected1) {
          //     items.push(item)
          // }

          // this.setState({ 
          //   selected1,
          //   selected2,
          //   selected3
          //  });

          // if (item.id === item1) {
          //   console.log(item);
          // }
        })
      })
      .catch(err => console.log(err));
  }



  render() {
    return (
      <div className="your-gift">
        <h2>Your Personal Gift</h2>
        <p>Item 1, ID = {this.props.match.params.item1}</p>
        <p>Item 2, ID = {this.props.match.params.item2}</p>
        <p>Item 3, ID = {this.props.match.params.item3}</p>

      </div>
    )
  }
}

export default PersonalGift;
