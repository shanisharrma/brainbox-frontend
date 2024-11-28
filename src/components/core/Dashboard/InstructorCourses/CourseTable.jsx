import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { COURSE_STATUS } from "../../../../utils/constants";
import { HiClock } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { navigate } from "../../../../hooks/setNavigate";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  deleteCourse,
  getInstructorCourses,
} from "../../../../services/operations/courseAPI";
import { ConfirmationModal } from "../../../common";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { formatDate } from "../../../../utils/utilityFunctions";

const CourseTable = () => {
  const { token } = useSelector((state) => state.auth);
  const [taughtCourses, setTaughtCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const fetchTaughtCourses = async () => {
    try {
      const response = await getInstructorCourses(token);
      setTaughtCourses(response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    const result = await deleteCourse(courseId, token);
    if (result.success) {
      fetchTaughtCourses();
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  useEffect(() => {
    fetchTaughtCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Table className="rounded-xl border border-rich-black-400">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-rich-black-400 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-rich-black-50">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-rich-black-50">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-rich-black-50">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-rich-black-50">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {taughtCourses.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-rich-black-5">
                No Courses Found
              </Td>
            </Tr>
          ) : (
            taughtCourses.map((course) => (
              <Tr
                key={course.id}
                className="flex gap-x-10 border-b border-rich-black-800 px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-medium text-rich-black-5">
                      {course.name}
                    </p>
                    <p className="text-xs text-rich-black-100">
                      {course.description.split(" ").length > 30
                        ? course.description.split(" ").slice(0, 30).join(" ") +
                          "..."
                        : course.description}
                    </p>
                    <p className="text-[12px] text-rich-black-5">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-rich-black-300 px-2 py-[2px] text-[12px] font-medium text-crimsonRed-25">
                        <HiClock size={14} />
                        Draft
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-rich-black-300 px-2 py-[2px] text-[12px] font-medium text-crimsonRed-50">
                        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-crimsonRed-50 text-rich-black-500">
                          <FaCheck size={8} />
                        </span>
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-rich-black-100">
                  2hr 30min
                </Td>
                <Td className="text-sm font-medium text-rich-black-100">
                  ₹{course.price}
                </Td>
                <Td className="text-sm font-medium text-rich-black-50">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course.id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeanGreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course.id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
