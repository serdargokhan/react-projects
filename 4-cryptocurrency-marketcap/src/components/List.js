import { useState, useEffect } from "react";

import Rank from "../list/Rank";
import Token from "../list/Token";
import Price from "../list/Price";
import Change from "../list/Change";
import Volume from "../list/Volume";
import Marketcap from "../list/Marketcap";
import Loading from "../UI/Loading";

function List() {
    const API_KEY = process.env.REACT_APP_API_KEY;

    const [arrivedData, setArrivedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hiddenClass, setHiddenClass] = useState("");

    useEffect(() => {
        async function fetchCoins() {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${API_KEY}`);
            const data = await response.json();
            setArrivedData(data.data);
        }
        fetchCoins();
    }, []);

    function loadingHandler(val) {
        setLoading(val);
    }

    useEffect(() => {
        if (loading) setHiddenClass("hidden");
        if (!loading) setHiddenClass("visible");
    }, [loading]);

    return (
        <div className=" min-h-screen mb-12">
            <h1 className="font-extrabold text-2xl ml-5 my-12 text-white">Coins Ranking</h1>
            {loading && <Loading />}

            <div className={`flex justify-between text-gray-light rounded-2xl border-2 mx-3 lg:mx-16 p-2 md:p-7 bg-light-blue ${hiddenClass}`}>
                <Rank data={arrivedData} />
                <Token data={arrivedData} onLoading={loadingHandler} />
                <Price data={arrivedData} />
                <Change data={arrivedData} />
                <Marketcap data={arrivedData} />
                <Volume data={arrivedData} />
            </div>
        </div>
    );
}

export default List;