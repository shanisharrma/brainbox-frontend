import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { contactUsEndpoints } from "../../services/apis";
import toast from "react-hot-toast";
import CountryCode from "../../data/countrycode.json";

const contactCategory = ["Complaint", "Feedback", "Feature Request"];

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        contactUsEndpoints.CONTACT_US_API,
        data
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        phoneNo: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      {/* fullName */}
      <div className="flex gap-x-4 justify-between w-full">
        {/* firstName */}
        <div className="mb-4 w-[50%]">
          <label
            htmlFor="firstName"
            className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
          >
            First Name <sup className="text-crimsonRed-50">*</sup>
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name..."
            className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
            {...register("firstName", {
              required: {
                value: true,
                message: "Please enter your first name",
              },
            })}
          />
          {errors && errors.firstName && (
            <span className="text-xs text-crimsonRed-50">
              {errors.firstName.message}
            </span>
          )}
        </div>
        {/* LastName */}
        <div className="mb-4 w-[50%]">
          <label
            htmlFor="lastName"
            className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
          >
            Last Name <sup className="text-crimsonRed-50">*</sup>
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter first name..."
            className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
            {...register("lastName")}
          />
        </div>
      </div>
      {/* email */}
      <div className="mb-4">
        <div className="mb-3">
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
            placeholder="Enter email address..."
            className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
            {...register("email", {
              required: {
                value: true,
                message: "Please enter your email address",
              },
            })}
          />
          {errors && errors.email && (
            <span className="text-xs text-crimsonRed-50">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>
      {/* Phone Number */}
      <div className="mb-4">
        <div className="mb-4">
          <label
            htmlFor="phoneNo"
            className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
          >
            Phone Number <sup className="text-crimsonRed-50">*</sup>
          </label>
          <div className="flex flex-row gap-3 justify-between">
            {/* dropdown */}
            <select
              className="bg-rich-black-300 rounded-lg text-rich-black-100 w-[15%] p-3 px-2 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
              name="countryCode"
              id="countryCode"
              {...register("countryCode", { required: true })}
            >
              {CountryCode.map((element, index) => (
                <option key={index} value={element.code}>
                  {element.code} - {element.country}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="phoneNo"
              id="phoneNo"
              placeholder="Enter phone number..."
              className="bg-rich-black-300 rounded-lg text-rich-black-100 w-[85%] p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
              {...register("phoneNo", {
                required: { value: true, message: "Please Enter Phone Number" },
                maxLength: { value: 10, message: "Invalid Phone Number" },
                minLength: { value: 8, message: "Invalid Phone Number" },
              })}
            />
          </div>
          {errors && errors.phoneNo && (
            <span className="text-xs text-crimsonRed-50">
              {errors.phoneNo.message}
            </span>
          )}
        </div>
      </div>
      {/* Category */}
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          Category <sup className="text-crimsonRed-50">*</sup>
        </label>
        <select
          name="category"
          id="category"
          className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 px-2 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
          {...register("category", {
            required: { value: true, message: "Please select the category." },
          })}
        >
          {contactCategory.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {/* message textarea */}
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          Your Message <sup className="text-crimsonRed-50">*</sup>
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="4"
          placeholder="Enter your message..."
          className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
          {...register("message", {
            required: { value: true, message: "Please enter your message" },
          })}
        ></textarea>
        {errors && errors.message && (
          <span className="text-xs text-crimsonRed-50">
            {errors.message.message}
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`w-full flex justify-center items-center bg-crimsonRed-50 rounded-lg font-semibold text-white px-3 py-2 gap-x-2 mb-4 text-lg hover:bg-crimsonRed-100 shadow-[2px_2px_0px_0px_rgba(230,57,70,0.38)] ${
          !loading &&
          "transition-all duration-200 hover:scale-95 hover:shadow-none"
        }`}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactUsForm;
