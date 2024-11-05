import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import RoleSelector from "./RoleSelector";
import { useState } from "react";

const SignupForm = () => {
  const defaultSignupForm = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "student",
  };
  const [signupForm, setSignupForm] = useState(defaultSignupForm);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const signupFormChange = (e) => {
    const { name, value } = e.target;

    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role) => {
    setSignupForm((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error("Password do not match.");
      return;
    }
    setSignupForm(defaultSignupForm);
    // setIsLoggedIn(true);
    toast.success("Account created.");
    navigate("/dashboard");
  };

  return (
    <div>
      {/* Role Selector */}
      <RoleSelector onSelectRole={handleRoleSelect} />

      <form onSubmit={handleSubmit} className="flex flex-col w-full mt-6">
        {/* Full name */}
        <div className="flex justify-between w-full gap-x-4">
          <div className="mb-3">
            <label
              htmlFor="firstName"
              className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
            >
              First Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={signupForm.firstName}
              onChange={signupFormChange}
              placeholder="Enter first name..."
              required
              className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="lastName"
              className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
            >
              Last Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={signupForm.lastName}
              onChange={signupFormChange}
              placeholder="Enter last name..."
              required
              className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
            />
          </div>
        </div>
        {/* email */}
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
          >
            Email Address <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={signupForm.email}
            onChange={signupFormChange}
            placeholder="Enter email address..."
            required
            className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
          />
        </div>
        {/* phone number */}
        <div className="mb-3">
          <label
            htmlFor="phoneNumber"
            className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
          >
            Phone Number <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={signupForm.phoneNumber}
            onChange={signupFormChange}
            placeholder="Enter phone number..."
            required
            className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
          />
        </div>
        {/* createPassword and confirmPassword */}
        <div className="flex justify-between w-full gap-x-4">
          <div className="relative mb-3">
            <label
              htmlFor="password"
              className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
            >
              Create Password<sup className="text-pink-200">*</sup>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={signupForm.password}
              onChange={signupFormChange}
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
          <div className="relative mb-3">
            <label
              htmlFor="confirmPassword"
              className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
            >
              Confirm Password<sup className="text-pink-200">*</sup>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={signupForm.confirmPassword}
              onChange={signupFormChange}
              placeholder="Enter password..."
              required
              className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
            />
            <span
              className="absolute right-3 top-[42px] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
        </div>

        <button className="w-full flex justify-center items-center bg-crimsonRed-50 rounded-lg font-medium text-white px-3 py-2 gap-x-2 mt-8 hover:bg-crimsonRed-100">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
