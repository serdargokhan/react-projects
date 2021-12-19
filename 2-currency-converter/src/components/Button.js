import classes from "./Button.module.css";

function Button(props) {
    return <button className={classes.btn} onClick={props.onClick}>{props.label}</button>
}

export default Button;
