import { useDispatch, useSelector } from "react-redux";
import { IconBtn } from "../../../common";
import { FiUpload } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { updateProfilePicture } from "../../../../services/operations/settingsAPI";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  const handleFileUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("profile", imageFile);
    dispatch(updateProfilePicture(token, formData)).then(() => {
      setLoading(false);
    });
  };
  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-rich-black-400 bg-rich-black-500 p-8 px-12">
      <div className="flex items-center gap-x-4">
        <img
          src={previewImage || user?.profileDetails?.imageUrl}
          alt={`Profile-${user.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="text-sm text-rich-black-5 font-medium">
            Change Profile Picture
          </p>
          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/gif, image/jpeg"
              className="hidden"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md py-2 px-5 bg-rich-black-300 text-rich-black-50 font-semibold"
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
            >
              {loading && <FiUpload className="text-lg text-rich-black-25" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
