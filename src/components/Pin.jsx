import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const Pin = ({ pin }) => {
    const navigate = useNavigate();
    const [postHovered, setPostHovered] = useState(false);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        async function fetchAuthor() {
            const docRef = doc(db, "users", pin?.authorId);
            const docSnap = await getDoc(docRef);
            setAuthor(docSnap.data());
        }

        fetchAuthor();
    }, [pin?.authorId]);

    return (
        <div className="m-2">
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${pin?.id}`)}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >
                <img
                    src={pin?.imageUrl}
                    alt="post"
                    className="rounded-lg w-full"
                />
                {/* {postHovered && (
                    <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href="/"
                                    download={pin?.imageUrl}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button
                                    type="button"
                                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                >
                                    Saved
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin();
                                    }}
                                    type="button"
                                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                >
                                    Save
                                </button>
                            )}
                        </div>
                        <div className="flex justify-between items-center gap-2 w-full">
                            {pin?.imageUrl && (
                                <a
                                    href={pin?.imageUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className="bg-white flex items-center gap-2 text-black font-bold py-2 px-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                                >
                                    <BsFillArrowUpRightCircleFill />
                                </a>
                            )}
                        </div>
                    </div>
                )} */}
            </div>

            <Link
                to={`/user-profile/${pin.authorId}`}
                className="flex gap-2 mt-3 items-center"
            >
                <img
                    src={author?.avatar}
                    alt="author"
                    className="w-8 h-8 rounded-full object-cover"
                />
                <p className="font-semibold capitalize">{author?.username}</p>
            </Link>
        </div>
    );
};

export default Pin;
