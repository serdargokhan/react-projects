import { useEffect, useState } from "react";
import Button from "./Button";

function Header(props) {

    const [loggedOut, setLoggedOut] = useState(false);

    function logoutHandler(e) {
        e.preventDefault();
        setLoggedOut(true);
    }

    useEffect(() => {
        if (loggedOut) setLoggedOut(false);
    }, [loggedOut]);

    const { onLoggedOut } = props;
    useEffect(() => {
        onLoggedOut(loggedOut);
    }, [loggedOut, onLoggedOut]);

    return (
        <div className="flex gap-14 items-center mx-3">
            <h2 className="font-extrabold text-xl">Anywhere App<span className="text-blue-500">.</span></h2>
            <a href="" className="text-gray-500 font-bold text-md">Home</a>
            <div className="space-x-4">
                {props.showLogout && !loggedOut && <Button onClick={logoutHandler}>Logout</Button>}
            </div>
        </div>
    );
}

export default Header;
