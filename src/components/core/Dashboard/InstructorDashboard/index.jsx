import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorDashboard } from "../../../../services/operations/profileAPI";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

const InstructorDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getInstructorData = async () => {
      setLoading(true);
      const result = await getInstructorDashboard(token);

      if (result) {
        setInstructorData(result);
        setCourses(result.courses);
      }

      setLoading(false);
    };
    getInstructorData();
  }, [token]);

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-3xl text-rich-black-5 font-semibold">
          Hi {user.firstName} 👋
        </h2>
        <p className="text-sm text-rich-black-100 my-2">
          Let us start something new
        </p>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : instructorData ? (
        <div>
          <div className="flex justify-between gap-x-4 mb-6">
            <InstructorChart data={instructorData} />
            <div className="w-[30%] border border-rich-black-300 bg-rich-black-500 p-4 rounded-md">
              <h4 className="text-2xl text-rich-black-5 mb-4">Statistics</h4>
              <div className="">
                <p className="text-sm text-rich-black-100">Total Course</p>
                <p className="text-lg font-semibold text-rich-black-5">
                  {courses.length}
                </p>
              </div>
              <div className="my-4">
                <p className="text-sm text-rich-black-100">Total Students</p>
                <p className="text-lg font-semibold text-rich-black-5">
                  {instructorData ? instructorData.totalStudents : 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-rich-black-100">Total Revenue</p>
                <p className="text-lg font-semibold text-rich-black-5">
                  Rs. {instructorData ? instructorData.totalRevenue : 0}
                </p>
              </div>
            </div>
          </div>

          {/* Top 3 Courses */}
          <div className="bg-rich-black-500 p-4 px-6 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl text-rich-black-5">My Courses</p>
              <div className="text-crimsonRed-50">
                <Link to="/dashboard/my-courses">View All</Link>
              </div>
            </div>
            <div className="flex gap-x-4 mb-6">
              {courses && courses.length > 0 ? (
                courses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    className="w-1/3 bg-rich-black-300 p-2 rounded-md border border-rich-black-200"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="w-full rounded object-cover"
                    />
                    <div className="mt-3">
                      <p className="text-rich-black-5 font-normal text-sm">
                        {course.name}
                      </p>
                      <div className="flex space-x-2 items-center">
                        <p className="text-rich-black-100 text-xs">
                          {course.enrolledStudents} Students
                        </p>
                        <p className="text-rich-black-100 text-xs">|</p>
                        <p className="text-rich-black-100 text-xs">
                          Rs. {course.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No Courses Created</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>No Data Found</div>
      )}
    </div>
  );
};

export default InstructorDashboard;
