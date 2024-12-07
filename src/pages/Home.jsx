import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {
  CodeBlocks,
  CTAButton,
  ExploreMore,
  HighlightText,
  InstructorSection,
  LearningLanguageSection,
  TimelineSection,
} from "../components/core/HomePage";
import Banner from "@/assets/Images/banner.mp4";
import { Footer, ReviewSlider } from "../components/common";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        <Link to="/signup">
          <div className="group mt-16 p-1 mx-auto rounded-full bg-rich-black-500 font-bold text-rich-black-100 transition-all duration-200 hover:scale-95 w-fit border-b border-b-rich-black-200">
            <div className="flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-rich-black-900">
              <p>Become as Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>
        <div className="mt-4 w-[80%] text-center text-lg font-bold text-rich-black-100">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex gap-7 mt-12">
          <CTAButton linkTo="/signup" active={true}>
            Learn More
          </CTAButton>
          <CTAButton linkTo="/contact">Book a Demo</CTAButton>
        </div>

        <div className="shadow-[10px_-5px_50px_-5px] shadow-blue-500 mx-3 my-8">
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_rgba(255,255,255)]"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your <HighlightText text="coding potential" /> with our
                online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctaBtn1={{
              btnText: "Try it yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctaBtn2={{
              btnText: "Learn more",
              linkTo: "/login",
              active: false,
            }}
            codeBlock={`<!DOCTYPE html>
 <html lang="en">
<head>
<title>This is myPage</title>
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav> 
<a href="/one">One</a> 
<a href="/two">Two</a> 
</nav>
</body>`}
            codeColor={"text-crimsonRed-50"}
            backgroundGradient={"codeblock1"}
          />
        </div>

        {/* Code 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighlightText text="coding in seconds" />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctaBtn1={{
              btnText: "Continue Lesson",
              linkTo: "/signup",
              active: true,
            }}
            ctaBtn2={{
              btnText: "Learn more",
              linkTo: "/login",
              active: false,
            }}
            codeBlock={`import React from "react";
 import CTAButton from "./Button";
import TypeAnimation from "react-type";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
    return (
    <div>Home</div>
    );
    }
    export default Home`}
            codeColor={"text-blue-5"}
            backgroundGradient={"codeblock2"}
          />
        </div>

        {/* Tabs Section */}
        <ExploreMore />
      </div>
      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-rich-black-700">
        <div className="homepage-bg h-[333px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 my-10 text-white">
              <CTAButton linkTo={"/catalog"} active={true}>
                <div className="flex items-center gap-3">
                  Explore full catalog <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton linkTo={"/login"} active={false}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row justify-between gap-5 mb-10 mt-20">
            <div className="w-[45%] text-4xl font-semibold">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="w-[40%] flex flex-col gap-10 items-start">
              <p className="text-base">
                The modern BrainBox is the dictates its own terms. Today, to be
                a competitive specialist requires more than professional skills.
              </p>
              <CTAButton linkTo={"/signup"} active={true}>
                Learn More
              </CTAButton>
            </div>
          </div>
          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>
      {/* Section 3 */}
      <div className="w-11/12 max-w-maxContent flex flex-col gap-7 items-center py-10 text-white mx-auto">
        <div className="w-full my-12">
          <InstructorSection />
        </div>
      </div>
      {/* Section Slider */}
      <section className="my-7">
        <div className="text-rich-black-5 w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center">
          <h2 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
          </h2>
          {/* Reviews Slider */}
          <ReviewSlider />
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
