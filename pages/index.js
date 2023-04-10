import { useContext, useEffect,useState } from "react";
import { AuthContext } from "../context/auth";
import AdminLayout from "../components/layout/AdminLayout";
import { Layout, Progress } from "antd";
import axios from "axios";
const { Content, Sider } = Layout;
import { Row, Col } from "antd";
import Card from "../components/card/cardhome";
import Script from 'next/script'
import WalletDetails from "../components/wallet";
import {useRouter} from "next/router";
import toast from "react-hot-toast";
import { Alert, Space, Spin } from 'antd';
function Home() {
  // context
  const Router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);
  const [plans, setPlans] = useState([]);
  const [wallet,setwalletBalance] = useState(0);
  const userId = auth?.user?._id;
  console.log(wallet)
const [loading, setLoading] = useState(false);
  
  const roleBasedLink = () => {
    if (auth?.user?.role === "Admin") {
      return "/admin/bookings";
    } else if (auth?.user?.role === "Author") {
      return "/author";
    } else {
      return "/subscriber/bookings";
    }
  };
  const checkoutHandler = async (amount ,name,planCompleteTime, profitPerDay,totalProfit,id,walletBalance ) => {
    // alert(id);
 // alert(amount);
 setLoading(true);
    const planDelatils ={
      name,
      planCompleteTime,
      profitPerDay,
      totalProfit,
      id,
      amount

    }
    // return
// if(walletBalance < amount){

    const {
      data: { key },
    } = await axios.get("/getkey");
    const {
      data: { order },
    } = await axios.post("/checkout", {
      amount,
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
          setLoading(true);
          const verifyUrl = "/paymentverification";
          const { data } = await axios.post(verifyUrl, {
            response,
            auth,
            BookingData,
            planDelatils
          });
          toast.success("Payment Successful");
          setLoading(false);
         
          Router.push(`${roleBasedLink()}`);
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
        email: "gaurav.kumar@example.com",
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
setLoading(false);

  //}
  // else{
  //   try{
  //     const {data} = axios.post("/addbooking",{auth,planDelatils});
  //     console.log(data)
  //     alert("Plan Booked")
  //   }catch (err){
  //     console.log(err)
  //   }
    
  // }
  };

 
  useEffect  (() => {


    const fetchPlans = async () => {
      setLoading(true);
      const { data } = await axios.get("/plans/get");
      console.log(data);
      setPlans(data.plan);
      setLoading(false);
    };

    fetchPlans();
  }, []);


  // const [loadingProgress, setLoadingProgress] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setLoadingProgress(prevProgress => prevProgress + 20);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);
  const [showLogo, setShowLogo] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogo(false);
    }, 2000);
  
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => prevProgress + 50);
    }, 1000);
  
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);
  

  return (
    
    <div>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />

    {showLogo ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Groww Cash</h1>
          {/* <div style={{ marginBottom: 20 }}>Loading...</div> */}
          <Progress percent={loadingProgress} status="active" />
        </div>
      </div>
    ) : (
      <div>
        {auth.user && <WalletDetails userId={userId} walletBalance={wallet} setwalletBalance={setwalletBalance} />}
        <h1 className="center">Buy Plans</h1>
        <Spin spinning={loading} tip="Hold On :)">
        <Row gutter={[16, 16]} justify="center">
          {plans.map((plan) => (
            <Card
              id={plan._id}
              name={plan.name}
              planCompleteTime={plan.planTime}
              amount={plan.planAmount}
              profitPerDay={plan.planProfit}
              totalProfit={plan.planTotalIncome}
              walletBalance={wallet}
              img={plan.img}
              checkoutHandler={checkoutHandler}
              auth={auth}
            />
          ))}
        </Row>
        </Spin>
      </div>
    )}
  </div>





    // <div>
 
       
// <h2 style= { { "text-align" : "center" }} >Responsive Pricing Tables</h2>
// <p style={ { "text-align" : "center" }}>Resize the browser window to see the effect.</p>

// <div class="columns">
//   <ul class="price">
//     <li class="header">Basic</li>
//     <li class="grey">$ 9.99 / year</li>
//     <li>10GB Storage</li>
//     <li>10 Emails</li>
//     <li>10 Domains</li>
//     <li>1GB Bandwidth</li>
//     <li class="grey"><a href="#" class="button">Sign Up</a></li>
//   </ul>
// </div>

// <div class="columns">
//   <ul class="price">
//     <li class="header" >Pro</li>
//     <li class="grey">$ 24.99 / year</li>
//     <li>25GB Storage</li>
//     <li>25 Emails</li>
//     <li>25 Domains</li>
//     <li>2GB Bandwidth</li>
//     <li class="grey"><a href="#" class="button">Sign Up</a></li>
//   </ul>
// </div>

// <div class="columns">
//   <ul class="price">
//     <li class="header">Premium</li>
//     <li class="grey">$ 49.99 / year</li>
//     <li>50GB Storage</li>
//     <li>50 Emails</li>
//     <li>50 Domains</li>
//     <li>5GB Bandwidth</li>
//     <li class="grey"><a href="#" class="button">Sign Up</a></li>
//   </ul>
// </div>

//     </div>


  );
}

export default Home;
