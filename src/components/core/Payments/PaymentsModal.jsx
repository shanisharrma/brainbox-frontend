/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import brainBoxLogo from "@/assets/Logo/brainbox.svg";
import stripeLogo from "@/assets/Logo/stripe.png";
import razorpayLogo from "@/assets/Logo/razorpay.png";
import { useSelector } from "react-redux";
import { IconBtn } from "../../common";
import StripePaymentForm from "./Stripe/StripePaymentForm";
import StripeWrapper from "./Stripe/StripeWrapper";

const PaymentsModal = ({ setPaymentsModal, setConfirmationModal, items }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [paymentProvider, setPaymentProvider] = useState("stripe");
  const [paymentMethod, setPaymentMethod] = useState("");

  let courseIds = [];
  let totalAmount = 0;
  items.forEach((item) => {
    totalAmount += item.price;
    courseIds.push(item.id);
  });

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[960px] rounded-lg border border-rich-black-300 bg-rich-black-500">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-rich-black-300 p-5">
          <p className="text-xl font-semibold text-rich-black-5">
            <img src={brainBoxLogo} alt="BrainBox" width={120} />
          </p>
          <button onClick={() => setPaymentsModal(false)}>
            <RxCross2 className="text-2xl text-rich-black-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 w-full flex gap-x-5 items-start justify-between">
          {/* payment part */}
          <div className="w-[60%]">
            {!paymentMethod ? (
              <div>
                {user && (
                  <div className="border-b border-b-rich-black-200 space-y-1 pb-2">
                    <p className="text-xs text-rich-black-100">Account</p>
                    <p className="text-base text-rich-black-5">{user.email}</p>
                  </div>
                )}

                {/* Payment Method and Provider */}
                <div className="my-6">
                  <h4 className="text-rich-black-5 flex flex-col text-2xl gap-y-1">
                    Payment
                    <span className="text-xs text-rich-black-100">
                      All transactions are secure and encrypted.
                    </span>
                  </h4>
                  <div className="my-3">
                    <div
                      onClick={() => setPaymentProvider("stripe")}
                      className={`flex gap-x-2 border border-rich-black-200 p-3 text-rich-black-5 font-medium ${
                        paymentProvider === "stripe" ? "bg-rich-black-200" : ""
                      }`}
                    >
                      <img src={stripeLogo} alt="stripe" className="h-6" />
                      Stripe
                    </div>
                    <div
                      onClick={() => setPaymentProvider("razorpay")}
                      className={`flex gap-x-2 border border-rich-black-200 p-3 text-rich-black-5 font-medium ${
                        paymentProvider === "razorpay"
                          ? "bg-rich-black-200"
                          : ""
                      }`}
                    >
                      <img src={razorpayLogo} alt="stripe" className="h-6" />
                      Razorpay
                    </div>
                  </div>
                  <div className="w-full">
                    <IconBtn
                      text="Pay Now"
                      onclick={() => setPaymentMethod(paymentProvider)}
                      customClasses="w-full my-8"
                    />
                  </div>
                </div>
              </div>
            ) : paymentMethod === "stripe" ? (
              <StripeWrapper>
                <StripePaymentForm
                  provider={paymentProvider}
                  token={token}
                  user={user}
                  courseIds={courseIds}
                  setConfirmationModal={setConfirmationModal}
                  totalAmount={totalAmount}
                />
                <IconBtn
                  text="Back"
                  customClasses="text-rich-black-5 bg-rich-black-300"
                  onclick={() => setPaymentMethod("")}
                />
              </StripeWrapper>
            ) : (
              paymentMethod === "razorpay" && (
                <div>
                  Razorpay
                  <IconBtn
                    text="Back"
                    customClasses="text-rich-black-5 bg-rich-black-300"
                    onclick={() => setPaymentMethod("")}
                  />
                </div>
              )
            )}
          </div>

          {/* Total courses and total amount part */}
          <div className="w-[40%] pl-3 border-l border-l-rich-black-200">
            {/* Listing all the selected courses */}
            <div>
              {items &&
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-rich-black-300 rounded-lg p-2 border border-rich-black-200 mb-3"
                  >
                    <div className="w-[80%] flex items-center justify-start gap-x-2">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <p className="text-sm font-medium text-rich-black-5">
                        {item.name}
                      </p>
                    </div>
                    <div className="w-[20%] text-center text-rich-black-5 text-sm">
                      ₹ {item.price}
                    </div>
                  </div>
                ))}
            </div>

            {/* Coupon Discount Form */}
            <div></div>

            {/* Showing the subTotal and total Amount  */}
            <div className="my-4 space-y-2 text-rich-black-5">
              <div className="flex justify-between items-center text-xs">
                <p>Subtotal:</p>
                <p>₹ {totalAmount}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="flex flex-col text-rich-black-5">
                  Total:
                  <span className="text-rich-black-100 text-xs">
                    Inclusive of all taxes
                  </span>
                </p>
                <p>₹ {totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsModal;
