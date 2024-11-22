import { IconBtn } from "../../common";
import { FaPlus } from "react-icons/fa";
import { navigate } from "../../../hooks/setNavigate";
import CourseTable from "./InstructorCourses/CourseTable";

const MyCourses = () => {
  return (
    <div>
      <div className="mb-14 flex justify-between items-center">
        <h2 className="text-3xl font-medium text-rich-black-5">My Courses</h2>
        <IconBtn
          text={"Add Course"}
          onclick={() => navigate("/dashboard/add-course")}
        >
          <FaPlus />
        </IconBtn>
      </div>
      <CourseTable />
    </div>
  );
};

export default MyCourses;
