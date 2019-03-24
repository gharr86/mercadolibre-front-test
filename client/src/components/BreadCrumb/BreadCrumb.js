import React from 'react';
import PropTypes from 'prop-types';

import './BreadCrumb.scss';

const BreadCrumb = (props) => {
    const { steps } = props;

    return (
      <ul className="breadcrumb">
        {
            steps.map((step, index) => (
                <li className="breadcrumb__step" key={`bc-${index + 1}`}>{step}</li>
            ))
        }
      </ul>
    )
}

export default BreadCrumb;

BreadCrumb.propTypes = {
  steps: PropTypes.array
}
