import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getViewCourseDetails } from "../services/operations/courseAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../store/slices/viewCourseSlice";
import {
  CourseReviewModal,
  VideoDetailsSidebar,
} from "../components/core/ViewCourse";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getViewCourseDetails(token, courseId);
      dispatch(setCourseSectionData(courseData.sections));
      dispatch(setEntireCourseData(courseData));
      dispatch(setCompletedLectures(courseData.progress.completedSubSections));
      let lectures = 0;
      courseData.sections.forEach((section) => {
        lectures += section.subSections.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };
    setCourseSpecificDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, courseId]);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
