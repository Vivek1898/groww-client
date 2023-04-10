import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Form, Input,Tag,Spin } from "antd";
import axios from "axios";
import { AuthContext } from "../../../context/auth";
import AdminLayout from "../../../components/layout/AdminLayout";
import SubscriberLayout from "../../../components/layout/SubsLayout";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [BookingIdToCancel, setBookingIdToCancel] = useState(null);
  const userId = auth?.user?._id;
  const[loading,setLoading]=useState(false)
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "razorpay_payment_id",
      key: "razorpay_payment_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    // {
    //   title: "Time",
    //   dataIndex: "time",
    //   key: "time",
    // },

    // {
    //     title: "Actions",
    //     dataIndex: "razorpay_payment_id",
    //     key: "actions",
    //     render: (razorpay_payment_id, record) => (
    //       <Button onClick={() => handleCancelBooking(razorpay_payment_id)} disabled={record.status === "cancelled"}>
    //         Cancel
    //       </Button>
    //     ),
    //   },
    {
        title: "status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <>
            {status === "booked" ? (
              <Tag color="green">CONFIRMED</Tag>
            ) : (
              <Tag color="red">CANCELLED</Tag>
            )}
          </>
        ),
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
    alert(BookingIdToCancel)
  
    try {
      await axios.post(`/booking/${BookingIdToCancel}/cancel`, {
        email: values.email,
        reason: values.reason,
        
      });
      alert("Booking cancelled successfully!");
      setShowCancelForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(
          `/bookings/${userId}`
        );
        //console.log(data.payments);
        setBookings(data.payments);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
      }
    };

    fetchBookings();
  }, [userId,showCancelForm]);

  return (
    <SubscriberLayout>
      <h1>User Bookings</h1>
      <br></br>
      <Modal
        visible={showCancelForm}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form name="cancelBooking" onFinish={handleSubmitCancelBooking} hideRequiredMark>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Reason for cancellation" name="reason" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cancel booking
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
<Spin spinning={loading} tip="Loading...">
      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
      </Spin>
    </SubscriberLayout>
  );
};

export default Bookings;
