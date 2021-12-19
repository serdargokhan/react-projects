import { useEffect, useState } from "react";
import Select from "react-select";

import classes from "./CurrencyFromTo.module.css";


function CurrencyTo(props) {
    const [changeTo, setChangeTo] = useState("");

    function toChangeHandler(e) {
        setChangeTo(e.value);
    }

    useEffect(() => {
        props.onGetValueTo(changeTo);
    }, [changeTo, props])

    const options = props.selectArea.map(item => ({
        "value": item[0],
        "label": item[0]
    }));

    return (
        <div className={classes.container}>
            <label>{props.label}</label>
            <Select
                options={options}
                onChange={toChangeHandler}
                isSearchable="true" />
        </div>
    );
}

export default CurrencyTo;
