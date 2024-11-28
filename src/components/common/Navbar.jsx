import { Link, matchPath, NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/brainbox-light.svg";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ProfileDropdown } from "../core/Auth";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { getAllCategories } from "../../services/operations/categoryAPI";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubLinks = async () => {
    setLoading(true);
    try {
      const result = await getAllCategories();
      setSubLinks(result);
    } catch (error) {
      console.error("Could not fetch the category list", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="flex h-14 items-center justify-center border-b border-b-rich-black-300">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img src={Logo} alt="BrainBos" className="w-[165px] h-[36px]" />
        </Link>

        {/* Nav links */}
        <nav>
          <ul className="flex gap-x-6 text-rich-black-50 text-base z-10">
            {NavbarLinks &&
              NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="relative flex items-center gap-2 cursor-pointer group">
                      <p>{link.title}</p> <IoIosArrowDown />
                      <div className="invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[10%] flex flex-col rounded-lg bg-rich-black-5 p-4 text-rich-black-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[300px] z-30">
                        <div className="absolute left-[50%] top-0 translate-y-[-50%] translate-x-[80%] h-6 w-6 rotate-45 rounded bg-rich-black-5 z-20"></div>
                        {loading ? (
                          <p className="p-4 hover:bg-rich-black-25 rounded-md">
                            Loading...
                          </p>
                        ) : subLinks && subLinks.length ? (
                          subLinks.map((subLink, index) => (
                            <NavLink
                              to={`/catalog/${subLink.name
                                .replace(" ", "-")
                                .toLowerCase()}`}
                              key={index}
                            >
                              <p className="p-4 hover:bg-rich-black-25 rounded-md">
                                {subLink.name}
                              </p>
                            </NavLink>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <NavLink to={link.path}>
                      <p
                        className={` ${
                          matchRoute(link.path) && "text-crimsonRed-50"
                        }`}
                      >
                        {link.title}
                      </p>
                    </NavLink>
                  )}
                </li>
              ))}
          </ul>
        </nav>

        {/* Action button (Login, Signup, dashboard) */}
        <div className="flex gap-x-4 items-center">
          {user && user?.roles.some((role) => role.role === "student") && (
            <NavLink to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-rich-black-50" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-rich-black-300 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </NavLink>
          )}

          {(!user || token === null) && (
            <div className="flex gap-x-4">
              <NavLink to="/login">
                <button className="border border-rich-black-300 bg-rich-black-700 px-3 py-2 text-rich-black-50 rounded-md">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="border border-rich-black-300 bg-rich-black-700 px-3 py-2 text-rich-black-50 rounded-md">
                  Signup
                </button>
              </NavLink>
            </div>
          )}

          {user && token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
