/* eslint-disable react/prop-types */
import * as Icons from "react-icons/vsc";
import { NavLink, useLocation, matchPath } from "react-router-dom";

const SidebarLinks = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (path) => {
    return matchPath({ path: path }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-crimsonRed-700 text-crimsonRed-50"
          : "bg-opacity-0 text-rich-black-100"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-crimsonRed-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLinks;
