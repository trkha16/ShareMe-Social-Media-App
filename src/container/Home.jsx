import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import logo from "../assets/logo.png";

import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import Pin from "./Pin";
import { getUserInfo } from "../utils/fetchUser";

const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const scrollRef = useRef(null);
    const userInfo = getUserInfo();

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={userInfo && userInfo} />
            </div>

            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu
                        fontSize={40}
                        className="cursor-pointer"
                        onClick={() => setToggleSidebar(true)}
                    ></HiMenu>
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-28" />
                    </Link>
                    <Link to={`user-profile/${userInfo?.googleId}`}>
                        <img
                            src={userInfo?.avatar}
                            alt="logo"
                            className="w-28 rounded-full"
                        />
                    </Link>
                </div>
            </div>

            {toggleSidebar && (
                <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                    <div className="absolute w-full flex justify-end items-center p-2">
                        <AiFillCloseCircle
                            fontSize={30}
                            className="cursor-pointer"
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
                <Routes>
                    <Route
                        path="/user-profile/:userId"
                        element={<UserProfile />}
                    />
                    <Route
                        path="/*"
                        element={<Pin user={userInfo && userInfo} />}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default Home;
