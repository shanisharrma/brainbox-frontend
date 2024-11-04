import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {
  CodeBlocks,
  CTAButton,
  HighlightText,
} from "../components/core/HomePage";
import Banner from "../assets/Images/banner.mp4";

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
          <CTAButton>Book a Demo</CTAButton>
        </div>

        <div className="shadow-[10px_-5px_50px_-5px] shadow-blue-500 mx-3 my-12">
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
      </div>
      {/* Section 2 */}
      {/* Section 3 */}
      {/* Section 4 */}
      {/* Footer */}
    </div>
  );
};

export default Home;
