import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <div>
      <h2 className="mb-14 text-3xl font-medium text-rich-black-5">
        Your Cart
      </h2>

      <p className="border-b border-b-rich-black-400 pb-2 font-semibold text-rich-black-400">
        {totalItems} Courses in Cart
      </p>
      {totalItems > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-rich-black-100">
          Your cart is empty
        </p>
      )}
    </div>
  );
};

export default Cart;
