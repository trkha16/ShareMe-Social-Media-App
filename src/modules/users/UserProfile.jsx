import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import Feed from "../home/Feed";

const UserProfile = () => {
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        async function fetchAuthor() {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            setUserInfo(docSnap.data());
        }

        fetchAuthor();
    }, [userId]);

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <img
                    src={userInfo?.avatar}
                    alt="avatar"
                    className="rounded-full object-cover cursor-pointer"
                />
                <h1 className="text-3xl font-semibold mt-5">
                    {userInfo?.username}
                </h1>
            </div>

            <div>
                <Feed userId={userInfo?.googleId} />
            </div>
        </div>
    );
};

export default UserProfile;
