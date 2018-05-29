import React from "react";
import Colors from "./Colors"


const ProductItem = (props) => {
    console.log(props)
    const {product, productNum, toggleLock} = props;
    return(
    <React.Fragment>
        <input 
            type="button" 
            value="lock" 
            onClick={() => props.toggleLock(product.product_type, product.id)} />
        <h3>{product.name.replace(/\b\w/g, l => l.toUpperCase())}</h3>
        <img src={product.api_featured_image} className="displayImg" />
        <Colors colors={props.product.product_colors}
                id={props.product.id}/>
    </React.Fragment>
    )
}

export default ProductItem