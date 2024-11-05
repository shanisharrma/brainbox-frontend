/* eslint-disable react/prop-types */
import { ImTree } from "react-icons/im";
import { HiUsers } from "react-icons/hi";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      className={`flex flex-col justify-between transition-all duration-100 ease-in  ${
        currentCard === cardData.heading
          ? "bg-white shadow-[10px_10px_rgba(230,57,70)]"
          : "bg-rich-black-300"
      }`}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      <div
        className={`border-b-[3px] p-6 pb-14 ${
          currentCard === cardData.heading
            ? "border-b-blue-300"
            : "border-b-rich-black-100"
        }`}
      >
        <h3
          className={`font-bold text-xl my-4 ${
            currentCard === cardData.heading
              ? "text-rich-black-600"
              : "text-rich-black-50"
          }`}
        >
          {cardData.heading}
        </h3>
        <p
          className={`font-medium text-base ${
            currentCard === cardData.heading
              ? "text-rich-black-300"
              : "text-rich-black-100"
          }`}
        >
          {cardData.description}
        </p>
      </div>
      <div className="flex flex-row justify-between p-6 pt-3">
        <div
          className={`flex flex-row gap-3 font-medium text-base ${
            currentCard === cardData.heading
              ? "text-blue-300"
              : "text-rich-black-100"
          }`}
        >
          <HiUsers /> {cardData.level}
        </div>
        <div
          className={`flex flex-row gap-3 font-medium text-base ${
            currentCard === cardData.heading
              ? "text-blue-300"
              : "text-rich-black-100"
          }`}
        >
          <ImTree />
          {cardData.lessonNumber} Lesson
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
