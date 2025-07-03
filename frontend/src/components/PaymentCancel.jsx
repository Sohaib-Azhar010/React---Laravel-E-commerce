// PaymentCancel.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const PaymentCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast("Payment canceled.");
    navigate("/checkout");
  }, []);

  return null;
};

export default PaymentCancel;
