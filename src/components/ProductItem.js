import React from "react";


const ProductItem = (props) => {
    // console.log(props)
    const {product, productNum, toggleLock} = props;
    return(
    <div className="product product1">
        <input type="button" value="lock" onClick={() => props.toggleLock(props.productNum)} />
        <h3>{product ? product.name.replace(/\b\w/g, l => l.toUpperCase()) : null}</h3>
        <img src={product ? product.api_featured_image : null} className="displayImg" />
    </div>
    )
}

export default ProductItem