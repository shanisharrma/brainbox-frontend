import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const defaultFormData = { password: "", confirmPassword: "" };
  const [formData, setFromData] = useState(defaultFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = (e) => {
    const { name, value } = e.target;

    setFromData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmitResetPassword = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(formData, token)).then(() => {
      setFromData({ password: "", confirmPassword: "" });
    });
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-[500px] w-full p-4 lg:p-8">
          <h3 className="text-rich-black-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Choose a new password
          </h3>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-rich-black-100">
            Almost Done. Enter your new password and you are all set.
          </p>

          <form onSubmit={handleOnSubmitResetPassword}>
            <div className="relative mb-3">
              <label
                htmlFor="password"
                className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
              >
                New Password <sup className="text-crimsonRed-50">*</sup>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChangePassword}
                placeholder="Enter new password..."
                required
                className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100 focus:border-0 focus:outline-2 focus:outline-crimsonRed-50"
              />
              <span
                className="absolute right-3 top-[36px] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#A8A8A8" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#A8A8A8" />
                )}
              </span>
            </div>

            <div className="relative mb-3">
              <label
                htmlFor="confirmPassword"
                className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
              >
                Confirm New Password <sup className="text-crimsonRed-50">*</sup>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChangePassword}
                placeholder="Confirm new password..."
                required
                className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100 focus:border-0 focus:outline-2 focus:outline-crimsonRed-50"
              />
              <span
                className="absolute right-3 top-[36px] cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#A8A8A8" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#A8A8A8" />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-crimsonRed-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-rich-black-5"
            >
              Set New Password
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-rich-black-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
