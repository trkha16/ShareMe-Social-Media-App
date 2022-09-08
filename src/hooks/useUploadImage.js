import { useState } from "react";

export default function useUploadImage() {
    const [loading, setLoading] = useState(false);
    const [wrongImageType, setWrongImageType] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const uploadImage = (files) => {
        const { type } = files.target.files[0];
        if (
            type === "image/png" ||
            type === "image/svg" ||
            type === "image/jpeg" ||
            type === "image/gif" ||
            type === "image/tiff"
        ) {
            setWrongImageType(false);
            setLoading(true);

            const formData = new FormData();
            formData.append("file", files.target.files[0]);
            formData.append("upload_preset", "js2cwnpf");

            fetch("https://api.cloudinary.com/v1_1/trkha1609/image/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.secure_url !== "") {
                        setImageUrl(data.secure_url);
                    }
                })
                .catch((err) => console.error(err));

            setLoading(false);
        } else {
            setWrongImageType(true);
            setLoading(false);
        }
    };

    return {
        loading,
        wrongImageType,
        imageUrl,
        uploadImage,
        setImageUrl,
    };
}
