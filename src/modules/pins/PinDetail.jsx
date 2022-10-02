import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Spinner from "../../components/spinner/Spinner";
import { db } from "../../firebase/firebase-config";
import useGetUser from "../../hooks/useGetUser";
import { getUserInfo } from "../../utils/fetchUser";

import Feed from "../home/Feed";

const PinDetail = () => {
    const [pinDetail, setPinDetail] = useState(null);
    const [loved, setLoved] = useState(null);
    const { pinId } = useParams();
    const navigate = useNavigate();
    const userId = getUserInfo()?.googleId;

    const { user: author } = useGetUser(pinDetail?.authorId);

    console.log("pindetails hooks");

    useEffect(() => {
        async function fetchPinDetails(pinId) {
            const docRef = doc(db, "posts", pinId);
            const docSnap = await getDoc(docRef);
            setPinDetail(docSnap.data());
            setLoved(docSnap.data()?.loved);
        }

        fetchPinDetails(pinId);
    }, [pinId, loved]);

    const lovePin = async () => {
        let lovedUsers = pinDetail?.lovedUsers;

        const loveExist = lovedUsers.includes(Number(userId));

        if (!loveExist) {
            lovedUsers.push(Number(userId));
            setLoved((prev) => prev + 1);
        } else {
            lovedUsers = lovedUsers.filter((item) => item !== Number(userId));
            setLoved((prev) => prev - 1);
        }

        try {
            const cloneValues = {
                ...pinDetail,
                loved: loveExist ? loved - 1 : loved + 1,
                lovedUsers: lovedUsers,
            };
            await setDoc(doc(db, "posts", pinId), cloneValues);
        } catch (error) {
            console.log("Errors", error);
        }
    };

    if (!pinDetail) return <Spinner message="Loading..." />;

    return (
        <div>
            <div className="flex xl:flex-row flex-col m-auto bg-white max-w-[1000px] rounded-[32px] p-5 shadow-2xl border-2 dark:bg-[#22222C] dark:border-none">
                <div className="flex-1 h-full">
                    <div className="flex justify-center items-center md:items-start h-full shadow-lg cursor-pointer">
                        <img
                            src={pinDetail?.imageUrl}
                            alt="details img"
                            className="rounded-3xl w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className=" flex w-full p-5 flex-1">
                    <div className="flex flex-col w-full">
                        <div
                            className={`flex items-center justify-center gap-1 ml-auto cursor-pointer px-3 py-2 rounded-xl text-white ${
                                pinDetail?.lovedUsers.includes(Number(userId))
                                    ? "bg-red-600"
                                    : "bg-slate-600"
                            }`}
                            onClick={lovePin}
                        >
                            <AiOutlineHeart />
                            <span>{loved}</span>
                        </div>

                        <h1 className="text-[#111111] font-bold text-4xl mb-5 dark:text-white">
                            {pinDetail?.title}
                        </h1>

                        <ReadMore>{pinDetail?.about}</ReadMore>

                        <div className="flex mt-5 justify-between items-center w-full">
                            <div className="flex gap-2">
                                <img
                                    src={author?.avatar}
                                    alt="author"
                                    className="w-12 h-12 rounded-full object-cover cursor-pointer"
                                    onClick={() =>
                                        navigate(
                                            `/user-profile/${author?.googleId}`
                                        )
                                    }
                                />

                                <div className="flex flex-col">
                                    <h3
                                        className="cursor-pointer dark:text-gray-300 text-lg"
                                        onClick={() =>
                                            navigate(
                                                `/user-profile/${author?.googleId}`
                                            )
                                        }
                                    >
                                        {author?.username}
                                    </h3>
                                    <p className="dark:text-gray-300 text-sm">
                                        0 followers
                                    </p>
                                </div>
                            </div>

                            <Button>Follow</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h1 className="text-center text-4xl font-bold mb-5 dark:text-white">
                    Related Posts
                </h1>
                <Feed categoryRelate={pinDetail?.category} />
            </div>
        </div>
    );
};

export default PinDetail;

const ReadMore = ({ children }) => {
    const content = children;
    const maxLength = 200;
    const [isReadMore, setIsReadMore] = useState(content.length > maxLength);

    return (
        <div>
            <p className="text-[#111111] text-sm dark:text-gray-300">
                {isReadMore ? content.slice(0, maxLength) + "..." : content}
                {content.length > maxLength && (
                    <span
                        onClick={() => setIsReadMore(!isReadMore)}
                        className="font-semibold cursor-pointer hover:border-b-2 hover:border-black"
                    >
                        {isReadMore ? " Read more" : " Show less"}
                    </span>
                )}
            </p>
        </div>
    );
};
