import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

import { categories } from "../../utils/data";
import { db } from "../../firebase/firebase-config";
import Spinner from "../../components/spinner/Spinner";

const CreatePin = ({ user }) => {
    const [title, setTitle] = useState("");
    const [about, setAbout] = useState("");
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [wrongImageType, setWrongImageType] = useState(false);

    const navigate = useNavigate();

    const uploadImage = (files) => {
        const { type } = files.target.files[0];
        if (
            type === "image/png" ||
            type === "image/svg" ||
            type === "image/jpeg" ||
            type === "image/gif" ||
            type === "image/tiff"
        ) {
            setWrongImageType(false);
            setLoading(true);

            const formData = new FormData();
            formData.append("file", files.target.files[0]);
            formData.append("upload_preset", "js2cwnpf");

            fetch("https://api.cloudinary.com/v1_1/trkha1609/image/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.secure_url !== "") {
                        setImageUrl(data.secure_url);
                    }
                })
                .catch((err) => console.error(err));

            setLoading(false);
        } else {
            setWrongImageType(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Create pin";
        return () => {
            document.title = "ShareMe";
        };
    }, []);

    const savePin = async () => {
        if (title && about && category && imageUrl) {
            await addDoc(collection(db, "posts"), {
                title,
                about,
                imageUrl,
                category,
                authorId: user?.googleId,
            });
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
            <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full dark:bg-darkMode">
                <div className="bg-secondaryColor p-3 flex flex-0.7 w-full rounded-lg">
                    <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420 rounded-lg">
                        {loading && <Spinner />}
                        {wrongImageType && <p>Wrong image type</p>}
                        {!imageUrl ? (
                            <label>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-bold text-2xl">
                                            <AiOutlineCloudUpload />
                                        </p>
                                        <p className="text-lg">
                                            Click to upload
                                        </p>
                                    </div>
                                    <p className="mt-32 text-gray-400">
                                        Use high-quality JPG, SVG, PNG, GIF or
                                        TIFF less than 20mb
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    name="upload-image"
                                    onChange={uploadImage}
                                    className="w-0 h-0"
                                />
                            </label>
                        ) : (
                            <div className="relative h-full">
                                <img
                                    src={imageUrl}
                                    alt="upload-img"
                                    className="w-full h-full"
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                    onClick={() => setImageUrl(null)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title here"
                        className="outline-none text-2xl sm:text-3xl font-bold border-2 border-gray-200 rounded-lg p-2 dark:bg-darkMode dark:border-[#3A3A43] dark:text-white"
                    />

                    {user && (
                        <div className="flex gap-2 my-2 items-center bg-white rounded-lg dark:bg-darkMode">
                            <img
                                src={user?.avatar}
                                className="w-10 h-10 rounded-full"
                                alt="user-profile"
                            />
                            <p className="font-bold dark:text-white">
                                {user?.username}
                            </p>
                        </div>
                    )}

                    <input
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Enter your description"
                        className="outline-none text-base sm:text-lg border-2 border-gray-200 rounded-lg p-2 dark:bg-darkMode dark:border-[#3A3A43] dark:text-white"
                    />

                    <div className="flex flex-col">
                        <div>
                            <p className="mb-2 font-semibold text-lg sm:text-xl dark:text-white">
                                Choose Pin Category
                            </p>
                            <select
                                onChange={(e) => setCategory(e.target.value)}
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
                                type="button"
                                onClick={savePin}
                                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none hover:bg-red-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePin;
