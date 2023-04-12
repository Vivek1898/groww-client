import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Form, Input, Tag, Select, Option } from "antd";

import axios from "axios";
import { AuthContext } from "../../../context/auth";
import AdminLayout from "../../../components/layout/AdminLayout";
import toast from "react-hot-toast";
import SubscriberLayout from "../../../components/layout/SubsLayout";

const Refund = () => {
  const [refund, setRefund] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [BookingIdToCancel, setBookingIdToCancel] = useState(null);
  const userId = auth?.user?._id;
  const [form] = Form.useForm();

  const columns = [

    
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Mobile",
        dataIndex: "mobile",
        key: "mobile",
      },


    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
        title: "Upi",
        dataIndex: "upi",
        key: "upi",
      },
      {
        title: "Bank Name",
        dataIndex: "bankName",
        key: "bankName",
      },
      {
        title: "Account Number",
        dataIndex: "accountNumber",
        key: "accountNumber",
      },
      {
        title: "IFSC Code",
        dataIndex: "ifscCode",
        key: "ifscCode",
      },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status, record) => {
          let tagColor;
          switch (status.toLowerCase()) {
            case "pending":
              tagColor = "orange";
              break;
            case "approved":
              tagColor = "green";
              break;
            case "rejected":
              tagColor = "red";
              break;
            default:
              tagColor = "gray";
              break;
          }
          return <Tag color={tagColor}>{status}</Tag>;
        },
      },

   
    
  ];




 
  

  useEffect(() => {
    const fetchRefund = async () => {
      try {
        const { data } = await axios.get(
          `/refund/get/user/${userId}`
        );
       
        setRefund(data.refund);
      } catch (error) {
        console.error(error);
        toast.error("Server Error");
      }
    };

    fetchRefund();
  }, [userId,showCancelForm]);

  return (
    <SubscriberLayout>
      

      <Table
        dataSource={refund}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </SubscriberLayout>
  );
};

export default Refund;
