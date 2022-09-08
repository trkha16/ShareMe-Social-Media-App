import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UploadImage from "../../components/image/UploadImage";
import useUploadImage from "../../hooks/useUploadImage";
import { getUserInfo } from "../../utils/fetchUser";

const UpdateUserProfile = () => {
    const { userId } = useParams();
    const { googleId } = getUserInfo();
    const { loading, imageUrl, uploadImage, wrongImageType, setImageUrl } =
        useUploadImage();

    useEffect(() => {
        document.title = "Edit profile";
        return () => {
            document.title = "ShareMe";
        };
    }, []);

    if (userId !== googleId) return null;

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <div>
                <UploadImage
                    loading={loading}
                    imageUrl={imageUrl}
                    uploadImage={uploadImage}
                    wrongImageType={wrongImageType}
                    setImageUrl={setImageUrl}
                />
            </div>
        </div>
    );
};

export default UpdateUserProfile;
