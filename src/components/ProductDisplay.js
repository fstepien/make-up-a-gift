import React from "react";

class ProductDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataLoaded: false,
            locked: {
                p1: false,
                p2:false,
                p3:false
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.product3 !== this.props.product3){
            this.setState({dataLoaded: true});
        }
    }

    render() {
       
        return(
            <div>
              <div className="product1">
                {/* <img src={} alt="" /> */}
              </div>
              <div className="product2">
                {/* <img src={} alt="" /> */}
              </div>
              <div className="product3">
                {/* <img src={} alt="" /> */}
              </div>
              <button onClick={this.generate}>generate</button>
            </div>
        )

    }

}



export default ProductDisplay