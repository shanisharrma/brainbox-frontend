/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { navigate } from "../../../../hooks/setNavigate";
import {
  createOrderPayment,
  verifyPayment,
} from "../../../../services/operations/paymentAPI";
import toast from "react-hot-toast";
import { IconBtn } from "../../../common";
import { useDispatch } from "react-redux";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#f2f2f2",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#E63946",
      iconColor: "#E63946",
    },
  },
};

const StripePaymentForm = ({
  courseIds,
  provider,
  setConfirmationModal,
  token,
  user,
  totalAmount,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleBuyCourse = async (event) => {
    event.preventDefault();

    if (token) {
      setIsProcessing(true);
      setErrorMessage("");
      try {
        //   * Step-1: create Order payment
        const response = await createOrderPayment(token, provider, courseIds);
        // ** extract response data
        const { id, clientSecret } = response;

        // * step-2: Confirm card payment
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
              phone: user.phoneNumber.internationalNumber,
            },
          },
        });

        //   * Step-3: Verify Payment
        if (result.error) {
          setErrorMessage(result.error.message);
          toast.error(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            await verifyPayment(
              {
                provider,
                paymentId: result.paymentIntent.id,
                orderId: id,
                courseIds,
              },
              token,
              dispatch
            );
          }
        }
      } catch (error) {
        console.error("error making payment", error);
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
    <div className="w-full">
      <h3 className="text-rich-black-5 text-xl font-semibold">
        Pay with stripe
      </h3>
      <form onSubmit={handleBuyCourse} className="my-6">
        <CardElement
          options={CARD_ELEMENT_OPTIONS}
          className="p-4 border border-rich-black-200"
        />
        <span className="text-[10px] text-rich-black-100">
          Please use this card number 4000 0035 6000 0008 and random expiry and
          CVV
        </span>
        {errorMessage && <div>{errorMessage}</div>}
        <IconBtn
          disabled={isProcessing}
          text={isProcessing ? "Processing..." : `Pay ₹ ${totalAmount}`}
          customClasses="w-full my-8"
        />
      </form>
    </div>
  );
};

export default StripePaymentForm;
