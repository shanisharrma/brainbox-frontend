import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "@/services/operations/authAPI";

const LoginForm = () => {
  const defaultLoginForm = { email: "", password: "" };
  const [loginForm, setLoginForm] = useState(defaultLoginForm);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const loginFormChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginForm));
    setLoginForm(defaultLoginForm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full mt-6">
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          Email Address <sup className="text-crimsonRed-200">*</sup>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={loginForm.email}
          onChange={loginFormChange}
          placeholder="Enter email address..."
          required
          className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
        />
      </div>
      <div className="relative mb-4">
        <label
          htmlFor="password"
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          Password <sup className="text-crimsonRed-200">*</sup>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={loginForm.password}
          onChange={loginFormChange}
          placeholder="Enter password..."
          required
          className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
        />
        <span
          className="absolute right-3 top-[42px] cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#A8A8A8" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#A8A8A8" />
          )}
        </span>
      </div>
      <Link
        to="/forgot-password"
        className="text-blue-100 text-xs text-end -mt-3"
      >
        Forgot Password?
      </Link>

      <button className="w-full flex justify-center items-center bg-crimsonRed-50 rounded-lg font-medium text-white px-3 py-2 gap-x-2 mt-8 hover:bg-crimsonRed-100">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
