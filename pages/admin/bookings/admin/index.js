import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Form, Input,Tag } from "antd";
import axios from "axios";
import { AuthContext } from "../../../../context/auth";
import AdminLayout from "../../../../components/layout/AdminLayout";
import { SearchOutlined } from "@ant-design/icons";

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [BookingIdToCancel, setBookingIdToCancel] = useState(null);
  const userId = auth?.user?._id;
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "razorpay_payment_id",
      key: "razorpay_payment_id",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        dataIndex,
        dataSource,
      }) => {
        // Check if there are any non-empty razorpay_payment_id values in the dataSource
        const hasPaymentIds = bookings.some((record) => record.razorpay_payment_id);
    
        // Only display the search box if there are payment IDs
        if (!hasPaymentIds) {
          return null;
        }
    
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        const paymentId = record?.razorpay_payment_id;
        return paymentId && paymentId.toLowerCase().includes(value.toLowerCase());
      },
      render: (value) => {
        return value ? value : "Through wallet";
      },
    },
    {
      title: "User Email",
      dataIndex: ["user", "email"],
      key: "user.email",
    
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.user.email.indexOf(value) === 0,

         filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
          <Button
            onClick={() => {
              confirm();
            }}
            type="primary"
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
            }}
            type="danger"
          >
            Reset
          </Button>
        </>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) => {
      return record.user.email.toLowerCase().includes(value.toLowerCase());
    },
  
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
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },

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
        const { data } = await axios.get(
          `/bookings/admin/all`
        );
        console.log(data.payments);
        setBookings(data.payments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, [userId,showCancelForm]);

  return (
    <AdminLayout>
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

      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </AdminLayout>
  );
};

export default Admin;
