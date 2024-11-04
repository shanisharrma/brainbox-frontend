import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CTAButton = ({ children, active, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div
        className={`text-center text-[13px] px-6 py-2 rounded-md font-bold text-lg transition-all duration-300 ease-in hover:scale-95 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
          active
            ? "bg-crimsonRed-50 text-rich-black-5"
            : "bg-rich-black-500 text-rich-black-100"
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
