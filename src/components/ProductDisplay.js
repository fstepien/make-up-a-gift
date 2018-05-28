import React from "react";
import ProductItem from "./ProductItem"

class ProductDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataLoaded: false,
            products: {
                1: {},
                2: {},
                3: {}
            },
            locked: {
                p1: false,
                p2:false,
                p3:false
            }
        }
    }

    // STOPPED WORKING HERE
    // Trying to get around the undefined problem by using componentWillReceiveProps()
    componentWillReceiveProps(nextProps) {
        if(nextProps.product3 !== this.props.product3){
            const {products} = this.state;
            for(let item in products){};
            products.product1 = this.props.product1;
            products.product
            this.setState({dataLoaded: true,  });
        }
    }

    toggleLock = product => {
        // console.log(product)
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
                        toggleLock={this.toggleLock}
                        productNum={"p1"}
                        />
           <ProductItem product={product2} 
                        toggleLock={this.toggleLock}
                        productNum={"p2"}
                        />
           <ProductItem product={product3} 
                        toggleLock={this.toggleLock}
                        productNum={"p3"}
                        />
            <input type="button" value="generate" onClick={() => this.props.generate(this.state.locked)} />
        </div>
       )

    }

}



export default ProductDisplay