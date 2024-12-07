import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "@/services/operations/authAPI";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import useClickOutside from "@/hooks/useClickOutside";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef(null);

  useClickOutside(ref, () => setIsOpen(false));

  if (!user) return null;

  return (
    <div className="relative" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center gap-x-2">
        <img
          src={user?.profileDetails.imageUrl}
          alt={user?.firstName}
          className="w-7 h-7 rounded-full aspect-square object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-rich-black-100" />
      </div>
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-50 bg-rich-black-300 divide-y-[1px] divide-rich-black-700 overflow-hidden rounded-md border-[1px] border-rich-black-700"
          ref={ref}
        >
          <NavLink
            to={"/dashboard/my-profile"}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-rich-black-100 hover:bg-rich-black-500 hover:text-rich-black-25 cursor-pointer">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </NavLink>
          <div
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-rich-black-100 hover:bg-rich-black-500 hover:text-rich-black-25 cursor-pointer"
            onClick={() => {
              dispatch(logout(token));
              setIsOpen(false);
            }}
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
