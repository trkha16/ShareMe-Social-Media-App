import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Spinner from "../../components/spinner/Spinner";
import { db } from "../../firebase/firebase-config";
import useGetUser from "../../hooks/useGetUser";
import Feed from "../home/Feed";

const PinDetail = () => {
    const [pins, setPins] = useState(null);
    const [pinDetail, setPinDetail] = useState(null);
    const [comment, setComment] = useState("");
    const [readMore, setReadMore] = useState(false);
    const [addingComment, setAddingComment] = useState(false);
    const { pinId } = useParams();

    const { user: author } = useGetUser(pinDetail?.authorId);

    useEffect(() => {
        async function fetchPinDetails(pinId) {
            const docRef = doc(db, "posts", pinId);
            const docSnap = await getDoc(docRef);
            setPinDetail(docSnap.data());
        }

        fetchPinDetails(pinId);
    }, [pinId]);

    if (!pinDetail) return <Spinner message="Loading..." />;

    return (
        <div>
            <div className="flex xl:flex-row flex-col m-auto bg-white max-w-[1000px] rounded-[32px] p-5 shadow-2xl border-2">
                <div className="flex flex-1 justify-center items-center md:items-start max-h-[520px]">
                    <img
                        src={pinDetail?.imageUrl}
                        alt="details img"
                        className="rounded-t-3xl rounded-b-lg w-full h-full object-cover"
                    />
                </div>

                <div className=" flex w-full p-5 flex-1">
                    <div className="flex flex-col w-full">
                        <h1 className="text-[#111111] font-bold text-4xl">
                            {pinDetail?.title}
                        </h1>

                        <ReadMore>{pinDetail?.about}</ReadMore>

                        <div className="flex mt-5 justify-between items-center w-full">
                            <div className="flex gap-2">
                                <img
                                    src={author?.avatar}
                                    alt="author"
                                    className="w-12 h-12 rounded-full object-cover"
                                />

                                <div className="flex flex-col">
                                    <h3>{author?.username}</h3>
                                    <p>0 followers</p>
                                </div>
                            </div>

                            <Button>Follow</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10">
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
            <p className="text-[#111111] text-sm">
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
