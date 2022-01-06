
function Validation({ check, message }) {
    return (
        check && <p className="text-left text-sm text-dark-rose dark:text-dark-red duration-700 mt-1">{message}.</p>
    );
}

export default Validation;
