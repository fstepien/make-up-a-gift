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

    toggleLock = product => {
        const locked  = {...this.state.locked}
        locked[product] = !locked[product];
        this.setState({ locked });
    }

    render() {
       const {product1, product2, product3} = this.props;
        return <div className="wrap type clearfix displayBox">
            <div className="product product1">
              <input type="button" value="lock" onClick={() => this.toggleLock("p1")} />
              <img src={this.state.dataLoaded ? product1.image_link : null} className="displayImg" />
            </div>
            <div className="product product2">
              <input type="button" value="lock" onClick={() => this.toggleLock("p2")} />
              <img src={this.state.dataLoaded ? product2.image_link : null} className="displayImg" />
            </div>
            <div className="product product3">
              <input type="button" value="lock" onClick={() => this.toggleLock("p3")} />
              <img src={this.state.dataLoaded ? product3.image_link : null} className="displayImg" />
            </div>
            <input type="button" value="generate" onClick={() => this.props.generate(this.state.locked)} />
          </div>;

    }

}



export default ProductDisplay