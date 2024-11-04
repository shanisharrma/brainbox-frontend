/* eslint-disable react/prop-types */

const HighlightText = ({ text }) => {
  return (
    <span className="font-bold bg-gradient-to-b from-blue-100 via-blue-50 to-blue-25 text-transparent bg-clip-text">
      {text}
    </span>
  );
};

export default HighlightText;
