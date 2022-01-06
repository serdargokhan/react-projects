import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Input({ id, type, label, placeholder, val }) {

    const { value, setValue, blogPost, setBlogPost } = useContext(AuthContext);

    function onChangeHandler(e) {
        setValue({
            ...value,
            [e.target.id]: e.target.value
        });
        setBlogPost({
            ...blogPost,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className="md:flex-row lg:flex-row flex-col justify-between items-center">
            <label className="font-semibold block dark:text-white" htmlFor={id}>{label}</label>
            <input onChange={onChangeHandler} className={`px-3 bg-light-gray-300 placeholder:text-white dark:placeholder:text-light-dark py-2 border-2 lg:w-2/5 shadow-sm focus:outline-none rounded-md border-light-gray-300 focus:border-light-purple w-full focus:ring-light-purple md:w-1/2 ${id === "story" ? "hidden" : ""}`} type={type} id={id} placeholder={placeholder} value={val} />

            <textarea onChange={onChangeHandler} className={`${id !== "story" ? "hidden" : ""} bg-light-gray-300 placeholder:text-white px-3 py-2 border-2 lg:w-2/5 shadow-sm focus:outline-none rounded-md dark:placeholder:text-light-dark resize-none border-light-gray-300 focus:border-light-purple w-full focus:ring-light-purple md:w-1/2`} name={label} id={id} placeholder={placeholder} rows="7"></textarea>

        </div>
    );
}

export default Input;
