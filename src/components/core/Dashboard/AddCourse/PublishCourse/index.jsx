import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IconBtn } from "../../../../common";
import {
  resetCourseState,
  setStep,
} from "../../../../../store/slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { navigate } from "../../../../../hooks/setNavigate";
import { updateCourseDetails } from "../../../../../services/operations/courseAPI";

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course.status === COURSE_STATUS.PUBLISHED) {
      setValue("status", true);
    }
  });

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handlePublishCourse = async () => {
    if (
      (course.status === COURSE_STATUS.PUBLISHED &&
        getValues("status") === true) ||
      (course.status === COURSE_STATUS.DRAFT && getValues("status") === false)
    ) {
      // * no need to make api call as there is no change occurred
      goToCourses();
      return;
    }

    // * if form updated
    const formData = new FormData();
    const courseStatus = getValues("status")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    // * api call
    setLoading(true);
    const result = await updateCourseDetails(token, course.id, formData);
    if (result.success) {
      goToCourses();
    }
    setLoading(false);
  };

  const handleOnSubmit = () => {
    handlePublishCourse();
  };

  return (
    <div className="rounded-md border border-rich-black-200 bg-rich-black-500 space-y-8 p-6">
      <h4 className="text-2xl font-semibold text-rich-black-5">
        Publish Course
      </h4>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="mb-8 my-6">
          <label htmlFor="status" className="inline-flex items-center">
            <input
              type="checkbox"
              name="status"
              id="status"
              className="bg-rich-black-300 text-rich-black-100 p-3 border-b-[1px] border-b-rich-black-100  border-gray-300 h-4 w-4 rounded focus:ring-1 focus:ring-rich-black-100"
              {...register("status")}
            />
            <span className="ml-2 text-rich-black-100 text-[0.875rem] leading-5 my-1">
              Make this course public{" "}
            </span>
          </label>
        </div>

        <div className="flex justify-end gap-x-3">
          <IconBtn
            text="Back"
            onclick={goBack}
            type="button"
            disabled={loading}
            customClasses="bg-rich-black-100 text-rich-black-900"
          />
          <IconBtn text="Save Changes" type="submit" disabled={loading} />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
