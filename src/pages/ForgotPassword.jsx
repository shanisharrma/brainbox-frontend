import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/operations/authAPI";
import { BiArrowBack } from "react-icons/bi";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, setEmailSent));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-[500px] w-full p-4 lg:p-8">
          <h3 className="text-rich-black-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            {!emailSent ? "Reset your password" : "Check You Email"}
          </h3>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-rich-black-100">
            {!emailSent
              ? "Have no fear. We will email you instructions to reset your password. If you don't have access to your email we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleForgotPassword}>
            {!emailSent && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
                >
                  Email Address <sup className="text-crimsonRed-50">*</sup>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter you email address..."
                  required
                  className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100 focus:border-0 focus:outline-2 focus:outline-crimsonRed-50"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-crimsonRed-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-rich-black-5"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
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

export default ForgotPassword;
