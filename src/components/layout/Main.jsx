import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../modules/home/Navbar";
import Pin from "../../modules/pins/Pin";
import UpdateUserProfile from "../../modules/users/UpdateUserProfile";
import UserProfile from "../../modules/users/UserProfile";

const Main = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50 dark:bg-darkMode">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          userId={userId}
        />
      </div>

      <Routes>
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/update-profile/:userId" element={<UpdateUserProfile />} />
        <Route path="/*" element={<Pin userId={userId} />} />
      </Routes>
    </div>
  );
};

export default Main;
