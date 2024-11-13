import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import OtpInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import {
  accountVerification,
  requestAccountVerification,
} from "../services/operations/authAPI";

const AccountConfirmation = () => {
  const [otp, setOtp] = useState("");
  const { token } = useParams();
  const { loading, token: authToken } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleEmailVerify = (e) => {
    e.preventDefault();
    dispatch(accountVerification(token, otp));
    setOtp("");
  };

  const handleResendEmail = () => {
    dispatch(requestAccountVerification(user.email, authToken));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-rich-black-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            {token ? "Verify Email" : "Email Sent"}
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-rich-black-100">
            {token
              ? "A verification code has been sent to you. Enter the code below"
              : "We've sent you an email with verification code and link to verify your account at BrainBox."}
          </p>
          {token ? (
            <form onSubmit={handleEmailVerify}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-rich-black-300 rounded-[0.5rem] text-rich-black-100 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-crimsonRed-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />

              <button
                type="submit"
                className="w-full bg-crimsonRed-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-rich-black-5"
              >
                Verify Email
              </button>
            </form>
          ) : (
            <button
              onClick={handleResendEmail}
              className="w-full bg-crimsonRed-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-rich-black-5"
            >
              Resend Email
            </button>
          )}

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

export default AccountConfirmation;
