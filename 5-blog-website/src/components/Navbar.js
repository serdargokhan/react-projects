import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { AuthContext } from "../context/AuthContext";

import BrandLogo from "../assets/brand-logo.png";
import DarkMode from "../assets/sleep-mode.png";

function Navbar() {

    const { token, setToken } = useContext(AuthContext);

    const [dark, setDark] = useState(false);

    function logoutHandler() {
        setToken("");
        localStorage.removeItem("token");
    }

    const isActive = ({ isActive }) =>
        isActive ? 'text-light-red border-b-2 font-bold' : 'text-light-gray hover:text-light-dark font-semibold dark:hover:text-white dark:text-light-white';


    function darkModeHandler() {
        setDark(prev => !prev);
    }

    dark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');

    return (
        <nav className="flex justify-between md:mx-auto sticky top-0 z-10 bg-light-white dark:bg-light-dark duration-700 py-2 items-center lg:px-20 md:px-32 w-full px-5 text-xs md:text-md">

            <NavLink to="/blog" >
                <motion.img
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 md:w-14 md:h-14"
                    src={BrandLogo}
                    alt="s-logo"
                />
            </NavLink>

            <div className="space-x-6">

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={darkModeHandler}>
                    <img
                        className="w-7 h-7 inline"
                        src={DarkMode}
                        alt="dark-mode"
                    />
                </motion.button>

                <NavLink className={isActive} to="/blog" >BLOG</NavLink>
                {token && <NavLink className={isActive} to="/create-blog-post" >CREATE POST</NavLink>}
                {!token && <NavLink className={isActive} to="/signup" >SIGN UP</NavLink>}
                {token && <NavLink onClick={logoutHandler} className={isActive} to="/" >LOG OUT</NavLink>}

            </div>
        </nav>
    );
}

export default Navbar;
