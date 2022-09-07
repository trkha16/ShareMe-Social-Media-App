import React from "react";
import Masonry from "react-masonry-css";
import Pin from "../pin/Pin";

const breakpointObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
};

const MasonryLayout = ({ pins }) => {
    if (pins.length === 0)
        return (
            <div className="flex justify-center items-center">
                <h1>Nothing here</h1>
            </div>
        );

    return (
        <Masonry
            className="flex animate-slide-fwd"
            breakpointCols={breakpointObj}
        >
            {pins?.map((pin) => (
                <Pin key={pin.id} pin={pin} className="w-max" />
            ))}
        </Masonry>
    );
};

export default MasonryLayout;
