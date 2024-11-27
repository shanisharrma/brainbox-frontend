import { useDispatch, useSelector } from "react-redux";
import RenderSteps from "../AddCourse/RenderSteps";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEditableSingleCourse } from "../../../../services/operations/courseAPI";
import { setCourse, setEditCourse } from "../../../../store/slices/courseSlice";

const EditCourse = () => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getEditableSingleCourse(token, courseId);

      if (result) {
        dispatch(setEditCourse(true));
        dispatch(setCourse({ ...result, sections: result.sections || [] }));
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, token]);

  return (
    <div className="flex justify-center items-center">
      {!loading ? (
        <div className="w-full lg:w-[60%]">
          <h2 className="mb-6 text-3xl font-medium text-rich-black-5">
            Edit Course
          </h2>
          <div>
            {course && course.sections.length > 0 ? (
              <RenderSteps />
            ) : (
              <div className="mt-14 text-center text-3xl font-semibold text-rich-black-100">
                Course Not Found
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid flex-1 place-items-center">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
