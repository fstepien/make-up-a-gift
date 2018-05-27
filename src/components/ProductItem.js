import React from "react";


const ProductItem = (props) => {
    console.log(props)
    return(
        <div className="product product1">
            <input type="button" value="lock" onClick={() => this.toggleLock("p1")} />
            <img src={props.loaded ? props.product.image_link : null} className="displayImg" />
      </div>
    )
}

export default ProductItem

// return <div className="wrap type clearfix displayBox">
        //     <div className="product product1">
        //       <input type="button" value="lock" onClick={() => this.toggleLock("p1")} />
        //       <img src={this.state.dataLoaded ? product1.image_link : null} className="displayImg" />
        //     </div>
        //     <div className="product product2">
        //       <input type="button" value="lock" onClick={() => this.toggleLock("p2")} />
        //       <img src={this.state.dataLoaded ? product2.image_link : null} className="displayImg" />
        //     </div>
        //     <div className="product product3">
        //       <input type="button" value="lock" onClick={() => this.toggleLock("p3")} />
        //       <img src={this.state.dataLoaded ? product3.image_link : null} className="displayImg" />
        //     </div>
        //     <input type="button" value="generate" onClick={() => this.props.generate(this.state.locked)} />
        //   </div>;