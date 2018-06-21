import React from "react";
import Colors from "./Colors";

const ProductItem = props => {
  // console.log(props);
  const { product, productNum, toggleLock, productNumber } = props;

  return (
    <React.Fragment>
      <img
        src={props.locked ? "/assets/lock.svg" : "/assets/unlock.svg"}
        className="product-btn"
        onClick={() => props.toggleLock(productNumber)}
      />

      {product.brand && <p>{product.brand.toUpperCase()}</p>}
      {product.name && (
        <p className="product-name">{product.name.replace(/&trade;/g, "")}</p>
      )}
      {product.api_featured_image && (
        <a
          href={product.product_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={product.api_featured_image} className="displayImg" />
        </a>
      )}
    </React.Fragment>
  );
};

export default ProductItem;
