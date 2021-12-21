
function Button(props) {
    return (
        <button onClick={(e) => props.onClick(e)}
            className="font-sans font-medium px-10 py-3 text-white bg-blue-500 rounded-3xl hover:bg-blue-600 transform hover:scale-105 cursor-pointer my-4 transition-all" type="submit">
            {props.children}
        </button>
    );
}

export default Button;
