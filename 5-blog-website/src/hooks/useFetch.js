import { useEffect, useState } from "react";

function useFetch(url, options, dependency, condition = true) {

    const [arrivedData, setArrivedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        async function fetchData() {
            try {
                const response = await fetch(url, {
                    method: options.method,
                    body: JSON.stringify(options.body),
                    headers: options.headers
                });
                if (!response.ok) throw new Error("Something went wrong.");
                const data = await response.json();
                if (!isCancelled) setArrivedData(data);
            }
            catch (err) {
                console.error(err.message);
            }
            finally {
                setLoading(false);
            }

        }

        if (condition) fetchData();

        return () => { isCancelled = true };

    }, [dependency]);

    return { arrivedData, loading };
}

export default useFetch;
