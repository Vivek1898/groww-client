import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";


const StripeSuccess = ({ history }) => {


  useEffect(() => {
    const getSubscriptionStatus = async () => {
      const { data } = await axios.post("http://localhost:8000/api/paymentverification");
      console.log("SUBSCRIPTION STATUS => ", data);


      return;
      if (data && data.length === 0) {
        history.push("/");
      } else {
        // update user in local storage
        // const auth = JSON.parse(localStorage.getItem("auth"));
        // auth.user = data;
        // localStorage.setItem("auth", JSON.stringify(auth));
        // update user in context
        // setState(auth);
        // setTimeout(() => {
        //   history.push("/account");
        // }, 1000);
      }
    };

    getSubscriptionStatus();
  }, []);

  return (
    <div
      className="d-flex justify-content-center fw-bold"
      style={{ height: "90vh" }}
    >
      <div className="d-flex align-items-center">
        <SyncOutlined spin style={{ fontSize: "50px" }} />
      </div>
    </div>
  );
};

export default StripeSuccess;