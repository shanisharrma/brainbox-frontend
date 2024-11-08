import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../services/operations/profileAPI";

const MyProfile = () => {
  const { token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails(token));
    console.log(token);
  }, [dispatch, token]);

  return (
    <div className="flex items-center justify-center text-rich-black-5">
      {loading ? <div>Loading...</div> : <div>My Profile</div>}
    </div>
  );
};

export default MyProfile;
