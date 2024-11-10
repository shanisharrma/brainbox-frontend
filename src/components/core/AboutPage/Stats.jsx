const ourStats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const Stats = () => {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto">
      <div className="flex justify-between items-center gap-x-4">
        {ourStats.map((data, index) => (
          <div key={index} className="flex flex-col items-center p-10 gap-y-1">
            {" "}
            <h4 className="text-3xl font-semibold text-rich-black-5">
              {data.count}
            </h4>
            <p className="text-base text-rich-black-100 font-semibold">
              {data.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
