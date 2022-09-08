import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logowhite.png";

import { getUserInfo } from "../utils/fetchUser";
import Sidebar from "../modules/home/Sidebar";
import { useSelector } from "react-redux";
import Main from "../components/layout/Main";

const Home = () => {
    const darkMode = useSelector((state) => state.global.darkMode);

    const [toggleSidebar, setToggleSidebar] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const userInfo = getUserInfo();

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out dark:bg-darkMode">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={userInfo && userInfo} />
            </div>

            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu
                        fontSize={40}
                        className="cursor-pointer dark:text-white"
                        onClick={() => setToggleSidebar(true)}
                    ></HiMenu>
                    <Link to="/">
                        <img
                            src={`${darkMode ? logoWhite : logo}`}
                            alt="logo"
                            className="w-28"
                        />
                    </Link>
                    <Link to={`user-profile/${userInfo?.googleId}`}>
                        <img
                            src={userInfo?.avatar}
                            alt="logo"
                            className="w-16 rounded-full"
                        />
                    </Link>
                </div>
            </div>

            {toggleSidebar && (
                <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                    <div className="absolute w-full flex justify-end items-center p-4">
                        <AiFillCloseCircle
                            fontSize={30}
                            className="cursor-pointer dark:text-white"
                            onClick={() => setToggleSidebar(false)}
                        />
                    </div>
                    <Sidebar
                        user={userInfo && userInfo}
                        closeToggle={setToggleSidebar}
                    />
                </div>
            )}

            <div
                className="pb-2 flex-1 h-screen overflow-y-scroll"
                ref={scrollRef}
            >
                <Main userInfo={userInfo}></Main>
            </div>
        </div>
    );
};

export default Home;
