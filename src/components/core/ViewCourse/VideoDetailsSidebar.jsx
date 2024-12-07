/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IconBtn } from "../../common";
import { navigate } from "../../../hooks/setNavigate";
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import { findArrayIndex } from "../../../utils/utilityFunctions";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const { sectionId, subsectionId } = useParams();
  const {
    courseSectionData,
    entireCourseData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData || !courseSectionData.length) {
        return;
      }

      const currentSectionIndex = courseSectionData.findIndex(
        (item) => item.id === Number(sectionId)
      );

      console.log("courseSEction", courseSectionData);

      const currentSubSectionIndex = courseSectionData[
        currentSectionIndex
      ]?.subSections?.findIndex((item) => item.id === Number(subsectionId));

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSections[
          currentSubSectionIndex
        ]?.id;

      // set current active section here
      setActiveStatus(courseSectionData[currentSectionIndex]?.id);
      // set current active subSection here
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, sectionId, subsectionId]);

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-rich-black-700 bg-rich-black-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-rich-black-600 py-5 text-lg font-bold text-rich-black-25">
          {/* to buttons */}
          <div className="flex w-full items-center justify-between">
            <div
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-rich-black-100 p-1 text-rich-black-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          {/* completed no of lectures */}
          <div className="flex flex-col">
            <p>{entireCourseData?.name}</p>
            <p className="text-sm font-semibold text-rich-black-500">
              {completedLectures?.length || 0} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* for sections and subSections */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData?.map((section, index) => (
            <div
              key={index}
              onClick={() => setActiveStatus(section.id)}
              className="mt-2 cursor-pointer text-sm text-rich-black-5"
            >
              {/* section details */}
              <div className="flex flex-row justify-between bg-rich-black-600 px-5 py-4">
                <div className="w-[70%] font-semibold">{section.name}</div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeStatus === section.id ? "rotate-0" : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* subSections details */}
              {activeStatus === section?.id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {section.subSections.map((subSection, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 px-5 py-2 ${
                        videoBarActive === subSection.id
                          ? "bg-crimsonRed-200 font-semibold text-rich-black-5"
                          : "hover:bg-rich-black-900"
                      } `}
                      onClick={() => {
                        navigate(
                          `/view-course/${entireCourseData.id}/section/${section.id}/subsection/${subSection.id}`
                        );
                        setVideoBarActive(subSection.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures?.includes(subSection.id)}
                        onChange={() => {}}
                      />
                      {subSection.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
