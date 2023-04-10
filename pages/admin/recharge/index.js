import AdminLayout from "../../../components/layout/AdminLayout";
import SubscriberLayout from "../../../components/layout/SubsLayout";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/auth";
import { Input,Button } from "antd";
const Recharge = () => {
  const [recharge, setRecharge] = useState(0);
  const [auth, setAuth] = useContext(AuthContext);
  const handleRecharge = async () => {
    const {
      data: { key },
    } = await axios.get("/getkey");
    const {
      data: { order },
    } = await axios.post("/checkout", {
      amount: recharge,
    });

    const BookingData = {
      razorpay_order_id: order.id,
      razorpay_payment_id: order.id,
      amount: order.amount,
    };

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Razorpay",
      description: "RazorPay",
      image: "",
      order_id: order.id,
      handler: async (response) => {
        try {
          const verifyUrl = "/paymentverification";
          const { data } = await axios.post(verifyUrl, {
            response,
            BookingData,
            auth
          });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },

      prefill: {
        name: "Gaurav Kumar",
        email: " gv@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
      modal: {
        ondismiss: function () {
          console.log("Modal has been dismissed");
        },
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
    setRecharge(0);
  };

  return (
    <AdminLayout>
        <div class ="flex">
        <Input
      style={{width:"auto"}}
        type="number"
        size="large"
        value={recharge}
        onChange={(e) => setRecharge(e.target.value)}
      />
      <Button size="large" onClick={handleRecharge}>Recharge</Button>
        </div>
     
    </AdminLayout>
  );
};

export default Recharge;
