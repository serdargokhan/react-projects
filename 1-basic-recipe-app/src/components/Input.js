import React from "react";
import classes from "./Input.module.css";

function Input(props) {
    return (
        <React.Fragment>
        <label>
        <input onChange={props.onChange} className={classes.input} type={props.type} placeholder={props.placeholder} value={props.value} />
        </label>
        </React.Fragment>
    );
}

export default Input;
