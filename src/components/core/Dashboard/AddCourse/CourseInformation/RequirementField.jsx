/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RequirementField = ({
  name,
  label,
  placeholder,
  register,
  errors,
  setValue,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course.requirements.split(","));
    }
    {
      register(name, {
        required: true,
        validate: (value) => value.length > 0,
      });
    }
  }, [name, register, editCourse, course]);

  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList, setValue, name]);

  const handleAddRequirements = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirements = (requirement) => {
    const filteredRequirementsList = requirementsList.filter(
      (item) => item !== requirement
    );
    setRequirementsList(filteredRequirementsList);
  };

  return (
    <>
      <div className="mb-3">
        <label
          htmlFor={name}
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          {label} <sup className="text-crimsonRed-50">*</sup>
        </label>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder={placeholder}
          className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
        />
        <div
          className="font-semibold text-crimsonRed-50 cursor-pointer"
          onClick={handleAddRequirements}
        >
          Add
        </div>
      </div>
      {/* display all the requirements */}
      <div>
        {requirementsList.length > 0 && (
          <ul>
            {requirementsList.map((requirement, index) => (
              <li key={index} className="flex items-center gap-x-2">
                <p className="text-rich-black-5">{requirement}</p>
                <div
                  className="font-semibold text-xs text-rich-black-100 underline cursor-pointer"
                  onClick={() => handleRemoveRequirements(requirement)}
                >
                  clear
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {errors && errors[name] && (
        <span className="text-xs text-crimsonRed-50">{label} is required</span>
      )}
    </>
  );
};

export default RequirementField;
