import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IconBtn } from "../../../../common";
import { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import {
  addSection,
  setEditCourse,
  setStep,
} from "../../../../../store/slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseAPI";
import NestedView from "./NestedView";
import { MdNavigateNext } from "react-icons/md";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("name", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.sections.length === 0) {
      toast.error("Please add at least one Section");
      return;
    }
    if (course.sections.some((section) => section.subSections.length === 0)) {
      toast.error("Please add at least one lecture in each section.");
      return;
    }

    // * if everything ok
    dispatch(setStep(3));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      // we are editing the section name
      result = await updateSection(token, course.id, editSectionName, {
        name: data.name,
      });
    } else {
      result = await createSection(token, course.id, { name: data.name });
    }

    if (result) {
      dispatch(addSection(result));
      setEditSectionName(null);
      setValue("name", "");
    }

    setLoading(false);
  };

  const handleChangedEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("name", sectionName);
  };

  return (
    <div className="w-full rounded-md bg-rich-black-500 border border-rich-black-300 p-8">
      <h4 className="text-2xl text-rich-black-5 mb-6">Course Builder</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Course Section Name */}
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
          >
            Section Name <sup className="text-crimsonRed-50">*</sup>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter section name..."
            className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
            {...register("name", {
              required: {
                value: true,
                message: "Please enter your section name",
              },
            })}
          />
        </div>
        {errors && errors.name && (
          <span className="text-xs text-crimsonRed-50">
            {errors.name.message}
          </span>
        )}

        <div className="my-4 flex gap-x-3 items-end">
          <IconBtn
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            type="submit"
            outline={true}
          >
            <GrAddCircle className="text-crimsonRed-50" />
          </IconBtn>
          {editSectionName && (
            <IconBtn
              outline={true}
              customClasses="text-rich-black-100 border-rich-black-100"
              onclick={cancelEdit}
              text="Cancel Edit"
              type="button"
            ></IconBtn>
          )}
        </div>
      </form>

      {course.sections && course.sections.length > 0 && (
        <NestedView
          handleChangedEditSectionName={handleChangedEditSectionName}
        />
      )}

      <div className="flex justify-end gap-x-3 mt-6">
        <IconBtn
          text="Go Back"
          onclick={goBack}
          customClasses="bg-rich-black-100 text-rich-black-900"
        />
        <IconBtn text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
