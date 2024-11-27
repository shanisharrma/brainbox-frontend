import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../../../services/operations/categoryAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../store/slices/courseSlice";
import { IconBtn } from "../../../../common";
import {
  addCourseDetails,
  updateCourseDetails,
} from "../../../../../services/operations/courseAPI";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import { MdNavigateNext } from "react-icons/md";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getCategories = async () => {
    setLoading(true);
    const categories = await getAllCategories();
    if (categories.length > 0) {
      setCourseCategory(categories);
      if (editCourse && course.courseCategory.name) {
        setSelectedCategory(course.courseCategory.name);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (editCourse) {
      setValue("name", course.name);
      setValue("description", course.description);
      setValue(
        "tags",
        course.courseTags.map((tag) => tag.name)
      );
      setValue("whatYouWillLearn", course.whatYouWillLearn);
      setValue("price", course.price);
      setValue("requirements", course.requirements.split(","));
      setValue("thumbnail", course.thumbnail);
    }
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.name !== course.name ||
      currentValues.description !== course.description ||
      currentValues.tags.toString() !==
        course.courseTags.map((tag) => tag.name).toString() ||
      currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
      currentValues.price !== course.price ||
      currentValues.category !== course.courseCategory.name ||
      currentValues.thumbnail !== course.thumbnail ||
      currentValues.requirements.toString() !== course.requirements.toString()
    ) {
      return true;
    } else return false;
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        if (currentValues.name !== course.name) {
          formData.append("name", data.name);
        }
        if (currentValues.description !== course.description) {
          formData.append("description", data.description);
        }
        if (
          currentValues.tags.toString() !==
          course.courseTags.map((tag) => tag.name).toString()
        ) {
          formData.append("tags", JSON.stringify(data.tags));
        }
        if (currentValues.price !== course.price) {
          formData.append("price", data.price);
        }
        if (currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.whatYouWillLearn);
        }
        if (currentValues.category !== course.category) {
          formData.append("category", data.category);
        }
        if (currentValues.thumbnail !== course.thumbnail) {
          formData.append("thumbnail", data.thumbnail);
        }
        if (
          currentValues.requirements.toString() !==
          course.requirements.toString()
        ) {
          formData.append("requirements", data.requirements.join(","));
        }

        setLoading(true);
        const result = await updateCourseDetails(token, course.id, formData);
        if (result.success) {
          dispatch(setCourse({ ...course, ...result.data }));
          dispatch(setStep(2));
        }
        setLoading(false);
      } else {
        toast.error("No changes made so far.");
      }
      return;
    }

    // create new course
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("price", data.price);
    formData.append("whatYouWillLearn", data.whatYouWillLearn);
    formData.append("category", data.category);
    formData.append("thumbnail", data.thumbnail);
    formData.append("requirements", data.requirements.join(","));
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(token, formData);
    if (result) {
      dispatch(setCourse({ ...result, sections: result.sections || [] }));
      dispatch(setStep(2));
    }
    setLoading(false);
  };

  const handleSelectedCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setValue("category", value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border border-rich-black-200 bg-rich-black-500 space-y-8 p-6"
    >
      {/* Course Name */}
      <div className="mb-3">
        <label
          htmlFor="name"
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          Course Name <sup className="text-crimsonRed-50">*</sup>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter course name..."
          className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
          {...register("name", {
            required: {
              value: true,
              message: "Please enter your  course name",
            },
          })}
        />
      </div>
      {errors && errors.name && (
        <span className="text-xs text-crimsonRed-50">
          {errors.name.message}
        </span>
      )}

      {/* Course description textarea */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          Course Description <sup className="text-crimsonRed-50">*</sup>
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="4"
          placeholder="Enter your description..."
          className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
          {...register("description", {
            required: { value: true, message: "Please enter your description" },
          })}
        ></textarea>
      </div>
      {errors && errors.description && (
        <span className="text-xs text-crimsonRed-50">
          {errors.description.message}
        </span>
      )}

      {/* Course Price */}
      <div className="mb-3 relative">
        <label
          htmlFor="price"
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          Course Price <sup className="text-crimsonRed-50">*</sup>
        </label>
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Enter course price..."
          className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 px-12 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
          {...register("price", {
            required: {
              value: true,
              message: "Please enter your course price",
            },
            valueAsNumber: { value: true, message: "Price must be a number" },
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
            },
          })}
        />
        <HiOutlineCurrencyRupee
          size={28}
          className="absolute left-3 bottom-3 text-rich-black-100"
        />
      </div>
      {errors && errors.price && (
        <span className="text-xs text-crimsonRed-50">
          {errors.price.message}
        </span>
      )}

      {/* Course Category */}
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          Course Category <sup className="text-crimsonRed-50">*</sup>
        </label>
        <select
          name="category"
          id="category"
          className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 px-2 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
          value={selectedCategory}
          {...register("category", {
            required: {
              value: true,
              message: "Please select the course category.",
            },
          })}
          onChange={handleSelectedCategoryChange}
        >
          <option value="">Choose a Category</option>
          {!loading &&
            courseCategory.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      {errors && errors.category && (
        <span className="text-xs text-crimsonRed-50">
          {errors.category.message}
        </span>
      )}

      {/* Create a custom component for handling tags input */}
      <ChipInput
        label="Tags"
        name="tags"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        setValue={setValue}
      />

      {/* create a component for uploading and showing preview media */}
      <Upload
        label="Thumbnail"
        name="thumbnail"
        register={register}
        errors={errors}
        setValue={setValue}
        editData={editCourse ? course.thumbnail : null}
      />

      {/* Benefits of the course textarea */}
      <div className="mb-4">
        <label
          htmlFor="whatYouWillLearn"
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          What You will learn? <sup className="text-crimsonRed-50">*</sup>
        </label>
        <textarea
          name="whatYouWillLearn"
          id="whatYouWillLearn"
          cols="30"
          rows="4"
          placeholder="Enter benefits of the course..."
          className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
          {...register("whatYouWillLearn", {
            required: {
              value: true,
              message: "Please enter benefits of the course",
            },
          })}
        ></textarea>
      </div>
      {errors && errors.whatYouWillLearn && (
        <span className="text-xs text-crimsonRed-50">
          {errors.whatYouWillLearn.message}
        </span>
      )}

      <RequirementField
        name="requirements"
        label="Requirements"
        placeholder="Enter course requirements"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div className="flex justify-end gap-x-3 items-center">
        {editCourse && (
          <IconBtn
            text={"Continue Without Saving"}
            outline={true}
            onclick={() => dispatch(setStep(2))}
          />
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;
