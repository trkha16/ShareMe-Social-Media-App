import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "../home/Feed";
import Search from "../home/Search";
import CreatePin from "./CreatePin";
import PinDetail from "./PinDetail";

const Pin = ({ userId }) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="h-full">
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/category/:categoryId" element={<Feed />} />
                <Route path="/pin-detail/:pinId" element={<PinDetail />} />
                <Route
                    path="/create-pin"
                    element={<CreatePin userId={userId} />}
                />
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
