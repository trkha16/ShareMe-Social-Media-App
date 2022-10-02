import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { categories } from "../../utils/data";
import { db } from "../../firebase/firebase-config";
import UploadImage from "../../components/image/UploadImage";
import useUploadImage from "../../hooks/useUploadImage";
import Input from "../../components/input/Input";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useGetUser from "../../hooks/useGetUser";

const schema = yup
    .object()
    .shape({
        title: yup.string().required("Please enter the title"),
        about: yup.string().required("Please enter the description"),
        category: yup.string().required("Please select the category"),
    })
    .required();

const CreatePin = ({ userId }) => {
    const { loading, imageUrl, uploadImage, wrongImageType, setImageUrl } =
        useUploadImage();
    const navigate = useNavigate();

    const { user } = useGetUser(userId);

    console.log("createpin hooks");

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            about: "",
            imageUrl: "",
            category: "",
            authorId: user?.googleId,
        },
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        document.title = "Create pin";
        return () => {
            document.title = "ShareMe";
        };
    }, []);

    const savePin = async (values) => {
        if (!imageUrl) {
            toast.error("Please choose image", {
                pauseOnHover: false,
                delay: 0,
            });
            return;
        }

        try {
            const cloneValues = {
                ...values,
                imageUrl,
                loved: 0,
                lovedUsers: [],
            };
            await addDoc(collection(db, "posts"), cloneValues);
            toast.success("Success!!!", {
                pauseOnHover: false,
                delay: 0,
            });
            navigate("/");
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

    return (
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
            <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full dark:bg-darkMode">
                <UploadImage
                    loading={loading}
                    imageUrl={imageUrl}
                    uploadImage={uploadImage}
                    wrongImageType={wrongImageType}
                    setImageUrl={setImageUrl}
                />

                <form
                    onSubmit={handleSubmit(savePin)}
                    className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full"
                >
                    <Input
                        control={control}
                        placeholder="Enter title here"
                        name="title"
                    />

                    {user && (
                        <div className="flex gap-2 my-2 items-center bg-white rounded-lg dark:bg-darkMode">
                            <img
                                src={user?.avatar}
                                className="w-10 h-10 rounded-full object-cover"
                                alt="user-profile"
                            />
                            <p className="font-bold dark:text-white">
                                {user?.username}
                            </p>
                        </div>
                    )}

                    <Input
                        control={control}
                        placeholder="Enter your description"
                        name="about"
                    />

                    <div className="flex flex-col">
                        <div>
                            <p className="mb-2 font-semibold text-lg sm:text-xl dark:text-white">
                                Choose Pin Category
                            </p>
                            <select
                                onChange={(e) => {
                                    setValue("category", e.target.value);
                                }}
                                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                            >
                                <option value="other" className="bg-white">
                                    Select Category
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category.name}
                                        className="text-base border-0 outline-none capitalize bg-white text-black"
                                        value={category.name}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end items-end mt-5">
                            <button
                                type="submit"
                                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none hover:bg-red-600"
                                disabled={isSubmitting}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePin;
