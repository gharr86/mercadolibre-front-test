import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Header.scss';

const Header = (props) => {
    const { handleChange, searchTerm, handleClick, handleKeyUp } = props;

    return (
      <header className="header">
        <div className="header-wrapper">
          <Link
            to="/"
            className="header__ml-logo"
          />
          <input
            className="header__search-input"
            placeholder="Nunca dejes de buscar"
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <Link
            to={`/items?search=${searchTerm}`}
            className="header__search-btn"
            onClick={handleClick}
          />
        </div>
      </header>
    )
}

export default Header;

Header.propTypes = {
  handleChange: PropTypes.func,
  searchTerm: PropTypes.string,
  handleClick: PropTypes.func,
  handleKeyUp: PropTypes.func
}
