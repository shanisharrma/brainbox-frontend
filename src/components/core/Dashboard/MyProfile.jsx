import { Link } from "react-router-dom";

const MyProfile = () => {
  return (
    <div>
      MyProfile <Link to={"/dashboard/student"}> Student</Link>
    </div>
  );
};

export default MyProfile;
