/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationModal, IconBtn } from "../../../../common";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseAPI";
import {
  removeSection,
  removeSubSection,
} from "../../../../../store/slices/courseSlice";

const NestedView = ({ handleChangedEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(token, course.id, sectionId);
    if (result) {
      dispatch(removeSection(sectionId));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (sectionId, subSectionId) => {
    const result = await deleteSubSection(token, sectionId, subSectionId);
    if (result.success) {
      dispatch(removeSubSection({ sectionId, subSectionId }));
    }
    setConfirmationModal(null);
  };

  return (
    <div>
      <div className="rounded-lg bg-rich-black-300 p-6 px-8">
        {course.sections.map((section, index) => (
          <details key={index} open>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-rich-black-200 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-rich-black-50" />
                <p className="font-semibold text-rich-black-50">
                  {section.name}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangedEditSectionName(section.id, section.name)
                  }
                >
                  <MdEdit className="text-xl text-rich-black-100" />
                </button>
                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this Section",
                      text2: "All the lectures in this section will be deleted",
                      bnt1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section.id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <RiDeleteBin6Line className="text-xl text-rich-black-50" />
                </button>
                <span className="text-rich-black-50 font-medium">|</span>
                <BiSolidDownArrow className="text-xl text-rich-black-50" />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {section.subSections &&
                section.subSections.map((subSection) => (
                  <div
                    key={subSection.id}
                    onClick={() => setViewSubSection(subSection)}
                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-rich-black-200 py-2"
                  >
                    <div className="flex items-center gap-x-3 py-2">
                      <RxDropdownMenu className="text-2xl text-rich-black-50" />
                      <p className="font-semibold text-rich-black-50">
                        {subSection.title}
                      </p>
                    </div>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-x-3"
                    >
                      <button
                        onClick={() =>
                          setEditSubSection({
                            ...subSection,
                            sectionId: section.id,
                          })
                        }
                      >
                        <MdEdit className="text-xl text-rich-black-50" />
                      </button>
                      <button
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Delete this Sub Section",
                            text2: "Selected lectures will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              handleDeleteSubSection(section.id, subSection.id),
                            btn2Handler: () => setConfirmationModal(null),
                          });
                        }}
                      >
                        <RiDeleteBin6Line className="text-xl text-rich-black-50" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <IconBtn
              text={"Add Lecture"}
              outline={true}
              onclick={() => setAddSubSection(section.id)}
            >
              <AiOutlinePlus size={20} />
            </IconBtn>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : (
        editSubSection && (
          <SubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
          />
        )
      )}

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default NestedView;
