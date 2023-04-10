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

  const handleCancelBooking = (id) => {
    setBookingIdToCancel(id);
    setShowCancelForm(true);
  };

  const handleCancel = () => {
    setShowCancelForm(false);
  };

  const handleSubmitCancelBooking = async (values) => {
 //   alert(BookingIdToCancel)
  

    try {
      await axios.post(`/refund/${BookingIdToCancel}/cancel`, {
        amount: values.amount,
       
        
      });
      // alert("Amount Withdraw Successfull!");
      toast.success("Amount Withdraw Successfull!");
      form.resetFields();
      setShowCancelForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (refundId, value) => {
    try {
      await axios.put(`/refund/status/${refundId}`, { status: value });
      toast.success('Refund status updated successfully');
      // Update the refund status in the local state
      const updatedRefund = refund.map((item) =>
        item._id === refundId ? { ...item, status: value } : item
      );
      setRefund(updatedRefund);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    const fetchRefund = async () => {
      try {
        const { data } = await axios.get(
          `/refund/get/user/${userId}`
        );
       
        setRefund(data.refund);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRefund();
  }, [userId,showCancelForm]);

  return (
    <AdminLayout>
      <Modal
        visible={showCancelForm}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
        form={form}
         name="cancelBooking" onFinish={handleSubmitCancelBooking} hideRequiredMark>
        
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Withdraw booking
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={refund}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </AdminLayout>
  );
};

export default Refund;
