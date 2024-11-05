import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to Coding",
  "Most Popular",
  "Skills Paths",
  "Career Paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
    console.log(result);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-semibold">
          Unlock the <HighlightText text={"Power of Code"} />
        </h2>
        <p className="text-base text-rich-black-100 font-medium text-center mt-3">
          Learn to Build Anything You Can Imagine
        </p>

        <div className="bg-rich-black-400 flex flex-row items-center gap-2 my-6 p-1 rounded-full">
          {tabsName.map((tab, index) => (
            <div
              key={index}
              className={`text-lg text-rich-black-100 font-medium rounded-full p-[6px] px-6 transition-all duration-200 ease-in cursor-pointer hover:bg-rich-black-900 hover:text-rich-black-5 ${
                currentTab == tab && "bg-rich-black-900 text-rich-black-5"
              }`}
              onClick={() => setMyCards(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="lg:h-[150px]">
          {/* Course card group */}
          <div className="flex flex-row gap-20 justify-between my-8">
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                cardData={course}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
