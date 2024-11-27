import { navigate } from "../../../../hooks/setNavigate";
import { IconBtn } from "../../../common";
import CountryCode from "../../../../data/countrycode.json";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../../../services/operations/settingsAPI";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = (data) => {
    const combinedPhoneNumber = `${data.countryCode}${data.phoneNumber}`;
    const payload = { ...data, phoneNumber: combinedPhoneNumber };
    delete payload.countryCode;
    dispatch(updateProfile(token, payload));
  };

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="my-10 flex flex-col rounded-md border-[1px] border-rich-black-400 bg-rich-black-500 p-8 px-12 gap-y-5">
        <h3 className="text-rich-black-5 text-lg font-semibold">
          Profile Information
        </h3>
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col lg:flex-row lg:gap-6 justify-between w-full">
            <div className="mb-3 w-full">
              <label
                htmlFor="firstName"
                className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name..."
                className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
                defaultValue={user?.firstName}
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
            <div className="mb-3 w-full">
              <label
                htmlFor="lastName"
                className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name..."
                className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
                defaultValue={user?.lastName}
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Please enter your first name",
                  },
                })}
              />
              {errors && errors.lastName && (
                <span className="text-xs text-crimsonRed-50">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-6 justify-between w-full">
            <div className="mb-3 w-full">
              <label
                htmlFor="dateOfBirth"
                className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
              >
                Date Of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
                defaultValue={user?.profileDetails.dateOfBirth}
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your date of birth",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
              />
              {errors && errors.dateOfBirth && (
                <span className="text-xs text-crimsonRed-50">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="gender"
                className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
              >
                Gender
              </label>

              <select
                className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 px-2 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
                name="gender"
                id="gender"
                defaultValue={user?.profileDetails.gender}
                {...register("gender", {
                  required: {
                    value: true,
                    message: "Please select your gender",
                  },
                })}
              >
                {genders.map((ele, index) => (
                  <option key={index} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              {errors && errors.gender && (
                <span className="text-xs text-crimsonRed-50">
                  {errors.gender.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-6 justify-between w-full">
            <div className="mb-3 w-full">
              <label
                htmlFor="phoneNumber"
                className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
              >
                Contact Number
              </label>
              <div className="flex flex-row gap-3 justify-between">
                <select
                  className="bg-rich-black-300 rounded-lg text-rich-black-100 w-[18%] p-3 px-2 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
                  name="countryCode"
                  id="countryCode"
                  defaultValue={`+${user?.phoneNumber.countryCode}`}
                  {...register("countryCode", { required: true })}
                >
                  {CountryCode.map((element, index) => (
                    <option key={index} value={element.code}>
                      {element.code} - {element.country}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Enter first name..."
                  className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
                  defaultValue={user?.phoneNumber.internationalNumber.replace(
                    `+${user?.phoneNumber.countryCode} `,
                    ""
                  )}
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Please enter your contact number",
                    },
                  })}
                />
                {errors && errors.phoneNumber && (
                  <span className="text-xs text-crimsonRed-50">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="about"
                className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
              >
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter about yourself..."
                className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
                defaultValue={user?.profileDetails.about}
                {...register("about", {
                  required: {
                    value: true,
                    message: "Please enter your bio",
                  },
                })}
              />
              {errors && errors.about && (
                <span className="text-xs text-crimsonRed-50">
                  {errors.about.message}
                </span>
              )}
            </div>
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
          <IconBtn type="submit" text="Save" />
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
