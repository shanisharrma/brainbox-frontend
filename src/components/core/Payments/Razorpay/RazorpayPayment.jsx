import toast from "react-hot-toast";
import {
  createOrderPayment,
  verifyPayment,
} from "../../../../services/operations/paymentAPI";
import { ACCOUNT_TYPE } from "../../../../utils/constants";
import { useDispatch } from "react-redux";
import { navigate } from "../../../../hooks/setNavigate";
import rzpLogo from "../assets/Logo/logo-white.png";
import { useState } from "react";
import { IconBtn } from "../../../common";

/* eslint-disable react/prop-types */
const RazorpayPayment = ({
  user,
  token,
  setConfirmationModal,
  courseIds,
  provider,
  totalAmount,
}) => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const buyCourse = async () => {
    if (
      user &&
      user.roles.some((role) => role.role === ACCOUNT_TYPE.INSTRUCTOR)
    ) {
      toast.error("Instructor can't buy own course");
      return;
    }

    if (token) {
      setIsProcessing(true);
      try {
        const response = await createOrderPayment(token, provider, courseIds);

        if (!response) {
          return;
        }

        const { id, amount, currency } = response.data;

        // * Step-2: Initialize razorpay payment gateway
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          currency: currency,
          amount: amount,
          order_id: id,
          name: "BrainBox",
          description: "Thank You for Purchasing the Course",
          image: rzpLogo,
          prefill: {
            name: `${user.firstName + " " + user.lastName}`,
            email: user.email,
          },
          handler: function (response) {
            // * Step-5: Verify payment from backend
            verifyPayment(
              { ...response, courseIds, provider },
              token,
              dispatch
            );
          },
        };

        //   * Step-4: Start the payment
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Razorpay Payment error:", error);
      } finally {
        setIsProcessing(false);
      }
    } else {
      setConfirmationModal({
        text1: "Your are not logged in!",
        text2: "Please login to purchase this course.",
        btn1Text: "Login",
        btn2Text: "Back",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };
  return (
    <div>
      <IconBtn
        disabled={isProcessing}
        text={isProcessing ? "Processing..." : `Pay ₹ ${totalAmount}`}
        customClasses="w-full my-8"
        onclick={buyCourse}
      />
    </div>
  );
};

export default RazorpayPayment;
