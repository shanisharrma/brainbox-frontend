import { useForm } from "react-hook-form";
import { navigate } from "../../../../hooks/setNavigate";
import { IconBtn } from "../../../common";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../services/operations/settingsAPI";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const handleChangePassword = (data) => {
    dispatch(changePassword(token, data));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(handleChangePassword)}>
      <div className=" flex flex-col rounded-md border-[1px] border-rich-black-400 bg-rich-black-500 p-8 px-12 gap-y-5">
        <h3 className="text-rich-black-5 text-lg font-semibold">Password</h3>
        <div className="w-full lg:w-[50%] flex flex-col items-center justify-center pr-6">
          <div className="relative mb-3 w-full">
            <label
              htmlFor="oldPassword"
              className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
            >
              Current Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter Current Password..."
              className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
              {...register("oldPassword", {
                required: {
                  value: true,
                  message: "Please enter your current password",
                },
              })}
            />
            <span
              className="absolute right-3 top-[42px] cursor-pointer"
              onClick={() => setShowOldPassword((prev) => !prev)}
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#A8A8A8" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#A8A8A8" />
              )}
            </span>
            {errors && errors.oldPassword && (
              <span className="text-xs text-crimsonRed-50">
                {errors.oldPassword.message}
              </span>
            )}
          </div>
          <div className="relative mb-3 w-full">
            <label
              htmlFor="newPassword"
              className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
            >
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Password..."
              className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "Please enter your new password",
                },
              })}
            />
            <span
              className="absolute right-3 top-[42px] cursor-pointer"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#A8A8A8" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#A8A8A8" />
              )}
            </span>
            {errors && errors.newPassword && (
              <span className="text-xs text-crimsonRed-50">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="relative mb-3 w-full">
            <label
              htmlFor="confirmNewPassword"
              className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
            >
              Confirm New Password
            </label>
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              name="confirmNewPassword"
              id="confirmNewPassword"
              placeholder="Confirm New Password..."
              className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
              {...register("confirmNewPassword", {
                required: {
                  value: true,
                  message: "Please enter your confirm new password",
                },
              })}
            />
            <span
              className="absolute right-3 top-[42px] cursor-pointer"
              onClick={() => setShowConfirmNewPassword((prev) => !prev)}
            >
              {showConfirmNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#A8A8A8" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#A8A8A8" />
              )}
            </span>
            {errors && errors.confirmNewPassword && (
              <span className="text-xs text-crimsonRed-50">
                {errors.confirmNewPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-rich-black-300 py-2 px-5 font-semibold text-rich-black-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
