import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const Pin = ({ pin, userId = null }) => {
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
                className="relative cursor-zoom-in w-auto hover:shadow-lg shadow-md rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >
                <img
                    src={pin?.imageUrl}
                    alt="post"
                    className="rounded-lg w-full"
                />
                {postHovered && (
                    <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
                        <div className="absolute top-0 bottom-0 right-0 left-0 bg-blackImageOverlay"></div>
                    </div>
                )}
            </div>

            {!userId && (
                <Link
                    to={`/user-profile/${pin.authorId}`}
                    className="flex gap-2 mt-3 items-center"
                >
                    <img
                        src={author?.avatar}
                        alt="author"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="font-semibold capitalize dark:text-white">
                        {author?.username}
                    </p>
                </Link>
            )}
        </div>
    );
};

export default Pin;
