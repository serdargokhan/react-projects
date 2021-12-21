import { useEffect, useState } from "react";

function Main(props) {

    const [login, setLogin] = useState(false);

    function loginHandler(e) {
        e.preventDefault();
        setLogin(true);
        document.title = "Sign In";
    }

    const { onLogin } = props;
    useEffect(() => {
        onLogin(login);
    }, [login, onLogin]);

    return (
        <div className="flex flex-col my-16 mx-3 space-y-5">
            <p className="text-gray-400 font-bold">START FOR FREE</p>
            {!login ? <p className="text-4xl font-bold my-6">Create new account<span className="text-blue-500">.</span></p> :
                <p className="text-4xl font-bold my-6">Log In to your account<span className="text-blue-500">.</span></p>}
            {!login && <p className="text-gray-400">Already a member?
                {!login && <a className="text-blue-500 cursor-pointer font-bold" onClick={loginHandler}> Login</a>}</p>}
        </div>
    );
}

export default Main;
