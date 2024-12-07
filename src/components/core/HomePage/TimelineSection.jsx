import logo1 from "@/assets/TimeLineLogo/logo1.svg";
import logo2 from "@/assets/TimeLineLogo/logo2.svg";
import logo3 from "@/assets/TimeLineLogo/logo3.svg";
import logo4 from "@/assets/TimeLineLogo/logo4.svg";
import TimelineImage from "@/assets/Images/TimelineImage.png";

const timelineData = [
  {
    logo: logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    logo: logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-row gap-14 items-center">
        <div className="flex flex-col w-[45%] gap-5">
          {timelineData.map((element, index) => (
            <div key={index} className="flex flex-row gap-5 relative">
              <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full">
                <img src={element.logo} alt={element.heading} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">{element.heading}</h3>
                <p className="text-base">{element.description}</p>
              </div>
              {index !== timelineData.length - 1 && (
                <div className="h-[50px] w-[1px] bg-rich-black-50 absolute left-2 top-[65px]"></div>
              )}
            </div>
          ))}
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
