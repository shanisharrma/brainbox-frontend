import { useSelector } from "react-redux";
import { ConfirmationModal, IconBtn } from "../../../common";
import { useState } from "react";
import PaymentsModal from "../../Payments/PaymentsModal";

const RenderTotalAmount = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [paymentsModal, setPaymentsModal] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  let totalAmount = 0;
  cartItems.forEach((item) => {
    totalAmount += item.price;
  });
  return (
    <>
      <div className="min-w-[280px] rounded-md border border-rich-black-300 bg-rich-black-800 p-6">
        <p className="mb-1 text-sm font-medium text-rich-black-100">Total:</p>
        <p className="mb-6 text-3xl font-medium text-crimsonRed-50">
          ₹ {totalAmount}
        </p>
        <IconBtn
          text={"Buy Now"}
          onclick={() => setPaymentsModal(true)}
          customClasses={"w-full justify-center"}
        />
      </div>
      {paymentsModal && (
        <PaymentsModal
          setPaymentsModal={setPaymentsModal}
          items={cartItems}
          setConfirmationModal={setConfirmationModal}
        />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default RenderTotalAmount;
