import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Spinner from "../spinner/Spinner";

const UploadImage = ({
  loading,
  wrongImageType,
  imageUrl,
  uploadImage,
  setImageUrl,
}) => {
  return (
    <div className="bg-secondaryColor p-3 flex flex-0.7 w-full rounded-lg">
      <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420 rounded-lg">
        {loading && <Spinner />}
        {wrongImageType && <p>Wrong image type</p>}
        {!imageUrl ? (
          <label>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-2xl">
                  <AiOutlineCloudUpload />
                </p>
                <p className="text-lg">Click to upload</p>
              </div>
              <p className="mt-32 text-gray-400">
                Use high-quality JPG, SVG, PNG, GIF or TIFF less than 20mb
              </p>
            </div>
            <input
              type="file"
              name="upload-image"
              onChange={uploadImage}
              className="w-0 h-0"
            />
          </label>
        ) : (
          <div className="relative h-full">
            <img
              src={imageUrl}
              alt="upload-img"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
              onClick={() => setImageUrl(null)}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
