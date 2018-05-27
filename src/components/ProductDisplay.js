import React from "react";
import ProductItem from "./ProductItem"

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
       const {dataLoaded} = this.state;
       
       return( 
        <div className="wrap type clearfix displayBox">
           <ProductItem product={product1}
                        loaded={dataLoaded} 
                        toggleLock={this.toggleLock}/>
           <ProductItem product={product2}
                        loaded={dataLoaded} 
                        toggleLock={this.toggleLock}/>
           <ProductItem product={product3}
                        loaded={dataLoaded} 
                        toggleLock={this.toggleLock}/>
            <input type="button" value="generate" onClick={() => this.props.generate(this.state.locked)} />
        </div>
       )

    }

}



export default ProductDisplay