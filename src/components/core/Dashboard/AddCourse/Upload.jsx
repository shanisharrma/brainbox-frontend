/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { FiUploadCloud } from "react-icons/fi";

const Upload = ({
  name,
  label,
  register,
  errors,
  setValue,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  return (
    <>
      <div className="mb-3">
        <label
          htmlFor={name}
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          {label} {!viewData && <sup className="text-crimsonRed-50">*</sup>}
        </label>
        <div
          className={`${
            isDragActive ? "bg-rich-black-200" : "bg-rich-black-300"
          } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-rich-black-100`}
        >
          {previewSource ? (
            <div className="flex flex-col w-full p-6">
              {!video ? (
                <img
                  src={previewSource}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <Player aspectRatio="16:9" playsInline src={previewSource} />
              )}
              {!viewData && (
                <span
                  onClick={() => {
                    setPreviewSource("");
                    setSelectedFile(null);
                    setValue(name, null);
                  }}
                  className="cursor-pointer mt-3 text-center text-rich-black-100 underline"
                >
                  Cancel
                </span>
              )}
            </div>
          ) : (
            <div
              className="flex w-full flex-col items-center p-6"
              {...getRootProps()}
            >
              <input ref={inputRef} {...getInputProps()} />
              <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                <FiUploadCloud className="text-2xl text-crimsonRed-50" />
              </div>
              <p className="mt-2 max-w-[200px] text-center text-sm text-rich-black-100">
                Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                <span className="font-semibold text-crimsonRed-50">Browse</span>{" "}
                a file
              </p>
              <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-rich-black-100">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </>
  );
};

export default Upload;
