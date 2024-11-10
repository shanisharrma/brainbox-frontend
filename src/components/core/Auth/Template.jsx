/* eslint-disable react/prop-types */
import frameImage from "../../../assets/Images/frame.png";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useSelector } from "react-redux";

const Template = ({ title, desc1, desc2, image, formType, setIsLoggedIn }) => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-11/12 max-w-maxContent mx-auto flex justify-between py-12 gap-x-12 gap-y-0 mt-10">
          <div className="w-11/12 max-w-[450px] mx-auto md:mx-0">
            <h1 className="text-rich-black-5 text-3xl font-semibold leading-[2.375rem]">
              {title}
            </h1>
            <div className="text-lg leading-[1.625rem] mt-4">
              <div className="text-rich-black-100">{desc1}</div>
              <div className="text-blue-100 italic">{desc2}</div>
            </div>
            {formType === "signup" ? (
              <SignupForm setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )}

            <div className="flex w-full items-center my-4 gap-x-2">
              <span className="bg-rich-black-300 w-full h-[1px]"></span>
              <p className="text-rich-black-300 text-sm font-medium leading-[1.375rem]">
                OR
              </p>
              <span className="bg-rich-black-300 w-full h-[1px]"></span>
            </div>

            <button className="w-full flex justify-center items-center bg-white border border-crimsonRed-50 rounded-lg font-medium text-rich-black-900 px-3 py-2 gap-x-2 my-6">
              <FcGoogle fontSize={24} />
              <p className="text-lg">Sign in with Google</p>
            </button>
          </div>

          <div className="relative w-11/12 max-w-[500px]">
            <img
              src={frameImage}
              alt="frame pattern bg"
              height={504}
              width={558}
              loading="lazy"
            />
            <img
              src={image}
              alt="students"
              height={490}
              width={558}
              loading="lazy"
              className="absolute -top-4 right-4"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
