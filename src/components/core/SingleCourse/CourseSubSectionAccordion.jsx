/* eslint-disable react/prop-types */

import { HiOutlineVideoCamera } from "react-icons/hi";

const CourseSubSectionAccordion = ({ subSection }) => {
  return (
    <div>
      <div className="flex justify-between py-2">
        <div className="flex items-center gap-2">
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p>{subSection.title}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseSubSectionAccordion;
