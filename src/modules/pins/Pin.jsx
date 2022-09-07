import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "../home/Feed";
import Search from "../home/Search";
import CreatePin from "./CreatePin";
import PinDetail from "./PinDetail";

const Pin = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="h-full">
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/category/:categoryId" element={<Feed />} />
                <Route
                    path="/pin-detail/:pinId"
                    element={<PinDetail user={user} />}
                />
                <Route path="/create-pin" element={<CreatePin user={user} />} />
                <Route
                    path="/search"
                    element={
                        <Search
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

export default Pin;
