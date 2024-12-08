import * as Icon1 from "react-icons/sl";
import * as Icon2 from "react-icons/fa";
import * as Icon3 from "react-icons/io5";
import * as Icon4 from "react-icons/hi2";
import TimelineImage from "@/assets/Images/TimelineImage.png";

const timelineData = [
  {
    logo: "SlBadge",
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    logo: "FaGraduationCap",
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: "IoDiamond",
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: "HiCodeBracketSquare",
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-row gap-14 items-center">
        <div className="flex flex-col w-[45%] gap-5">
          {timelineData.map((element, index) => {
            let Icon =
              Icon1[element.logo] ||
              Icon2[element.logo] ||
              Icon3[element.logo] ||
              Icon4[element.logo];
            return (
              <div key={index} className="flex flex-row gap-5 relative">
                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full">
                  <Icon size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{element.heading}</h3>
                  <p className="text-base">{element.description}</p>
                </div>
                {index !== timelineData.length - 1 && (
                  <div className="h-[50px] w-[1px] bg-rich-black-50 absolute left-2 top-[65px]"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="relative shadow-blue-200">
          <img
            src={TimelineImage}
            alt="timeline-image"
            className="shadow-white object-cover h-fit"
          />

          <div className="absolute left-[50%] translate-x-[-50%] translate-y-[-50%] bg-caribbeangreen-700 text-white uppercase flex flex-row p-8 w-[90%]">
            <div className="w-[50%] flex flex-row gap-5 items-center justify-between border-r border-caribbeangreen-300 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-sm">
                Years of Experience
              </p>
            </div>
            <div className="w-[50%] flex flex-row justify-between gap-5 items-center px-7">
              <p className="text-3xl font-bold">25</p>
              <p className="text-caribbeangreen-300 text-sm">Type of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
