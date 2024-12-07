import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { IconBtn } from "../../common";
import { createRating } from "@/services/operations/courseAPI";
import { RxCross2 } from "react-icons/rx";

/* eslint-disable react/prop-types */
const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { entireCourseData } = useSelector((state) => state.viewCourse);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseReview", "");
    setValue("courseRating", 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRatingChange = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onReviewSubmit = async (data) => {
    await createRating(token, entireCourseData.id, {
      rating: data.courseRating,
      review: data.courseReview,
    });
    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-rich-black-300 bg-rich-black-500">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-rich-black-300 p-5">
          <p className="text-xl font-semibold text-rich-black-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-rich-black-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 w-full">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user.profileDetails.imageUrl}
              alt={user.firstName + "Profile"}
              className="aspect-square rounded-full object-cover w-[50px]"
            />
            <div>
              <p className="font-semibold text-rich-black-5">
                {user.firstName + " " + user.lastName}
              </p>
              <p className="text-sm text-rich-black-5">Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onReviewSubmit)}
            className="mt-3 flex flex-col items-center justify-start"
          >
            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={24}
              activeColor="#ffd700"
            />

            {/* Review Course textarea */}
            <div className="mb-4 w-[80%]">
              <label
                htmlFor="courseReview"
                className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
              >
                Write Your Experience About Course:
                <sup className="text-crimsonRed-50">*</sup>
              </label>
              <textarea
                name="courseReview"
                id="courseReview"
                cols="30"
                rows="4"
                placeholder="Enter your experience..."
                className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
                {...register("courseReview", {
                  required: {
                    value: true,
                    message: "Please provide your experience.",
                  },
                })}
              ></textarea>
              {errors && errors.courseReview && (
                <span className="text-xs text-crimsonRed-50">
                  {errors.courseReview.message}
                </span>
              )}
            </div>

            {/* Cancel and Save button */}
            <div className="my-6 flex w-11/12 justify-end gap-x-2">
              <IconBtn
                type="button"
                text="Cancel"
                onclick={() => setReviewModal(false)}
                customClasses="text-rich-black-100 bg-rich-black-300"
              />
              <IconBtn text="Save" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
