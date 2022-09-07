import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../modules/home/Navbar";
import Pin from "../../modules/pins/Pin";
import UserProfile from "../../modules/users/UserProfile";

const Main = ({ userInfo }) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50 dark:bg-darkMode">
                <Navbar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    user={userInfo && userInfo}
                />
            </div>

            <Routes>
                <Route path="/user-profile/:userId" element={<UserProfile />} />
                <Route
                    path="/*"
                    element={<Pin user={userInfo && userInfo} />}
                />
            </Routes>
        </div>
    );
};

export default Main;
