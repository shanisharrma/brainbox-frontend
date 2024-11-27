/* eslint-disable react/prop-types */

const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold  ${
        outline
          ? "border border-crimsonRed-50 bg-transparent text-crimsonRed-50"
          : "bg-crimsonRed-50 text-rich-black-5"
      }  ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-yellow-50"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
