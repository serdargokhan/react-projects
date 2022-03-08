import { useCallback, useEffect, useState } from "react";
import classes from "./App.module.css";

import Input from "./components/Input";
import Button from "./components/Button";
import CurrencyFrom from "./components/CurrencyFrom";
import CurrencyTo from "./components/CurrencyTo";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [arrayData, setArrayData] = useState([]);
  const [currencyObj, setCurrencyObj] = useState({ data: "" });
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");
  const [sum, setSum] = useState(0);
  const [IsClicked, setIsClicked] = useState(false);

  const isValid = inputText.trim() !== "";

  const fetchFunc = useCallback(() => {
    async function fetchCurrency() {
      try {
        const response = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${fromCurrency}`);
        if (!response.ok) throw new Error("Something went wrong.");
        const data = await response.json();
        setCurrencyObj(data);
        setArrayData(Object.entries(data.data));
      } catch (error) {
        setError(error.message);
      }
    }
    fetchCurrency();
  }, [fromCurrency, API_KEY]);


  useEffect(() => {
    fetchFunc();
  }, [fetchFunc]);

  function onChangeFrom(from) {
    setFromCurrency(from);
  }

  function onChangeTo(to) {
    setToCurrency(to);
  }

  function inputChange(e) {
    setInputText(e.target.value);
  }

  function onClick() {
    setSum(total);
    setInputText("");
    setIsClicked(true);
    if (isValid) setIsClicked(false);
  }

  useEffect(() => {
    setSum(0);
  }, [toCurrency]);

  const total = (inputText * currencyObj.data[toCurrency]?.value).toFixed(4);

  return (
    <div className={classes.container}>
      <h2>Currency Converter</h2>
      <CurrencyFrom selectArea={arrayData} onGetValueFrom={onChangeFrom} label="From" />
      <CurrencyTo selectArea={arrayData} onGetValueTo={onChangeTo} label="To" />
      <Input placeholder="Amount" inputHandler={inputChange} value={inputText} />
      {!isValid && IsClicked && <p className={classes.error}>Please fill out all the fields.</p>}
      <Button label="Convert" onClick={onClick} />
      <span>Result: {!IsClicked && sum} {toCurrency}</span>
      {error && <p>Something went wrong. Try again later.</p>}
    </div>
  );
}

export default App;
