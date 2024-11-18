import { useSelector } from "react-redux";
import { IconBtn } from "../../../common";

const RenderTotalAmount = () => {
  const [cartItems] = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    const courses = cartItems.map((course) => course.id);
    console.log("Bought these courses: ", courses);
    // TODO: API integrate --> payment gateway
  };

  let totalAmount = 0;
  totalAmount += cartItems.map((item) => item.price);
  return (
    <div>
      <p>Total:</p>
      <p>Rs {totalAmount}</p>
      <IconBtn
        text={"Buy Now"}
        onclick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  );
};

export default RenderTotalAmount;
