import React, { useEffect } from "react";
import { toast } from "react-toastify";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const schema = yup
    .object()
    .shape({
        username: yup.string().required("Please enter username"),
        password: yup.string().required("Please enter password"),
    })
    .required();

const Login = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: yupResolver(schema),
    });

    const handleLogin = async (values) => {
        const q = query(
            collection(db, "users"),
            where("username", "==", values?.username),
            where("password", "==", values?.password)
        );

        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
            results.push({
                ...doc.data(),
            });
        });

        if (results?.length > 0) {
            localStorage.setItem("user", JSON.stringify(results[0]));
            toast.success("Success!!!", { pauseOnHover: false });
            navigate("/");
        } else {
            toast.error("Wrong username or password", {
                pauseOnHover: false,
            });
            reset();
        }
    };

    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
                delay: 0,
            });
        }
    }, [errors]);

    useEffect(() => {
        document.title = "Login";
        return () => {
            document.title = "ShareMe";
        };
    }, []);

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

                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="flex flex-col gap-4 mt-6"
                    >
                        <Input
                            control={control}
                            placeholder="Username"
                            name="username"
                        />

                        <Input
                            control={control}
                            placeholder="Password"
                            name="password"
                            type="password"
                        />

                        <Link
                            to="/signup"
                            className="text-white text-lg ml-auto hover:text-red-500 font-semibold"
                        >
                            Sign up
                        </Link>

                        <button
                            type="submit"
                            className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none m-auto hover:bg-red-600"
                            disabled={isSubmitting}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
