import React from "react";
import "./ClickItem.css";

const ClickItem = props => (
    <div
        role="img"
        ariaRole="button"
        onClick={() => props.handleClick(props.id)}
        style={{ backgroundImage: `url("${props.image}")` }}
        className={`click-item${props.shake ? " shake" : ""}`}
    />
);

export default ClickItem;