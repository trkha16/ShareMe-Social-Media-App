import React from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./container/Login";
import Home from "./container/Home";

const App = () => {
    return (
        <GoogleOAuthProvider clientId="482348821561-duvsnu5adk0fbtkblfo3b5belu4qn7og.apps.googleusercontent.com">
            <Routes>
                <Route path="login" element={<Login></Login>}></Route>
                <Route path="/*" element={<Home></Home>}></Route>
            </Routes>
        </GoogleOAuthProvider>
    );
};

export default App;
