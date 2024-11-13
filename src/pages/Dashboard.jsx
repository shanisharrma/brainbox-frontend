import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../services/operations/profileAPI";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/core/Dashboard";
import { navigate } from "../hooks/setNavigate";
import { requestAccountVerification } from "../services/operations/authAPI";

const Dashboard = () => {
  const { loading: profileLoading, user } = useSelector(
    (state) => state.profile
  );
  const { token, loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails(token));
    }
  }, [dispatch, token]);

  const handleVerifyRequest = () => {
    dispatch(requestAccountVerification(user.email, token));
    navigate("/account-confirmation");
  };

  if (authLoading || profileLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          {user && !user.accountConfirmation.status && (
            <div className="w-full flex justify-between items-center my-6 p-2 bg-brown-50 rounded-md border border-brown-400">
              <div className="text-base font-medium text-brown-800">
                {user.warning}
              </div>
              <button
                onClick={handleVerifyRequest}
                className="py-1 px-6 rounded-md border border-brown-800 bg-brown-600 text-rich-black-5 font-medium transition-colors duration-200 hover:text-brown-800 hover:border-brown-800 hover:bg-transparent"
              >
                Verify
              </button>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
