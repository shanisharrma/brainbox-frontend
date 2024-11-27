import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="relative flex w-full justify-between">
        {steps.map((item, index) => (
          <div
            key={index}
            className="flex flex-col mb-16 space-y-3 items-center"
          >
            <div className="flex items-center px-12">
              <div
                className={`h-8 w-8 rounded-full aspect-square flex items-center justify-center border-2 ${
                  step === item.id
                    ? "bg-crimsonRed-800 border-crimsonRed-50 text-crimsonRed-50"
                    : step > item.id
                    ? "text-rich-black-5 bg-crimsonRed-50 border-crimsonRed-50"
                    : "border-rich-black-200 text-rich-black-100 bg-rich-black-500"
                } `}
              >
                {step > item.id ? (
                  <FaCheck className="text-rich-black-5" />
                ) : (
                  item.id
                )}
              </div>
              {item.id !== steps.length && (
                <div
                  className={`absolute h-1 w-[25%] lg:w-[32%] border-dashed border-b-2 ml-[36px] ${
                    step > item.id
                      ? "border-crimsonRed-50"
                      : "border-rich-black-50"
                  } `}
                ></div>
              )}
            </div>
            <p
              className={`${
                item.id <= step ? "text-rich-black-5" : "text-rich-black-100"
              } text-sm`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderSteps;
