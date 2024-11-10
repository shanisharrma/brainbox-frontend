import * as Icon1 from "react-icons/hi2";
import * as Icon2 from "react-icons/bi";
import * as Icon3 from "react-icons/io5";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-rich-black-300 p-4 lg:p-6">
      {contactDetails.map((ele, index) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
        return (
          <div
            key={index}
            className="flex flex-col gap-x-[2px] p-3 text-rich-black-100"
          >
            <div className="flex flex-row items-center gap-3">
              <Icon size={25} />
              <h4 className="font-semibold text-lg text-rich-black-100">
                {ele.heading}
              </h4>
            </div>
            <p className="font-medium text-sm my-1">{ele.description}</p>
            <p className="font-semibold text-sm">{ele.details}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
