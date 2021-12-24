import { useEffect, useState } from "react";

function Token(props) {
    const API_KEY = process.env.REACT_APP_API_KEY;

    const [arrivedData, setArrivedData] = useState([]);
    const [loading, setLoading] = useState(true);

    let namesArr = [];
    props.data.map(item => {
        return namesArr.push(item.symbol);
    });     // This map function stores coin names in an empty array to use it later down

    const coinNames = namesArr.join();

    useEffect(() => {
        async function getLogos() {
            if (coinNames.length > 0) {
                const response = await fetch(`https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=${API_KEY}&symbol=${coinNames}`);
                const data = await response.json();
                setArrivedData(Object.entries(data.data));
                setLoading(false);
            }
        }
        getLogos();
    }, [coinNames]);      // This function makes a fetch call with those coin names array to get logos of the coins


    // These three array calculations are for logos to be shown in order
    let firstIndexArray = [];
    arrivedData.map(item => {
        return firstIndexArray.push(item[0]);
    });

    let orderOfLogos = [];
    for (let i = 0; i < 100; i++) {
        orderOfLogos.push(firstIndexArray.findIndex(el => el === namesArr[i]));
    };

    let dataArray = [];
    for (let i = 0; i < 100; i++) {
        dataArray.push([orderOfLogos[i], props.data[i]]);
    }

    const { onLoading } = props;
    useEffect(() => {
        onLoading(loading);
    }, [onLoading, loading])

    return (
        <ul>
            <li className=" italic font-bold tracking-widest mb-4">Token</li>
            {dataArray.map(item => {
                return !loading && <div className="flex gap-2 mb-3" key={item[1].id}>
                    <img className="w-6 h-6" src={arrivedData[item[0]][1].logo} alt="logo" />
                    <li className="tracking-wider" >{item[1].symbol}</li>
                </div>
            })}
        </ul>
    );
}

export default Token;