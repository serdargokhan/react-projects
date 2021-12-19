import { useEffect, useState } from "react";
import Select from "react-select";

import classes from "./CurrencyFromTo.module.css";

function CurrencyFrom(props) {
    const [changeFrom, setChangeFrom] = useState("");

    function fromChangeHandler(e) {
        setChangeFrom(e.value);
    }

    useEffect(() => {
        props.onGetValueFrom(changeFrom);
    }, [changeFrom, props])

    const options = props.selectArea.map(item => ({
        "value": item[0],
        "label": item[0]
    }));

    return (
        <div className={classes.container}>
            <label>{props.label}</label>
            <Select
                options={options}
                onChange={fromChangeHandler}
                isSearchable="true"
                autoFocus="true" />
        </div>
    );
}

export default CurrencyFrom;
