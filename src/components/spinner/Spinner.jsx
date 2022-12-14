import React from "react";
import { Circles } from "react-loader-spinner";

const Spinner = ({ message }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="m-5">
                <Circles height="50" width="200" color="#00BFFF" />
            </div>
            <p className="text-lg text-center px-2 dark:text-white">
                {message}
            </p>
        </div>
    );
};

export default Spinner;
