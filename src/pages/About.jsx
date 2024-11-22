import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import {
  Quote,
  Stats,
  ContactFormSection,
  LearningGrid,
} from "../components/core/AboutPage";
import { Footer } from "../components/common";

const About = () => {
  return (
    <div>
      {/* Section 1 */}
      <section className="bg-rich-black-300">
        <div className="relative text-rich-black-5 w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-10 text-center">
          <div className="py-20 lg:w-[70%]">
            <h2 className="text-4xl font-semibold mx-auto text-center">
              Driving Innovation in Online Education for a{" "}
              <HighlightText text={"Brighter Future"} />
            </h2>
            <p className="mx-auto mt-3 text-center text-base font-medium text-rich-black-100 lg:w-[95%]">
              Brainbox is at the forefront of driving innovation in online
              education. We are passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="" />
            <img src={BannerImage2} alt="" />
            <img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="border-b border-b-rich-black-300">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-rich-black-100 py-32 pb-12">
          <Quote />
        </div>
      </section>

      {/* Section 3 */}
      <section>
        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col text-rich-black-100">
          {/* Founding Stroy */}
          <div className="flex flex-col items-center justify-between gap-x-10 lg:flex-row">
            {/* Founding Story left */}
            <div className="mt-16 flex lg:w-[50%] flex-col gap-10">
              <h3 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                Our founding Story
              </h3>
              <p className="text-base font-medium text-rich-black-100 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-rich-black-100 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            {/* Founding Stroy right */}
            <div>
              <img
                src={FoundingStory}
                alt="Founding Story"
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>

          {/* Vision and mission */}
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            {/* our vision */}
            <div className="flex lg:w-[40%] flex-col gap-10">
              <h3 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h3>
              <p className="text-base font-medium text-rich-black-100 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            {/* our mission */}
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h3 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h3>
              <p className="text-base font-medium text-rich-black-100 lg:w-[95%]">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="bg-rich-black-200">
        <Stats />
      </section>

      {/* Section 5 */}
      <section className="py-16 w-11/12 max-w-maxContent mx-auto text-rich-black-5">
        <LearningGrid />
      </section>

      {/* Section 6 */}
      <section>
        <ContactFormSection />
      </section>

      {/* Section Slider */}
      <section className="my-7">
        <div className="text-rich-black-5 w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center gap-10">
          <h2 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
          </h2>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
