/* eslint-disable react/prop-types */
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctaBtn1,
  ctaBtn2,
  codeBlock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div
      className={`flex ${position} my-16 justify-between gap-10 flex-col lg:gap-10`}
    >
      {/* Section 1 */}
      <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-rich-black-100 font-medium">{subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctaBtn1.active} linkTo={ctaBtn1.linkTo}>
            <div className="flex gap-2 items-center">
              {ctaBtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctaBtn2.active} linkTo={ctaBtn2.linkTo}>
            {ctaBtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="code-border h-fit flex justify-start relative text-[10px] sm:text-sm leading-[18px] sm:leading-6  py-4 w-[100%] lg:w-[500px]">
        <div className={`${backgroundGradient} absolute`}></div>
        <div className="text-center flex flex-col w-[10%] text-rich-black-25 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>
        <div
          className={`w-[88%] flex flex-col gap-2 font-bold font-mono ${codeColor}`}
        >
          <TypeAnimation
            sequence={[codeBlock, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{ whiteSpace: "pre-line", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
