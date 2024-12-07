import { ConfirmationModal, IconBtn, RatingStars } from "../components/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { getPublicSingleCourse } from "../services/operations/courseAPI";
import {
  formatDate,
  formatDuration,
  getAverageRating,
} from "../utils/utilityFunctions";
import { navigate } from "../hooks/setNavigate";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import CourseDetailsCard from "../components/core/SingleCourse/CourseDetailsCard";
import { addToCart } from "../store/slices/cartSlice";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../utils/constants";
import CourseAccordionBar from "../components/core/SingleCourse/CourseAccordionBar";
import PaymentsModal from "../components/core/Payments/PaymentsModal";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [paymentsModal, setPaymentsModal] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [singleCourseData, setSingleCourseData] = useState(null);
  const [isActive, setIsActive] = useState([]);

  useEffect(() => {
    const getSingleCourseDetails = async () => {
      const result = await getPublicSingleCourse(courseId);
      setSingleCourseData(result);
    };
    getSingleCourseDetails();
  }, [courseId]);

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const reviewCount = getAverageRating(singleCourseData?.ratings);
    setAvgReviewCount(reviewCount);
    let lectures = 0;
    let lectureDuration = 0;
    singleCourseData?.sections.forEach((section) => {
      lectures += section.subSections.length || 0;
      section.subSections.forEach((subSection) => {
        lectureDuration += Number(subSection.duration);
      });
    });
    setTotalDuration(lectureDuration);
    setTotalNoOfLectures(lectures);
  }, [singleCourseData]);

  const handleAddToCart = () => {
    if (
      user &&
      user.roles.some((role) => role.role === ACCOUNT_TYPE.INSTRUCTOR)
    ) {
      toast.error("Instructor can't buy own course");
      return;
    }
    if (token) {
      if (cartItems.some((item) => item.id === singleCourseData.id)) {
        toast.error("Course already in cart.");
      } else {
        dispatch(addToCart(singleCourseData));
        toast.success("Course Added To Cart");
      }
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleBuyCourse = () => {
    if (
      user &&
      user.roles.some((role) => role.role === ACCOUNT_TYPE.INSTRUCTOR)
    ) {
      toast.error("Instructor can't buy own course");
      return;
    }
    if (token) {
      setPaymentsModal(true);
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((active) => active !== id)
    );
  };

  if (loading || !singleCourseData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={`relative w-full bg-rich-black-300`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:max-w-[90%] xl:max-w-maxContent lg:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={singleCourseData.thumbnail}
                alt={singleCourseData.name}
                className="aspect-auto object-contain w-full h-[30rem]"
              />
            </div>
            <div className="z-30 flex flex-col justify-center gap-4 py-5 my-5 text-lg text-rich-black-5">
              <div>
                <h2 className="text-4xl font-bold text-rich-black-5 sm:text-[42px]">
                  {singleCourseData.name}
                </h2>
              </div>
              <p className="text-rich-black-100">
                {singleCourseData.description}
              </p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-crimsonRed-25">{`${avgReviewCount}`}</span>
                <RatingStars reviewCount={avgReviewCount} starSize={24} />
                <span>{`(${singleCourseData.ratings.length} Ratings)`}</span>
                <span>{`${singleCourseData.students.length} Students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Course Created By:{" "}
                  {`${singleCourseData.instructor.firstName} ${singleCourseData.instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BiInfoCircle />
                  Created At {formatDate(singleCourseData.createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt />
                  English
                </p>
              </div>
              <div className="flex flex-col w-full gap-4 border-y border-y-rich-black-100 py-4 lg:hidden">
                <p className="space-x-4 pb-4 text-3xl font-semibold text-rich-black-5">
                  Rs. {singleCourseData.price}
                </p>
                <IconBtn
                  text={
                    user &&
                    singleCourseData.students.some(
                      (student) => student.id === user.id
                    )
                      ? "Go To Course"
                      : "Buy Now"
                  }
                  onclick={
                    user &&
                    singleCourseData.students.some(
                      (student) => student.id === user.id
                    )
                      ? () => navigate("/dashboard/enrolled-courses")
                      : handleBuyCourse
                  }
                />
                {(!user ||
                  !singleCourseData.students.some(
                    (student) => student.id === user.id
                  )) && (
                  <IconBtn
                    text={
                      cartItems.some((item) => item.id === singleCourseData.id)
                        ? "Added To Cart"
                        : "Add To Cart"
                    }
                    onclick={handleAddToCart}
                    customClasses="bg-rich-black-200 text-rich-black-5"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Course Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              course={singleCourseData}
              handleAddToCart={handleAddToCart}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="mx-auto box-content px-4 text-start text-rich-black-5 lg:max-w-[90%] xl:max-w-maxContent">
          <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
            {/* What You Will Learn */}
            <div className="my-8 border border-rich-black-300 p-8">
              <h3 className="text-3xl font-semibold">What You Will Learn:</h3>
              <div className="mt-5">
                <ReactMarkdown>
                  {singleCourseData.whatYouWillLearn}
                </ReactMarkdown>
              </div>
            </div>

            {/* Course Content Section */}
            <div className="max-w-[830px] ">
              <div className="flex flex-col gap-3">
                <p className="text-[28px] font-semibold">Course Content</p>
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex gap-2">
                    <span>
                      {singleCourseData.sections.length} {`section(s)`}
                    </span>
                    <span>
                      {totalNoOfLectures} {`lecture(s)`}
                    </span>
                    <span>{formatDuration(totalDuration)} total length</span>
                  </div>
                  <div>
                    <button
                      className="text-crimsonRed-25"
                      onClick={() => setIsActive([])}
                    >
                      Collapse all sections
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content Accordion */}
            <div className="py-4">
              {singleCourseData.sections.map((section, index) => (
                <CourseAccordionBar
                  section={section}
                  handleActive={handleActive}
                  isActive={isActive}
                  key={index}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <h4 className="text-2xl font-semibold">Author</h4>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={singleCourseData.instructor.profileDetails.imageUrl}
                  alt={singleCourseData.instructor.firstName}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${singleCourseData.instructor.firstName} ${singleCourseData.instructor.lastName}`}</p>
              </div>
              <p className="text-rich-black-50">
                {singleCourseData.instructor.profileDetails.about}
              </p>
            </div>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      {paymentsModal && (
        <PaymentsModal
          setPaymentsModal={setPaymentsModal}
          items={[singleCourseData]}
          setConfirmationModal={setConfirmationModal}
        />
      )}
    </>
  );
};

export default CourseDetails;
