import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import CTAButton from "./CTAButton";
import HighlightText from "./HighlightText";

const InstructorSection = () => {
  return (
    <div className="flex flex-row justify-between gap-20 items-center">
      <div className="w-[50%]">
        <img src={Instructor} alt="Instructor" className="object-contain" />
      </div>

      <div className="w-[50%] flex flex-col gap-10">
        <h3 className="text-4xl font-semibold w-[50%]">
          Become an <HighlightText text={"Instructor"} />
        </h3>
        <p className="text-rich-black-100 font-medium w-[80%] text-base">
          Instructors from around the world teach millions of students on
          BrainBox. We provide the tools and skills to teach what you love.
        </p>
        <div className="flex">
          <CTAButton linkTo={"/signup"} active={true}>
            <div className="flex items-center gap-3">
              Start Teaching Today <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
