import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useState, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";

import AuthLayout from "../UI/AuthLayout";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Redirect from "../UI/Redirect";
import Validation from "../UI/Validation";

function SignIn() {
    const navigate = useNavigate();

    const { obj, setValue, value, setToken, token } = useContext(AuthContext);
    const [validate, setValidate] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState("");

    const validateEvery = useCallback(obj.emailIsValid && obj.passwordIsValid);
    console.log("signin");
    useEffect(() => {
        async function signinResponse() {
            try {
                const request = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAe6BBmp3Pf1Q3HaSg2_RL68rB0KK0gmKE", {
                    method: "POST",
                    body: JSON.stringify(userInfo),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!request.ok) throw new Error("Your email or your password is wrong");
                const data = await request.json();
                setToken(data.idToken);
                localStorage.setItem("token", data.idToken);
            }
            catch (err) {
                console.log(err.message);
                setError(err.message);
            }
        }
        if (validateEvery) signinResponse();

    }, [userInfo]);

    function signinHandler(e) {
        e.preventDefault();
        setValidate(true);
        if (validateEvery) {
            setUserInfo(value);
            setValidate(false);
        }
    }

    useEffect(() => {
        if (token) {
            setRedirect(true);
            setTimeout(() => {
                navigate("/blog", { replace: true });
                setRedirect(false);
            }, 1000);
        }
    }, [token]);

    useEffect(() => {
        if (!validate) setValue({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repassword: ""
        });
    }, [validate]);


    function forwardSignupHandler() {
        navigate("/signup", { replace: true });
        setValue({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repassword: ""
        });
    }

    return (
        <AuthLayout>
            {!redirect && <> <h2 className="text-3xl font-bold dark:text-light-white duration-700">Start Your Journey<span className="text-light-purple">.</span></h2>
                <div className="flex gap-6 text-sm sm:text-md md:text-lg">
                    <p className="italic dark:text-light-white duration-700">Do you want to create an account? </p>
                    <button className="underline italic font-bold text-light-blue" onClick={forwardSignupHandler}>Sign Up</button>
                </div>

                <form className="flex-col space-y-5" onSubmit={signinHandler} noValidate>

                    <div className="grid">
                        <Input id="email" type="email" label="Email" placeholder="Your email" />
                        {validate && <Validation check={!obj.emailIsValid} message="Enter your email correctly" />}
                    </div>

                    <div className="grid">
                        <Input id="password" type="password" label="Password" placeholder="Your password" />
                        {validate && <Validation check={!obj.passwordIsValid} message="Password must be at least 8 characters long" />}
                        {error && <Validation check={error} message={error} />}
                    </div>

                    <Button title="Sign In" />
                </form> </>}
            {redirect && <Redirect description="You are being redirected to the Main page. Please wait..." />}
        </AuthLayout>
    );
}

export default SignIn;
