import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import { getUserInfo } from "../../utils/fetchUser";
import Feed from "../home/Feed";

const UserProfile = () => {
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const { googleId } = getUserInfo();
    const navigation = useNavigate();

    useEffect(() => {
        async function fetchAuthor() {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            setUserInfo(docSnap.data());
        }

        fetchAuthor();
    }, [userId]);

    useEffect(() => {
        document.title = userInfo?.username || "ShareMe";
        return () => {
            document.title = "ShareMe";
        };
    }, [userInfo?.username]);

    return (
        <div className="mt-10">
            <div className="flex flex-col justify-center items-center">
                <img
                    src={userInfo?.avatar}
                    alt="avatar"
                    className="rounded-full object-cover cursor-pointer"
                />
                <h1 className="text-3xl font-semibold mt-5 dark:text-white">
                    {userInfo?.username}
                </h1>
                {googleId === userId && (
                    <div
                        className="flex justify-center items-center text-black bg-[#efefef] hover:bg-[#e2e2e2] dark:bg-white px-4 py-2 rounded-full mt-5 cursor-pointer"
                        onClick={() =>
                            navigation(`/update-profile/${userInfo?.googleId}`)
                        }
                    >
                        <p className="text-md font-semibold">Edit Profile</p>
                    </div>
                )}
            </div>

            <div className="mt-10">
                <Feed userId={userInfo?.googleId} />
            </div>
        </div>
    );
};

export default UserProfile;
