import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { getUserInfo } from "../utils/fetchUser";

export default function useGetUser(userId) {
    const [user, setUser] = useState();
    const [userLocal, setUserLocal] = useState(getUserInfo());

    // useEffect(() => {
    //     setUserLocal(getUserInfo());

    //     return () => {
    //         setUserLocal(null);
    //     };
    // }, []);

    useEffect(() => {
        async function fetchUser(userId) {
            try {
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);
                setUser(docSnap.data());
            } catch (error) {
                console.log(error);
            }
        }

        if (userId) {
            fetchUser(userId);
        }
    }, [userId, userLocal]);

    return {
        user,
    };
}
