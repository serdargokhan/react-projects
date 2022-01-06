import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

import AuthLayout from "../UI/AuthLayout";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Redirect from "../UI/Redirect";
import Validation from "../UI/Validation";

function SignUp() {

    const { obj, setValue, value } = useContext(AuthContext);

    const [validate, setValidate] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();

    const validateEvery = obj.firstNameIsValid && obj.lastNameIsValid && obj.emailIsValid && obj.passwordIsValid && obj.passwordIsMatches;

    const options = {
        method: "POST",
        body: userInfo,
        headers: {
            "Content-Type": "application/json"
        }
    }

    useFetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAe6BBmp3Pf1Q3HaSg2_RL68rB0KK0gmKE", options, userInfo, validateEvery);

    function signupHandler(e) {
        e.preventDefault();
        setValidate(true);
        if (validateEvery) {
            setUserInfo(value);
            setValidate(false);
            setRedirect(true);
            setTimeout(() => {
                navigate("/signin", { replace: true });
            }, 1000);
        }
    }

    useEffect(() => {
        if (!validate) setValue({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repassword: ""
        })
    }, [validate]);

    function forwardSigninHandler() {
        setValue({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repassword: ""
        })
    }

    return (
        <AuthLayout>
            {!redirect && <> <h2 className="text-3xl font-bold dark:text-light-white duration-700">Create an Account<span className="text-light-purple">.</span></h2>
                <div className="flex gap-6 text-sm sm:text-md md:text-lg">
                    <p className="italic dark:text-light-white duration-700">Already a member?</p>
                    <Link onClick={forwardSigninHandler} className="underline italic font-bold text-light-blue" to="/signin">Sign In</Link>
                </div>
                <form className="flex-col space-y-4" onSubmit={signupHandler} noValidate>
                    <div className="grid">
                        <Input id="firstName" type="text" label="First Name" placeholder="Your first name" />
                        {validate && <Validation check={!obj.firstNameIsValid} message="Enter your first name" />}
                    </div>

                    <div className="grid">
                        <Input id="lastName" type="text" label="Last Name" placeholder="Your last name" />
                        {validate && <Validation check={!obj.lastNameIsValid} message="Enter your last name" />}
                    </div>

                    <div className="grid">
                        <Input id="email" type="email" label="Email" placeholder="Your email" />
                        {validate && <Validation check={!obj.emailIsValid} message="Enter your email correctly" />}
                    </div>

                    <div className="grid">
                        <Input id="password" type="password" label="Password" placeholder="Your password" />
                        {validate && <Validation check={!obj.passwordIsValid} message="Password must be at least 8 characters long" />}
                    </div>

                    <div className="grid">
                        <Input id="repassword" type="password" label="Re-Password" placeholder="Your password again" />
                        {validate && <Validation check={!obj.passwordIsMatches} message="Your password does not match" />}
                    </div>

                    <Button title="Sign Up" />
                </form> </>}
            {redirect && <Redirect description="You are being redirected to the Sign In page. Please wait..." />}
        </AuthLayout>
    );
}

export default SignUp;
