import React from 'react';
import PropTypes from 'prop-types';
import BreadCrumb from '../BreadCrumb/BreadCrumb';

import './ProductView.scss';

const ProductView = (props) => {
    const { data, categories } = props;
    console.log('data', data);
    
    const priceFormat = (price, decimals) => {
      if (Number.isInteger(price)) {
        return `$ ${price}`;
      }
      return `$ ${price.toFixed(decimals)}`
    };

    if (Object.keys(data).length) {
      return (
        <div>
          {
            categories && categories.length !== 0 && <BreadCrumb steps={categories} />
          }
          <div className="product-view">
            <div className="product-view__img-container">
              <img src={data.picture} alt={data.title.toLowerCase().replace(/ /g, '-')} />
            </div>
            <div className="product-view__info">
              <div className="product-view__info--details">
                {`${data.condition === 'new' ? 'Nuevo' : 'Usado'} - ${data.soldQuantity} vendidos`}
              </div>
              <h1 className="product-view__info--title">
                {
                  data.title
                }
              </h1>
              <div className="product-view__info--price">
                {
                  priceFormat(data.price.amount, data.price.decimals)
                }
              </div>
              <button type="button" className="product-view__info--buy-btn">Comprar</button>
            </div>
            <div className="product-view__description">
              <h2 className="product-view__description--title">Descripción del producto</h2>
              <div className="product-view__description--body">
                {
                  data.description
                }
              </div>
            </div>
          </div>
        </div>
      )
    }
    return null;
}

export default ProductView;

ProductView.propTypes = {
  data: PropTypes.object,
  categories: PropTypes.array
}
