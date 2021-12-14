import classes from "./Ingredients.module.css";

function Ingredients(props) {
    return (
        <ul className={classes.list}>
            {props.data.map((item, index) => {
                return <li key={index}>{item}</li>
            })}
        </ul>
    );
}

export default Ingredients;
