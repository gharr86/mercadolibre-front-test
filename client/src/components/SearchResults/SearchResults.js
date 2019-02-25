import React from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../BreadCrumb/BreadCrumb';

import './SearchResults.scss';

const SearchResults = (props) => {
    const { data } = props;
    const { items, categories } = data;

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
            categories.length !== 0 && <BreadCrumb steps={categories} />
          }          
          <ul className="search-results">
            {
              items.map((item) => (
                <li className="search-results__result" key={item.id}>
                  <div className="search-results__result--img-container">
                    <Link
                      to={`/items/${item.id}`}
                    >
                      <img
                        src={item.picture}
                        data-id={item.id}
                        alt={item.title.toLowerCase().replace(/ /g, '-')}
                      />
                    </Link>
                  </div>
                  <div className="search-results__result--main-info">
                    <div className="main-info__price">
                      <span className="price--amount">
                        {
                          priceFormat(item.price.amount, item.price.decimals)
                        }
                      </span>
                      {
                        item.freeShipping && <span className="price--freeshipping-icon"></span>
                      }
                    </div>
                    <div className="main-info__title">
                      <Link
                        to={`/items/${item.id}`}
                        data-id={item.id}
                      >
                        {
                          item.title
                        }
                      </Link>
                    </div>
                  </div>
                  <div className="search-results__result--location">
                      {
                        item.location
                      }
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      )
    }
    return null;
}

export default SearchResults;
