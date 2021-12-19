import classes from "./Input.module.css";

function Input(props) {
    return <input
        className={classes.input}
        type="number"
        placeholder={props.placeholder}
        onChange={props.inputHandler}
        value={props.value} />
}

export default Input;
