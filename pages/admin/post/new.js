import { Layout } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import axios from "axios";
const { Content, Sider } = Layout;
import { Row, Col } from "antd";
import Card from "../../../components/card/card";
function NewPost() {

  const checkoutHandler = async (amount) => {

    const { data: { key } } = await axios.get("http://www.localhost:8000/api/getkey")

    const { data: { order } } = await axios.post("http://localhost:8000/api/checkout", {
        amount
    })

    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Razorpay",
        description: "RazorPay",
        image: "",
        order_id: order.id,
        callback_url: "http://localhost:8000/api/paymentverification",
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
}

  return (
    <AdminLayout>
      <h1>Create new post</h1>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col>
        <Card amount={5000} img={"https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"} checkoutHandler={checkoutHandler} />
      </Col>
      <Col>
        <Card amount={3000} img={"http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"} checkoutHandler={checkoutHandler} />
      </Col>
    </Row>
    </AdminLayout>
  );
}

export default NewPost;
