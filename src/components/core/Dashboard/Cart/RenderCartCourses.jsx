import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../store/slices/cartSlice";
import { RatingStars } from "../../../common";
import { getAverageRating } from "../../../../utils/utilityFunctions";
import { Link } from "react-router-dom";

const RenderCartCourses = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col flex-1 ">
      {cartItems.map((item, index) => (
        <Link
          to={`/course/${item.id}`}
          key={index}
          className={`flex flex-wrap items-start justify-between gap-6 w-full mb-6 ${
            index !== cartItems.length - 1 &&
            "border-b border-b-rich-black-100 pb-6"
          }`}
        >
          <div className="flex flex-col flex-1 gap-4 xl:flex-grow">
            <img
              src={item.thumbnail}
              alt={item.name}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-medium text-rich-black-5">{item.name}</p>
            <p className="text-sm text-rich-black-100">
              {item.courseCategory.name}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-crimsonRed-25">
                {getAverageRating(item.ratings)}
              </p>
              <RatingStars
                reviewCount={getAverageRating(item.ratings)}
                starSize={20}
              />
              <span className="text-rich-black-100">
                {item?.ratings?.length} Ratings
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="flex items-center gap-x-1 rounded-md border border-rich-black-100 bg-rich-black-300 py-2 p-3 text-crimsonRed-5"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-crimsonRed-50">
              Rs. {item.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RenderCartCourses;
