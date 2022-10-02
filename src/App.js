import React from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./container/Login";
import Home from "./container/Home";

const App = () => {
    return (
        <GoogleOAuthProvider clientId="532047579340-the469ud1r8deh5b3djlelv9c47el3ei.apps.googleusercontent.com">
            <Routes>
                <Route path="login" element={<Login></Login>}></Route>
                <Route path="/*" element={<Home></Home>}></Route>
            </Routes>
        </GoogleOAuthProvider>
    );
};

export default App;
