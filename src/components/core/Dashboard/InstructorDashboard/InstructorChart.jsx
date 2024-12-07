/* eslint-disable react/prop-types */
import { useState } from "react";
import { getRandomColors } from "../../../../utils/utilityFunctions";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({ data }) => {
  const [currChart, setCurrChart] = useState("students");

  // * create data for chart displaying student info
  const studentChartData = {
    labels: data.courses.map((course) => course.name),
    datasets: [
      {
        data: data.courses.map((course) => course.enrolledStudents),
        backgroundColor: getRandomColors(data.courses.length),
      },
    ],
  };

  // * create data for chart displaying income info
  const incomeChartData = {
    labels: data.courses.map((course) => course.name),
    datasets: [
      {
        data: data.courses.map((course) => course.amountGenerated),
        backgroundColor: getRandomColors(data.courses.length),
      },
    ],
  };

  // * create options
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="w-[70%] rounded-md bg-rich-black-500 border border-rich-black-300 p-4">
      <h4 className="text-2xl font-semibold text-rich-black-5">Visualize</h4>
      <div className="my-3 flex gap-x-4">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded p-1 px-3 transition-all duration-150 ${
            currChart === "students"
              ? "bg-crimsonRed-25 text-crimsonRed-200"
              : "text-crimsonRed-25"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded p-1 px-3 transition-all duration-150 ${
            currChart === "income"
              ? "bg-crimsonRed-25 text-crimsonRed-200"
              : "text-crimsonRed-25"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-80 w-80 p-4">
        <Pie
          data={currChart === "students" ? studentChartData : incomeChartData}
          options={options}
        />
      </div>
    </div>
  );
};

export default InstructorChart;
