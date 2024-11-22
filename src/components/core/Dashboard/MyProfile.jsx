import { useSelector } from "react-redux";
import { IconBtn } from "../../common";
import { RiEditBoxLine } from "react-icons/ri";
import { navigate } from "../../../hooks/setNavigate";
import { formattedDate } from "../../../utils/dateFormatter";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div>
      <h2 className="text-3xl mb-4 font-medium text-rich-black-5">
        My Profile
      </h2>
      <div className="flex items-center justify-between rounded-md border-[1px] border-rich-black-400 bg-rich-black-500 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.profileDetails.imageUrl}
            alt={user?.firstName}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-rich-black-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-rich-black-100">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine className="text-rich-black-5 font-semibold" />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-rich-black-400 bg-rich-black-500 p-8 px-12">
        <div className="flex w-full justify-between items-center">
          <p className="text-lg font-semibold text-rich-black-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine className="text-rich-black-5 font-semibold" />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.profileDetails?.about
              ? "text-rich-black-5"
              : "text-rich-black-100"
          } text-sm font-medium`}
        >
          {user?.profileDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-rich-black-400 bg-rich-black-500 p-8 px-12">
        <div className="flex w-full justify-between items-center">
          <p className="text-lg font-semibold text-rich-black-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine className="text-rich-black-5 font-semibold" />
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-rich-black-100">First Name</p>
              <p className="text-sm font-medium text-rich-black-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-rich-black-100">Email</p>
              <p className="text-sm font-medium text-rich-black-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-rich-black-100">Gender</p>
              <p className="text-sm font-medium text-rich-black-5">
                {user?.profileDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-rich-black-100">last Name</p>
              <p className="text-sm font-medium text-rich-black-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-rich-black-100">Phone Number</p>
              <p className="text-sm font-medium text-rich-black-5">
                {user?.phoneNumber?.internationalNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-rich-black-100">Date of Birth</p>
              <p className="text-sm font-medium text-rich-black-5">
                {formattedDate(user?.profileDetails?.dateOfBirth ?? null) ??
                  "Add Date of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
