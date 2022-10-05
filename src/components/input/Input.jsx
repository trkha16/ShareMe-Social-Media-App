import React from "react";
import { useController } from "react-hook-form";

const Input = ({
    name = "",
    type = "text",
    control,
    className = "",
    ...props
}) => {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });

    return (
        <input
            id={name}
            type={type}
            {...field}
            className={`outline-none text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg p-2 dark:bg-darkMode dark:border-[#3A3A43] dark:text-white ${className}`}
            {...props}
        />
    );
};

export default Input;
