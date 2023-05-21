import React from "react";

import './Badge.scss';

const Badge = ({color}) => {
    return (
        <i className={`badge badge--${color}`}></i>
    );
}

export default Badge;