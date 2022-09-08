import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logowhite.png";
import { categories } from "../../utils/data";
import { useSelector } from "react-redux";
import useGetUser from "../../hooks/useGetUser";

const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize dark:text-white dark:hover:text-red-400";
const isActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 font-extrabold border-r-4 border-black transition-all duration-200 ease-in-out capitalize dark:text-red-500 dark:border-red-500";

const Sidebar = ({ userId, closeToggle }) => {
    const darkMode = useSelector((state) => state.global.darkMode);

    const { user } = useGetUser(userId);

    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    };

    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar dark:bg-darkMode">
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="flex px-5 my-6 pt-1 w-190 items-center"
                    onClick={handleCloseSidebar}
                >
                    <img
                        src={`${darkMode ? logoWhite : logo}`}
                        alt="logo"
                        className="w-full"
                    />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? isActiveStyle : isNotActiveStyle
                        }
                        onClick={handleCloseSidebar}
                    >
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl dark:text-white">
                        Discover
                    </h3>
                    <div className="flex flex-col gap-5 overflow-y-scroll hide-scrollbar h-[80%]">
                        {categories
                            .slice(0, categories.length - 1)
                            .map((category) => (
                                <NavLink
                                    to={`/category/${category.name}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? isActiveStyle
                                            : isNotActiveStyle
                                    }
                                    onClick={handleCloseSidebar}
                                    key={category.name}
                                >
                                    {category.name}
                                </NavLink>
                            ))}
                    </div>
                </div>
            </div>
            {user && (
                <Link
                    to={`user-profile/${user.googleId}`}
                    className="flex my-5 mt-0 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3 dark:bg-[#24242C] dark:text-white"
                    onClick={handleCloseSidebar}
                >
                    <img
                        src={user?.avatar}
                        alt={user?.username}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{user?.username}</p>
                </Link>
            )}
        </div>
    );
};

export default Sidebar;
