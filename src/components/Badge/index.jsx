import React from "react";
import classNames from "classnames";

import './Badge.scss';

const Badge = ({color, onClick, className}) => {
    return (
        <i onClick={onClick} className={classNames(className, {[`badge badge--${color}`]:color})}></i>
    );
}

export default Badge;