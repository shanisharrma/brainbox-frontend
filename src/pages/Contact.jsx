import { Footer } from "../components/common";
import { ContactForm, ContactDetails } from "../components/core/ContactPage";

const Contact = () => {
  return (
    <div>
      <div className="text-rich-black-5 w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between mt-20">
        {/* Section 1 */}
        <section>
          <div className="flex flex-row justify-between gap-x-10">
            {/* Contact Details */}
            <div className="lg:w-[40%]">
              <ContactDetails />
            </div>
            {/* Contact Us Form */}
            <div className="lg:w-[60%]">
              <ContactForm />
            </div>
          </div>
        </section>
        {/* Section Slider */}
        <section className="my-7">
          <h2 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
          </h2>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
