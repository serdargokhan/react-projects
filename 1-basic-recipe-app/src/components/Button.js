import classes from "./Button.module.css";

function Button(props) {
    return (
        <button className={classes.button} type={props.type}>{props.label}</button>
    );
}

export default Button;
