import { useEffect, useState, createContext } from "react";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    const [token, setToken] = useState();

    useEffect(() => {
        setToken(localStorage.getItem("token"));

        const timer = setTimeout(() => {
            setToken(localStorage.removeItem("token"));
        }, 3600000);

        return () => clearTimeout(timer);
    }, [token]);

    const [value, setValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
    });
    const [obj, setObj] = useState({});

    useEffect(() => {
        setObj({
            firstNameIsValid: value.firstName.length >= 2,
            lastNameIsValid: value.lastName.length >= 2,
            emailIsValid: value.email.length !== "" && value.email.includes("@",),
            passwordIsValid: value.password.length >= 8,
            passwordIsMatches: value.password === value.repassword && value.password.length >= 8
        })
    }, [value]);

    const [blogPost, setBlogPost] = useState({
        title: "",
        description: "",
        story: "",
    })


    const [blogArray, setBlogArray] = useState([]);

    const [blogData, setBlogData] = useState([]);

    const [image, setImage] = useState();

    const [dark, setDark] = useState(false);

    return (
        <AuthContext.Provider value={{ dark, setDark, value, setValue, obj, setToken, token, blogPost, setBlogPost, blogArray, setBlogArray, setBlogData, blogData, image, setImage }} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;