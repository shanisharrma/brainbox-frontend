import ChangePassword from "./ChangePassword";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";

const Settings = () => {
  return (
    <div>
      <h2 className="text-4xl mb-4 text-rich-black-5 font-medium">
        Edit Profile
      </h2>
      {/* Update Profile Picture */}
      <ChangeProfilePicture />
      {/* Update Profile Information */}
      <EditProfile />
      {/* Change Password */}
      <ChangePassword />
    </div>
  );
};

export default Settings;
