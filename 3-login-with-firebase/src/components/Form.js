import Input from "./Input";
import Button from "./Button";
import { useEffect, useState } from "react";

function Form(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState({});
    const [success, setSuccess] = useState(false);
    const [arrivedData, setArrivedData] = useState({});
    const [approveLogin, setApproveLogin] = useState(false);
    const [showFirstName, setShowFirstName] = useState("");
    const [showLastName, setShowLastName] = useState("");
    const [registerError, setRegisterError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);

    const namesAreValid = firstName.trim() !== "" && lastName.trim() !== "";
    const mailIsValid = email.includes("@") && email.trim() !== "";
    const passwordIsValid = password.length >= 8 && password.trim() !== "";

    const errorClass = "mx-3 italic text-red-600 font-semibold";
    const boxClass = "border-2 p-10 bg-gray-100 h-1/2 text-center rounded-3xl shadow-2xl";

    useEffect(() => {
        async function registeredUser() {
            fetch("https://react-a3c86-default-rtdb.firebaseio.com/users.json", {
                method: "POST",
                body: JSON.stringify(users)
            });
        }
        registeredUser();
    }, [users]);

    function createHandler(e) {
        e.preventDefault();
        if (namesAreValid && mailIsValid && passwordIsValid) {
            setUsers({
                firstName,
                lastName,
                email,
                password,
                created: new Date()
            });
            setSuccess(true);
        }

        if (!namesAreValid || !mailIsValid || !passwordIsValid) {
            setRegisterError(true);
            return;
        }

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }

    useEffect(() => {
        if (namesAreValid && mailIsValid && passwordIsValid) setRegisterError(false);
        if (mailIsValid && passwordIsValid) setLoginError(false);
    }, [namesAreValid, mailIsValid, passwordIsValid]);

    useEffect(() => {
        async function getRegisteredUser() {
            const response = await fetch("https://react-a3c86-default-rtdb.firebaseio.com/users.json");
            const data = await response.json();
            setArrivedData(data);
        }
        getRegisteredUser();
    }, [props.isLogin]);

    function loginHandler(e) {
        e.preventDefault();
        if (arrivedData === null) {
            setUserNotFound(true);
            return;
        }


        const arrayData = Object.entries(arrivedData);
        arrayData.map(item => {
            if (item[1].email === email && item[1].password === password) {
                setShowFirstName(item[1].firstName);
                setShowLastName(item[1].lastName);
                setApproveLogin(true)
            } else setUserNotFound(true);
            return null;
        });

        if (!mailIsValid || !passwordIsValid) {
            setLoginError(true);
            setUserNotFound(false);
            return;
        }

        setEmail("");
        setPassword("");
    }

    const { onApproveLogin } = props;
    useEffect(() => {
        onApproveLogin(approveLogin);
    }, [approveLogin, onApproveLogin]);

    const { loggedOut } = props;
    useEffect(() => {
        if (loggedOut) {
            setApproveLogin(false);
            setUserNotFound(false);
        }
    }, [loggedOut]);


    function changeHandler(e) {
        if (e.target.id === "First Name") setFirstName(e.target.value);
        if (e.target.id === "Last Name") setLastName(e.target.value);
        if (e.target.type === "email") setEmail(e.target.value);
        if (e.target.type === "password") setPassword(e.target.value);
    }

    function forwardCreateAccountHandler(e) {
        e.preventDefault();
    }

    return (
        <form className="sm:flex sm:flex-col sm:max-w-md">

            {!success && !props.isLogin && <> <div className="sm:flex sm:flex-row">
                <Input changeHandler={changeHandler} value={firstName} label="First Name" type="text" />
                <Input changeHandler={changeHandler} value={lastName} label="Last Name" type="text" />
            </div>
                <div>
                    <Input changeHandler={changeHandler} value={email} label="Email" type="email" />
                    <Input changeHandler={changeHandler} value={password} label="Password" type="password" />
                    {registerError && <p className={errorClass}>Please fill out all the fields correctly.</p>}
                </div>
                <div>
                    <Button onClick={createHandler}>Create Account</Button>
                </div></>}

            {props.isLogin && (!approveLogin || props.loggedOut) && <div>
                <Input changeHandler={changeHandler} value={email} label="Email" type="email" />
                <Input changeHandler={changeHandler} value={password} label="Password" type="password" />
                {loginError && <p className={errorClass}>Please fill out all the fields correctly.</p>}
                {userNotFound && !loginError && <p className={errorClass}>User is not found.
                    <a> <button onClick={forwardCreateAccountHandler} className="text-blue-500 cursor-pointer font-bold">Create Account?</button> </a></p>}
                <Button onClick={loginHandler}>Login</Button>
            </div>}

            {success && !props.isLogin && <div className={boxClass}> <p className="text-green-900 font-bold">Successfully Registered!</p> </div>}

            {approveLogin && !props.loggedOut && <div className={boxClass}> <p className="text-blue-900 font-bold">Welcome {showFirstName.toUpperCase()} {showLastName.toUpperCase()}!</p> </div>}
        </form>
    );
}

export default Form;
