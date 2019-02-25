import React from 'react';

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
