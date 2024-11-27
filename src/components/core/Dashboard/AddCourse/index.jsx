import RenderSteps from "./RenderSteps";

const AddCourse = () => {
  return (
    <div className="flex justify-between gap-x-10">
      <div className="w-full lg:w-[60%]">
        <h2 className="mb-6 text-3xl font-medium text-rich-black-5">
          Add Course
        </h2>
        <div>
          <RenderSteps />
        </div>
      </div>

      <div className="sticky top-10 hidden xl:block lg:w-[40%] h-fit bg-rich-black-400 border border-rich-black-200 text-rich-black-5 p-7 rounded-md">
        <p className="text-xl mb-6">Course Upload Tips</p>
        <ul className="text-xs space-y-3">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>
            Make Announcements to notify any important Notes to all enrolled
            students at once.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
