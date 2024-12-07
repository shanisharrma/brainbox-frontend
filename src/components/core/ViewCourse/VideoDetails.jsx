import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { navigate } from "@/hooks/setNavigate";
import { updateCompletedLectures } from "@/store/slices/viewCourseSlice";
import { markLectureAsComplete } from "@/services/operations/courseAPI";
import { BigPlayButton, Player } from "video-react";
import "video-react/dist/video-react.css";
import { IconBtn } from "../../common";
import { findArrayIndex } from "@/utils/utilityFunctions";

const VideoDetails = () => {
  const { courseId, sectionId, subsectionId } = useParams();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData?.length) {
        return;
      }
      if (!courseId && !sectionId && !subsectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredSectionData = courseSectionData.filter(
          (section) => section.id === Number(sectionId)
        );
        const filteredVideoData = filteredSectionData?.[0]?.subSections.find(
          (subSection) => subSection.id === Number(subsectionId)
        );
        setVideoData(filteredVideoData);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
  }, [courseSectionData, courseId, sectionId, subsectionId]);

  const isFirstVideo = () => {
    const currentSectionIndex = findArrayIndex(
      courseSectionData,
      Number(sectionId)
    );

    const currentSubSectionIndex = findArrayIndex(
      courseSectionData[currentSectionIndex].subSections,
      Number(subsectionId)
    );
    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    }
    return false;
  };
  const isLastVideo = () => {
    const currentSectionIndex = findArrayIndex(
      courseSectionData,
      Number(sectionId)
    );
    const numberOfSubSections =
      courseSectionData[currentSectionIndex]?.subSections.length;

    const currentSubSectionIndex = findArrayIndex(
      courseSectionData[currentSectionIndex].subSections,
      Number(subsectionId)
    );

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === numberOfSubSections - 1
    ) {
      return true;
    }
    return false;
  };
  const goToNextVideo = () => {
    const currentSectionIndex = findArrayIndex(
      courseSectionData,
      Number(sectionId)
    );
    const numberOfSubSections =
      courseSectionData[currentSectionIndex]?.subSections.length;

    const currentSubSectionIndex = findArrayIndex(
      courseSectionData[currentSectionIndex].subSections,
      Number(subsectionId)
    );

    if (currentSubSectionIndex !== numberOfSubSections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSections[
          currentSubSectionIndex + 1
        ].id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/subsection/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1].id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSections[0].id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/subsection/${nextSubSectionId}`
      );
    }
  };
  const goToPreviousVideo = () => {
    const currentSectionIndex = findArrayIndex(
      courseSectionData,
      Number(sectionId)
    );

    const currentSubSectionIndex = findArrayIndex(
      courseSectionData[currentSectionIndex].subSections,
      Number(subsectionId)
    );

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex]?.subSections[
          currentSubSectionIndex - 1
        ].id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/subsection/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1].id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSections.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1]?.subSections[
          prevSubSectionLength - 1
        ].id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/subsection/${prevSubSectionId}`
      );
    }
  };
  const handleLectureCompletion = async () => {
    setLoading(true);

    const response = await markLectureAsComplete(token, courseId, subsectionId);
    if (response) {
      dispatch(updateCompletedLectures(Number(subsectionId)));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <div>No Data Found</div>
      ) : (
        <div className="w-[90%] mt-5">
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.video}
          >
            <BigPlayButton position="center" />
            {videoEnded && (
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                }}
                className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
              >
                {!completedLectures?.includes(Number(subsectionId)) && (
                  <IconBtn
                    disabled={loading}
                    text={!loading ? "Mark as Completed" : "Loading..."}
                    onclick={() => handleLectureCompletion()}
                    customClasses="text-xl max-w-max px-4 mx-auto"
                  />
                )}

                <IconBtn
                  disabled={loading}
                  onclick={() => {
                    if (playerRef.current) {
                      playerRef.current.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text="Re-Watch"
                  customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                />

                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                  {!isFirstVideo() && (
                    <IconBtn
                      text="Prev"
                      onclick={() => goToPreviousVideo()}
                      customClasses="text-rich-black-25 bg-rich-black-800"
                    />
                  )}

                  {!isLastVideo() && (
                    <IconBtn
                      text="Next"
                      onclick={() => goToNextVideo()}
                      customClasses="text-rich-black-25 bg-rich-black-800"
                    />
                  )}
                </div>
              </div>
            )}
          </Player>
          <h2 className="mt-4 text-3xl font-semibold">{videoData.title}</h2>
          <p className="pt-2 pb-6">{videoData.description}</p>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
