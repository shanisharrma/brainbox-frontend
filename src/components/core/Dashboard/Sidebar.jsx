import { VscSignOut } from "react-icons/vsc";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SidebarLinks from "./SidebarLinks";
import { ConfirmationModal } from "../../common";
import { useState } from "react";
import { logout } from "../../../services/operations/authAPI";

const Sidebar = () => {
  const {
    roles,
    token,
    loading: authLoading,
  } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [confirmationModal, setConfirmationModal] = useState(null);

  if (authLoading || profileLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-rich-black-200 bg-rich-black-500">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[calc(100vh - 3.5rem)] min-w-[220px] flex-col border-r-[1px] border-rich-black-200 bg-rich-black-500 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && !roles.includes(link.type)) return null;
            return (
              <SidebarLinks key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] bg-rich-black-200 w-10/12"></div>
        <div className="flex flex-col">
          <SidebarLinks
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName={"VscSettingsGear"}
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => {
                  dispatch(logout(token));
                  setConfirmationModal(null);
                },
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-rich-black-100"
          >
            <div className="flex gap-x-2 items-center">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
