import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../store/slices/cartSlice";

const RenderCartCourses = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div>
      {cartItems.map((item, index) => (
        <div key={index}>
          <div>
            <img src={item.thumbnail} alt={item.name} />
          </div>
          <div>
            <p>{item.name}</p>
            <p>{item.category.name}</p>
            <div>
              <p>{item.ratings.review}</p>
              <ReactStars
                count={5}
                value={item?.ratingAndReviews?.length}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaStar />}
                fullIcon={<FaStar />}
              />
              <span className="text-rich-black-400">
                {item?.ratings?.length} Ratings
              </span>
            </div>
          </div>
          <div>
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p>{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
