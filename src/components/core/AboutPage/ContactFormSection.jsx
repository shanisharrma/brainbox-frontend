import { ContactUsForm } from "../../common";

const ContactFormSection = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-y-3 text-rich-black-5">
      <h2 className="text-4xl font-semibold">Get in Touch</h2>
      <p className="font-medium text-rich-black-100 mb-6">
        We would love to here from you. Please fill out this form.
      </p>
      <div className="w-[500px]">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
