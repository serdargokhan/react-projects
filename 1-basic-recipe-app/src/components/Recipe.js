import classes from "./Recipe.module.css";
import Button from "./Button";
import Ingredients from "./Ingredients";

function Recipe(props) {
    return (
        <section className={classes.recipe}>
            <div className={classes.header}>
                <img src={props.image} alt={props.label} />
                <h2>{props.label}</h2>
                <p>{props.calories.toFixed(0)} Calories</p>
            </div>
            <div>
                <Ingredients data={props.data} />
            </div>
            <div>
                <a href={props.share}><Button label="Go to the page" /></a>
            </div>
        </section>
    );
}

export default Recipe;
