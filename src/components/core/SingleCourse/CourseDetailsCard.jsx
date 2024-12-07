/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { navigate } from "../../../hooks/setNavigate";
import { IconBtn } from "../../common";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";

const CourseDetailsCard = ({ course, handleAddToCart, handleBuyCourse }) => {
  const { user } = useSelector((state) => state.profile);
  const { cartItems } = useSelector((state) => state.cart);

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied.");
  };

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-md p-4 bg-rich-black-500 text-rich-black-25">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="max-h-[300px] min-h-[180px] w-[400px]overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <p className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {course.price}
          </p>
          <div className="flex flex-col gap-4">
            <IconBtn
              text={
                user &&
                course.students.some((student) => student.id === user.id)
                  ? "Go To Course"
                  : "Buy Now"
              }
              onclick={
                user &&
                course.students.some((student) => student.id === user.id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : () => handleBuyCourse()
              }
            />
            {(!user ||
              !course.students.some((student) => student.id === user.id)) && (
              <IconBtn
                text={
                  cartItems.some((item) => item.id === course.id)
                    ? "Added To Cart"
                    : "Add To Cart"
                }
                onclick={handleAddToCart}
                customClasses="bg-rich-black-200 text-rich-black-5"
              />
            )}
          </div>

          <div>
            <p className="pb-3 pt-6 text-center text-sm text-rich-black-5">
              30-Day Money Back Guarantee
            </p>
          </div>

          <div>
            <p className="text-xl my-2 font-semibold">This course includes:</p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-50">
              {course.requirements.split(",").map((item, i) => (
                <p className="flex gap-2" key={i}>
                  <BsFillCaretRightFill />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              className="mx-auto flex items-center pag-2 py-6 text-crimsonRed-100"
              onClick={handleShare}
            >
              <FaShareSquare size={16} />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
