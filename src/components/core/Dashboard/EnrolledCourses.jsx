import { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/courseAPI";
import { navigate } from "../../../hooks/setNavigate";
import { formatDuration } from "../../../utils/utilityFunctions";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="text-3xl mb-4 font-medium text-rich-black-5">
        Enrolled Courses
      </h2>

      {/* Check if enrolled to course  */}
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-rich-black-5">
          You have not enrolled to any courses yet.
        </p>
      ) : (
        <div className="my-8 text-rich-black-5">
          {/* tabs for filtering the courses based on pending and completed */}
          <div></div>
          {/* Course table */}
          <div className="my-8 text-rich-black-5">
            {/* table header */}
            <div className="flex rounded-t-lg bg-rich-black-500">
              <p className="w-[45%] px-5 py-3">Course Name</p>
              <p className="w-1/4 px-2 py-3">Duration</p>
              <p className="flex-1 px-2 py-3">Progress</p>
              {/* <p>Progress</p> */}
            </div>

            {/* table body */}
            {enrolledCourses.map((course, index, arr) => (
              <div
                key={index}
                className={`flex items-center border border-rich-black-300 ${
                  index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
              >
                {console.log("enrolledCourse", course)}
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() =>
                    navigate(
                      `/view-course/${course.id}/section/${
                        course.sections[course.sections.length - 1].id
                      }/subsection/${
                        course.sections[course.sections.length - 1]
                          .subSections[0].id
                      }`
                    )
                  }
                >
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">{course.name}</p>
                    <p className="text-xs text-rich-black-100">
                      {course.description.length > 50
                        ? `${course.description.slice(0, 50)}...`
                        : course.description}
                    </p>
                  </div>
                </div>
                <div className="w-1/4 px-2 py-3">
                  {formatDuration(course.totalDuration)}
                </div>
                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course.progress.percentage.toFixed(2) || 0}%</p>
                  <ProgressBar
                    completed={course.progress.percentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
