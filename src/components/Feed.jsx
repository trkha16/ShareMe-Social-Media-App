import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase-config";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            if (categoryId) {
                // get data
            } else {
                const q = query(collection(db, "posts"));

                const querySnapshot = await getDocs(q);
                const results = [];
                querySnapshot.forEach((doc) => {
                    results.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setPins(results);
            }
            setLoading(false);
        }

        fetchData();
    }, [categoryId]);

    if (loading)
        return <Spinner message="We are adding new ideas to your feed!" />;

    return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
