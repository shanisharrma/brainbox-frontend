import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: { sections: [] },
  editCourse: false,
  paymentLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },
    resetCourseState: (state) => {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
    },
    addSection: (state, action) => {
      state.course.sections.push(action.payload);
    },
    editSection: (state, action) => {
      const updatedSection = action.payload;
      state.course.sections = state.course.sections.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      );
    },
    removeSection: (state, action) => {
      state.course.sections = state.course.sections.filter(
        (section) => section.id !== action.payload
      );
    },
    addSubSection: (state, action) => {
      const { sectionId, subSection } = action.payload;
      const section = state.course.sections.find(
        (section) => section.id === sectionId
      );
      if (section) {
        section.subSections = section.subSections || [];
        section.subSections.push(subSection);
      }
    },
    editSubSection: (state, action) => {
      const { sectionId, updatedSubSection } = action.payload;
      const section = state.course.sections.find(
        (section) => section.id === sectionId
      );
      if (section) {
        section.subSections = section.subSections.map((subSection) =>
          subSection.id === updatedSubSection.id
            ? updatedSubSection
            : subSection
        );
      }
    },
    removeSubSection: (state, action) => {
      const { sectionId, subSectionId } = action.payload;
      const section = state.course.sections.find(
        (section) => section.id === sectionId
      );
      if (section) {
        section.subSections = section.subSections.filter(
          (subSection) => subSection.id !== subSectionId
        );
      }
    },
  },
});

export const {
  resetCourseState,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  setStep,
  addSection,
  editSection,
  removeSection,
  addSubSection,
  editSubSection,
  removeSubSection,
} = courseSlice.actions;
export default courseSlice.reducer;
