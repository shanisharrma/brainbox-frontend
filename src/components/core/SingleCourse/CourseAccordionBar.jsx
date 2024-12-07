/* eslint-disable react/prop-types */

import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";
import { useEffect, useRef, useState } from "react";

const CourseAccordionBar = ({ section, isActive, handleActive }) => {
  const contentElement = useRef(null);
  const [active, setActive] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    setActive(isActive.includes(section.id));
  }, [isActive, section]);

  useEffect(() => {
    setSectionHeight(active ? contentElement.current.scrollHeight : 0);
  }, [active]);

  return (
    <div className="overflow-hidden border border-solid border-rich-black-300 bg-rich-black-600 text-rich-black-5 last:mb-0">
      <div>
        <div
          className="flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s]"
          onClick={() => handleActive(section.id)}
        >
          <div className="flex items-center gap-2">
            <i
              className={
                isActive.includes(section.id) ? "rotate-180" : "rotate-0"
              }
            >
              <AiOutlineDown />
            </i>
            <p>{section.name}</p>
          </div>
          <div className="space-x-4">
            <span className="text-crimsonRed-25">
              {`${section.subSections.length || 0} lecture(s)`}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={contentElement}
        className="relative h-0 overflow-hidden bg-rich-black-800 transition-[height] duration-[0.35s] ease-[ease]"
        style={{ height: sectionHeight }}
      >
        <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
          {section.subSections.map((subSection, index) => (
            <CourseSubSectionAccordion subSection={subSection} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseAccordionBar;
