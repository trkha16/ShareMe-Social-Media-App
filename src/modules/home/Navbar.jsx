import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../../redux/globalSlice";
import useDarkMode from "../../hooks/useDarkMode";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useDarkMode();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleDarkMode(!darkMode));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode(darkMode));
        setDarkMode(!darkMode);
    };

    if (!user) return null;

    return (
        <div className="flex gap-2 md:gap-5 w-full mt-5 mb-7">
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
                <IoMdSearch fontSize={21} className="ml-1" />
                <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    value={searchTerm}
                    onFocus={() => navigate("/search")}
                    className="p-2 w-full bg-white outline-none"
                />
            </div>
            <div className="flex gap-3">
                <Link
                    to={`user-profile/${user?.googleId}`}
                    className="hidden md:block"
                >
                    <img
                        src={user?.avatar}
                        alt="user"
                        className="w-14 h-12 rounded-lg"
                    />
                </Link>
                <Link
                    to="create-pin"
                    className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center dark:bg-red-500 dark:hover:bg-red-600"
                >
                    <IoMdAdd />
                </Link>
                <div
                    onClick={handleToggleDarkMode}
                    className="flex justify-center items-center border w-12 h-12 md:w-14 md:h-12 cursor-pointer hover:shadow-md rounded-lg dark:bg-red-500 dark:border-0 dark:text-white dark:hover:bg-red-600"
                >
                    {darkMode ? <MdDarkMode /> : <MdLightMode />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
