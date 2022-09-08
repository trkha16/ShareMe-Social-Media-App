import React from "react";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { useNavigate } from "react-router-dom";
import { userAvatar } from "../utils/data";

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        const decoded = jwt_decode(response.credential);

        const { name, sub } = decoded;

        const saveUser = {
            googleId: sub,
            username: name,
            avatar: userAvatar,
            description: "@" + name,
        };
        localStorage.setItem("user", JSON.stringify(saveUser));

        //await setDoc(doc(db, "users", sub), saveUser);

        toast.success("Success!!!", { pauseOnHover: false });
        navigate("/");
    };

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />

                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width="130px" alt="logo" />
                    </div>

                    <div className="shadow-2xl">
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={responseGoogle}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
