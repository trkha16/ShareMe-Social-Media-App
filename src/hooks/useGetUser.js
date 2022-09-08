import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";

export default function useGetUser(userId) {
    const [user, setUser] = useState();

    useEffect(() => {
        async function fetchUser(userId) {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            setUser(docSnap.data());
        }

        fetchUser(userId);
    }, [userId]);

    return {
        user,
    };
}
