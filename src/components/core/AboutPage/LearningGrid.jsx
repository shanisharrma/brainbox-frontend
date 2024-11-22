import { CTAButton, HighlightText } from "../HomePage";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "BrainBox partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "BrainBox partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "BrainBox partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "BrainBox partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "BrainBox partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto grid-cols-1 lg:grid-cols-4 py-5 w-fit">
      {LearningGridArray.map((card, index) => (
        <div
          key={index}
          className={`lg:h-72 ${index === 0 && "lg:col-span-2 py-5"} ${
            card.order % 2 === 1
              ? "bg-rich-black-400"
              : card.order % 2 === 0 && "bg-rich-black-600"
          } ${card.order === 3 && "lg:col-start-2"}`}
        >
          {card.order < 0 ? (
            <div className="w-[90%] flex flex-col pb-5 gap-3">
              <h3 className="text-4xl font-semibold">
                {card.heading} <HighlightText text={card.highlightText} />
              </h3>
              <p className="font-medium text-rich-black-100">
                {card.description}
              </p>
              <div className="w-fit mt-4">
                <CTAButton linkTo={card.BtnLink} active={true}>
                  {card.BtnText}
                </CTAButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 p-10">
              <h3 className="text-rich-black-5 text-lg">{card.heading}</h3>
              <p className="text-rich-black-100 font-medium">
                {card.description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningGrid;
