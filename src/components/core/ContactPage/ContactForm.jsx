import { ContactUsForm } from "../../common";

const ContactForm = () => {
  return (
    <div className="border border-rich-black-300 text-rich-black-100 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h2 className="text-4xl leading-10 font-semibold text-rich-black-5">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h2>
      <p className="text-rich-black-50">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>
      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
