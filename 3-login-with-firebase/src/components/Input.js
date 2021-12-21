
function Input(props) {

    const classes = props.type === "text" ? "bg-gray-200 px-4 py-3 rounded-2xl w-64 sm:w-52 focus:ring-2 focus:ring-blue-400 focus:bg-white focus:outline-none" : "bg-gray-200 px-4 py-3 rounded-2xl w-64 sm:w-full focus:ring-2 focus:ring-blue-400 focus:bg-white focus:outline-none"

    return (
        <div className="flex flex-col mx-2 sm:justify-center my-2 sm:items-start ">
            <label htmlFor={props.label} className="italic text-gray-800">{props.label}</label>
            <input onChange={props.changeHandler} className={classes} type={props.type} id={props.label} value={props.value} />
        </div>
    );
}

export default Input;
