import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/input/Input";
import useUploadImage from "../../hooks/useUploadImage";
import { getUserInfo } from "../../utils/fetchUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase-config";

const schema = yup
    .object()
    .shape({
        username: yup.string().required("Please enter your name"),
    })
    .required();

const UpdateUserProfile = () => {
    const { userId } = useParams();
    const { googleId, avatar, username, description } = getUserInfo();
    const { imageUrl, uploadImage, setImageUrl } = useUploadImage();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            username: username,
            description: description,
            avatar: imageUrl,
            googleId: googleId,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmitProfile = async (values) => {
        try {
            const cloneValues = {
                ...values,
                avatar: imageUrl,
            };

            await setDoc(doc(db, "users", userId), cloneValues);
            localStorage.setItem("user", JSON.stringify(cloneValues));

            toast.success("Success!!!", {
                pauseOnHover: false,
                delay: 0,
            });
            navigate(`/user-profile/${userId}`);
        } catch (error) {
            console.log("Errors", error);
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
        document.title = "Edit profile";
        setImageUrl(avatar);
        return () => {
            document.title = "ShareMe";
        };
    }, [avatar, setImageUrl]);

    if (userId !== googleId) return null;

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <div className="dark:bg-white p-2 rounded-full bg-hoverE2">
                <div className="w-[120px] h-[120px] rounded-full flex justify-center items-center cursor-pointer">
                    <label className="w-full h-full rounded-full cursor-pointer z-10">
                        <img
                            src={imageUrl}
                            alt="avatar"
                            className="w-full h-full rounded-full object-cover cursor-pointer"
                        />
                        <input
                            type="file"
                            name="upload-image"
                            onChange={uploadImage}
                            className="w-0 h-0"
                        />
                    </label>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(handleSubmitProfile)}
                className="mt-10 flex flex-col gap-10 justify-center items-center"
            >
                <Input
                    control={control}
                    placeholder="Enter your name"
                    name="username"
                />

                <Input
                    control={control}
                    placeholder="Enter your description"
                    name="description"
                />

                <button
                    type="submit"
                    className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none hover:bg-red-600"
                    disabled={isSubmitting}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default UpdateUserProfile;
