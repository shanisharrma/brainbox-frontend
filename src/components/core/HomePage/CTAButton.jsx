import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CTAButton = ({ children, active, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div
        className={`text-center text-[13px] px-5 py-[10px] rounded-md font-bold text-lg transition-all duration-300 ease-in hover:scale-95 hover:shadow-none text-rich-black-5 ${
          active
            ? "bg-crimsonRed-50 shadow-[2px_2px_0px_0px_rgba(230,57,70,0.38)]"
            : "bg-rich-black-500 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
