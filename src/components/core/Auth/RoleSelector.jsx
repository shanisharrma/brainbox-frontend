/* eslint-disable react/prop-types */
import { useState } from "react";

const RoleSelector = ({ onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState("student");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    onSelectRole(role);
  };

  return (
    <div className="flex justify-between bg-rich-black-300 border-b-[1px] border-b-rich-black-100 w-1/2 p-1 rounded-full my-5">
      <button
        onClick={() => handleRoleChange("student")}
        className={`rounded-full px-3 py-[0.375rem] w-full transition-colors duration-300 ${
          selectedRole === "student"
            ? "bg-rich-black-900 text-rich-black-100"
            : "text-rich-black-100"
        }`}
      >
        Student
      </button>
      <button
        onClick={() => handleRoleChange("instructor")}
        className={`rounded-full px-3 py-[0.375rem] w-full transition-colors duration-300 ${
          selectedRole === "instructor"
            ? "bg-rich-black-900 text-rich-black-100"
            : "text-rich-black-100"
        }`}
      >
        Instructor
      </button>
    </div>
  );
};

export default RoleSelector;
