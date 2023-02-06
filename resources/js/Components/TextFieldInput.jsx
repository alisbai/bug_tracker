function TextFieldInput({rows, cols, name, id, value, className, required, handleChange}) {

    return (
    <textarea
    rows={rows}
    cols={cols}
    name={name}
    id={id}
    className={
        `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
        className
    }
    required={required}
    onChange={(e) => handleChange(e)}
    value={value}
    />
    )
}

export default TextFieldInput;