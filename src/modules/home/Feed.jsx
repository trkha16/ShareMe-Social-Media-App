import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MasonryLayout from "../../components/layout/MasonryLayout";
import Spinner from "../../components/spinner/Spinner";
import { db } from "../../firebase/firebase-config";

const Feed = ({ userId = null }) => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            // Query all posts
            let q = query(collection(db, "posts"));

            if (categoryId) {
                q = query(
                    collection(db, "posts"),
                    where("category", "==", categoryId)
                );
            } else if (userId) {
                q = query(
                    collection(db, "posts"),
                    where("authorId", "==", userId)
                );
            }

            const querySnapshot = await getDocs(q);
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setPins(results);
            setLoading(false);
        }

        fetchData();
    }, [categoryId, userId]);

    if (loading)
        return <Spinner message="We are adding new ideas to your feed!" />;

    return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
