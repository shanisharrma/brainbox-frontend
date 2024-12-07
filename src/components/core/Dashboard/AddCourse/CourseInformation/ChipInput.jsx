/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { getAllSuggestedTags } from "@/services/operations/courseAPI";

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  setValue,
  errors,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [chipsList, setChipsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editCourse) {
      setChipsList(course.courseTags.map((tag) => tag.name));
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, [register, name, editCourse, course]);

  useEffect(() => {
    setValue(name, chipsList);
  }, [setValue, name, chipsList]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      if (searchTerm && !chipsList.includes(searchTerm)) {
        const newChipsList = [...chipsList, searchTerm];
        setChipsList(newChipsList);
        setSearchTerm("");
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    const newChipsList = chipsList.filter((_, index) => index !== chipIndex);
    setChipsList(newChipsList);
  };

  const fetchSuggestions = async (query) => {
    setLoading(true);
    try {
      const result = await getAllSuggestedTags(query);
      setSuggestions(result);
    } catch (error) {
      console.error("failed to fetch suggestions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm) {
        fetchSuggestions(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <>
      <div className="mb-3 relative">
        <label
          htmlFor={name}
          className="block text-rich-black-100 w-full text-[0.875rem] leading-5 my-1"
        >
          {label} <sup className="text-crimsonRed-50">*</sup>
        </label>
        {chipsList.length > 0 && (
          <div className="flex gap-x-2 flex-wrap my-3">
            {chipsList.map((chip, index) => (
              <div
                key={index}
                className="flex items-center rounded-full p-1 px-2 text-xs text-rich-black-5 bg-crimsonRed-50"
              >
                {chip}
                <span
                  onClick={() => handleDeleteChip(index)}
                  className="ml-2 focus:outline-none"
                >
                  <MdClose className="text-xs" />
                </span>
              </div>
            ))}
          </div>
        )}
        <input
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.trimStart())}
          className="bg-rich-black-300 rounded-lg text-rich-black-100 w-full p-3 border-b-[1px] border-b-rich-black-100 placeholder:text-rich-black-100"
        />
        {suggestions && suggestions.length > 0 && (
          <div className="absolute top-[110%] border border-rich-black-50 w-full bg-rich-black-200 p-1 py-2 rounded-md">
            {loading ? (
              <p className="text-rich-black-5">Loading...</p>
            ) : (
              <ul className="">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setChipsList([...chipsList, suggestion]);
                      setSearchTerm("");
                    }}
                    className="text-rich-black-100 text-xs hover:text-rich-black-5 hover:bg-rich-black-100 p-2 rounded-md"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {errors && errors[name] && (
        <span className="text-xs text-crimsonRed-50">{label} is required</span>
      )}
    </>
  );
};

export default ChipInput;
