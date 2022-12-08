import React, { useEffect } from "react";
import { toast } from "react-toastify";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { Link, useNavigate } from "react-router-dom";
import { userAvatar } from "../utils/data";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const schema = yup
  .object()
  .shape({
    fullname: yup.string().required("Please enter fullname"),
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
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSaveUser = async (values) => {
    const q = query(
      collection(db, "users"),
      where("username", "==", values?.username)
    );

    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push(1);
    });

    console.log({ values });

    if (results?.length > 0) {
      toast.error("User existed", { pauseOnHover: false });
    } else {
      const saveUser = {
        id: uuidv4(),
        username: values?.username,
        fullname: values?.fullname,
        description: "@" + values?.username,
        avatar: userAvatar,
        password: values?.password,
      };

      localStorage.setItem("user", JSON.stringify(saveUser));
      await setDoc(doc(db, "users", saveUser?.id), saveUser);
      toast.success("Success!!!", { pauseOnHover: false });
      navigate("/");
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
    document.title = "Sign Up";
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
            onSubmit={handleSubmit(handleSaveUser)}
            className="flex flex-col gap-4 mt-6"
          >
            <Input control={control} placeholder="Fullname" name="fullname" />

            <Input control={control} placeholder="Username" name="username" />

            <Input
              control={control}
              placeholder="Password"
              name="password"
              type="password"
            />

            <Link
              to="/login"
              className="text-white text-lg ml-auto hover:text-red-500 font-semibold"
            >
              Login
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
