import { useEffect, useReducer } from 'react';

import classes from "./App.module.css";

import Loader from 'react-loader-spinner';
import Recipe from './components/Recipe';
import Button from './components/Button';
import Input from './components/Input';

const initialState = {
  error: "",
  inputText: "",
  click: "",
  loop: "",
  arrivedData: [],
  valid: false,
  loader: false
}

function reducer(state, action) {
  switch (action.type) {
    case "ERROR":
      return { ...state, error: action.payload };
    case "INPUT":
      return { ...state, inputText: action.payload };
    case "CLICK":
      return { ...state, click: action.payload };
    case "DATA":
      return { ...state, arrivedData: action.payload };
    case "VALID":
      return { ...state, valid: action.payload };
    case "LOADER":
      return { ...state, loader: action.payload };
    case "LOOP":
      return { ...state, loop: action.payload };
    default:
  }
}

function App() {
  const API_ID = "800111d8";
  const API_KEY = "243c89270cc99b8c9bab639fe2c62a7d";

  const [state, dispatch] = useReducer(reducer, initialState);

  const isValid = state.inputText.trim() !== "";
  const clickIsValid = state.click.trim() !== "";
  const dataIsEmpty = state.arrivedData.length === 0;

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`https://api.edamam.com/search?q=${state.click}&app_id=${API_ID}&app_key=${API_KEY}`);
        if (!response.ok) throw new Error("Something went wrong.");
        const data = await response.json();
        dispatch({ type: "DATA", payload: data.hits });
        console.log(response, data);
        if (data.count === 0 && data.q !== "") {
          dispatch({ type: "LOOP", payload: "We could not find the recipe in our database. Try again." });
          dispatch({ type: "LOADER", payload: false });
        }
      } catch (error) {
        dispatch({ type: "ERROR", payload: error.message });
        if (error) dispatch({ type: "LOADER", payload: false });
      }
    }
    fetchRecipes();
  }, [state.click]);

  function onChange(e) {
    dispatch({ type: "INPUT", payload: e.target.value });
  }

  function clear() {
    dispatch({ type: "INPUT", payload: "" });
    dispatch({ type: "DATA", payload: [] });
    dispatch({ type: "LOOP", payload: "" });
  }

  function submitHandler(e) {
    e.preventDefault();

    dispatch({ type: "VALID", payload: !isValid });

    if (!isValid) {
      dispatch({ type: "CLICK", payload: "" });
      clear();
      return;
    }

    clear();
    dispatch({ type: "LOADER", payload: true });
    dispatch({ type: "CLICK", payload: state.inputText });
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <Input
          onChange={onChange}
          value={state.inputText}
          placeholder="Search hundreds of recipes..."
          type="text" />
        <Button label="Search" type="submit" />
      </form>
      <main className={classes.containerRow}>
        {state.error && <p className={classes.message}>{state.error}</p>}
        {state.loop && <p className={classes.message}>{state.loop}</p>}
        {state.loader && dataIsEmpty && clickIsValid && <Loader type="Rings" color="#fa8072" />}
        {state.valid && !state.error && <p className={classes.message}>Please enter something valid and search again.</p>}
        {state.arrivedData.map((item, index) => {
          return <Recipe
            key={index}
            data={item.recipe.ingredientLines}
            label={item.recipe.label}
            calories={item.recipe.calories}
            image={item.recipe.image}
            share={item.recipe.shareAs} />
        })}
      </main>
    </div>
  );
}

export default App;
