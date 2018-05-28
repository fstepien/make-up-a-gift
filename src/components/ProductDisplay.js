import React from "react";
import ProductItem from "./ProductItem"

class ProductDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataLoaded: false,
            products: {
                product1: {
                    locked: false,
                    id: 0,
                    type: ""
                },
                product2: {
                    locked: false,
                    id: 0,
                    type: ""
                },
                product3: {
                    locked: false,
                    id: 0,
                    type: ""
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.product3 !== this.props.product3 && nextProps.product2 !== this.props.product2 && nextProps.product1 !== this.props.product1) {
            const {product1, product2, product3} = nextProps;
            const {products} = this.state;
            products.product1.id = product1.id;
            products.product2.id = product2.id;
            products.product3.id = product3.id;

          this.setState({ dataLoaded: true, products });
        }
    }

    toggleLock = (type, id) => {
        const { products } = this.state;
        console.log(products)
        for(const product in products) {
            console.log(products[product])
            if(products[product].id === id){
                products[product].locked = !products[product].locked;
            }
        }
    }

    render() {
       const {product1, product2, product3} = this.props;
       const {dataLoaded} = this.state;
       
       return( 
        <div className="wrap type clearfix displayBox">
            <div className="product">
                {dataLoaded ? <ProductItem 
                                product={product1} 
                                toggleLock={this.toggleLock}
                                /> : null}
            </div>
            <div className="product">
                {dataLoaded ? <ProductItem product={product2} 
                                toggleLock={this.toggleLock}
                                /> : null}
            </div>
            <div className="product">
                {dataLoaded ? <ProductItem product={product3} 
                                toggleLock={this.toggleLock}
                                /> : null}
            </div>
            <input type="button" value="generate" onClick={() => this.props.generate(this.state.products)} />
        </div>
       )
    }
}

export default ProductDisplay