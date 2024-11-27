/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseAPI";
import {
  addSubSection,
  editSubSection,
} from "../../../../../store/slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Upload";
import { IconBtn } from "../../../../common";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("title", modalData.title);
      setValue("description", modalData.description);
      setValue("lecture", modalData.videoUrl);
    }
  }, [edit, view, modalData, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.title !== modalData.title ||
      currentValues.description !== modalData.description ||
      currentValues.videoUrl !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    // EDIT SubSection in DB (EDIT)
    const currentValues = getValues();
    const formData = new FormData();

    if (currentValues.title !== modalData.title) {
      formData.append("title", modalData.title);
    }
    if (currentValues.description !== modalData.description) {
      formData.append("description", modalData.description);
    }
    if (currentValues.videoUrl !== modalData.videoUrl) {
      formData.append("lecture", modalData.videoUrl);
    }

    // API Call
    setLoading(true);
    const result = await updateSubSection(
      token,
      modalData.sectionId,
      modalData.id,
      formData
    );
    if (result) {
      dispatch(
        editSubSection({
          sectionId: modalData.sectionId,
          updatedSubSection: result,
        })
      );
    }
  };

  const handleOnSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made to the form");
      } else {
        // edit the form
        handleEditSubSection();
      }
      return;
    }

    // CREATE SubSection in DB (ADD)
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("lecture", data.lecture);

    setLoading(true);
    // API Call
    const result = await createSubSection(token, modalData, formData);
    if (result) {
      // TODO: check for update
      dispatch(addSubSection({ sectionId: modalData, subSection: result }));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    // <div>
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-rich-black-100 bg-rich-black-800">
        <div className="flex items-center justify-between rounded-t-lg bg-rich-black-500 p-5">
          <h4 className="text-xl font-semibold text-rich-black-5">
            {view && "Viewing "} {add && "Adding "}
            {edit && "Editing "}Lecture
          </h4>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 className="text-2xl text-rich-black-5" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="space-y-8 px-8 py-10"
        >
          <Upload
            name="lecture"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          {/* Course SubSection Title */}
          <div className="mb-3">
            <label
              htmlFor="title"
              className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
            >
              Lecture Title{" "}
              {!view && <sup className="text-crimsonRed-50">*</sup>}
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter lecture title..."
              className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
              {...register("title", {
                required: {
                  value: true,
                  message: "Please enter your lecture title",
                },
              })}
            />
          </div>
          {errors && errors.title && (
            <span className="text-xs text-crimsonRed-50">
              {errors.title.message}
            </span>
          )}

          {/* Lecture description textarea */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
            >
              Lecture Description{" "}
              {!view && <sup className="text-crimsonRed-50">*</sup>}
            </label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="4"
              placeholder="Enter your description..."
              className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
              {...register("description", {
                required: {
                  value: true,
                  message: "Please enter your lecture description",
                },
              })}
            ></textarea>
          </div>
          {errors && errors.description && (
            <span className="text-xs text-crimsonRed-50">
              {errors.description.message}
            </span>
          )}

          {!view && (
            <div>
              <IconBtn
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
    // </div>
  );
};

export default SubSectionModal;
