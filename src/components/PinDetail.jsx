import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
    const [pins, setPins] = useState(null);
    const [pinDetail, setPinDetail] = useState(null);
    const [comment, setComment] = useState("");
    const [addingComment, setAddingComment] = useState(false);
    const { pinId } = useParams();

    const fetchPinDetails = () => {
        let query = pinDetailQuery(pinId);

        if (query) {
            client.fetch(query).then((data) => {
                setPinDetail(data[0]);

                if (data[0]) {
                    query = pinDetailMorePinQuery(data[0]);

                    client.fetch(query).then((res) => setPins(res));
                }
            });
        }
    };

    useEffect(() => {
        fetchPinDetails();
    }, [pinId]);

    if (!pinDetail) return <Spinner message="Loading..." />;

    return (
        <div className="flex xl:flex-row flex-col m-auto bg-white max-w-[1500px] rounded-[32px]">
            <div className="flex justify-center items-center md:items-start flex-initial">
                <img
                    src={pinDetail?.image && urlFor(pinDetail.image).url()}
                    alt="details img"
                    className="rounded-t-3xl rounded-b-lg"
                />
            </div>

            <div className="w-full p-5 flex-1 xl:min-w-620">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <a
                            href={`${pinDetail.image?.asset?.url}?dl=`}
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                        >
                            <MdDownloadForOffline />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PinDetail;