import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Form, Input,Tag, Spin } from "antd";
import axios from "axios";
import { AuthContext } from "../../../context/auth";
import AdminLayout from "../../../components/layout/AdminLayout";
import { LoadingOutlined, SearchOutlined, UpCircleOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
const UpdateWallet = () => {
  const [bookings, setBookings] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [userIdToUpdate, setuserIdToUpdate] = useState(null);
  const[profitToUpdate,setprofitToUpdate]=useState(0)
  const[paymentIdToUpdate,setpaymentIdToUpdate]=useState(0)
  const userId = auth?.user?._id;
  
  const [loading, setLoading] = useState(false);

  const uniqueEmails = new Set(bookings.map((b) => b.user.email));
  console.log(uniqueEmails)
  const emailFilters = Array.from(uniqueEmails).map((email) => ({
    text: email,
    value: email,
  }));

  const uniquePlanName= new Set(bookings.map((b) => b.plan.name));

  const planNameFilters = Array.from(uniquePlanName).map((planName) => ({
    text: planName,
    value: planName,
  }));
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
    },
    {
        title: "User Email",
        dataIndex: ["user", "email"],
        key: "user.email",
        filters: emailFilters,
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
    // {
    //   title: "Amount",
    //   dataIndex: "amount",
    //   key: "amount",
    // },
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
    {
      title: "Plan Expiry",
      dataIndex: "planExpiryDate",
      key: "planExpiryDate"
    },
    {
      title: " Expiry Status",
      dataIndex: "planExpiryDate",
      key: "planExpiryDate",
      render: (planExpiryDate) => {
        const expiryDate = new Date(planExpiryDate);
        const currentDate = new Date();
        if (currentDate > expiryDate) {
          return <Tag color="orange">Expired</Tag>;
        } else {
          // Use a date formatting library to format the date
          return <Tag color="green">Active</Tag>;
        }
      }
    },
    // {
    //   title:"Last Updated",
    //   dataIndex:"updatedAt",
    //   key:"updatedAt",
    //   render:(updatedAt)=>new Date(updatedAt).toLocaleDateString()
    
    // },
//     {
//         title: "Days Left",
//         dataIndex: "planExpiryDate",
//         key: "daysLeft",
//         render: (exDate) => {
//             console.log(typeof(exDate))
//             const exx= exDate
//             const [day, month, year] = new Date(exx).toLocaleDateString().split("/");
//             const expiry = new Date(`${year}-${month}-${day}`);
//             console.log(`Day: ${day}`);
// console.log(`Month: ${month}`);
// console.log(`Year: ${year}`);
//           //const expiry = new Date(exDate);
//           console.log(expiry)
//           const today = new Date();
//           console.log(today)
//           const diffTime = expiry.getTime() - today.getTime();
//           const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//           if (diffDays < 0) {
//             return <Tag color="red">Expired</Tag>;
//           } else if (diffDays === 0) {
//             return <Tag color="orange">Expiring Today</Tag>;
//           } else {
//             return <Tag color="green">{diffDays} days left</Tag>;
//           }
//         },
//       },
 

     
    {
      title: "Plan Name",
      dataIndex: ["plan", "name"],
      key: "plan.name",
      filters: planNameFilters,
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.plan.name.indexOf(value) === 0,
    },
    {
      title: "Plan Investment",
      dataIndex: ["plan", "planAmount"],
      key: "plan.planAmount",
      sorter: (a, b) => a.plan.planAmount - b.plan.planAmount,
    },
    {
      title: "Profit/Day",
      dataIndex: ["plan", "planProfit"],
      key: "plan.planProfit",
    },
    {
      title: "Actions",
      dataIndex: ["user", "_id"],
      key: "userId",
      render: (_id, record) => (
       
        <Button onClick={() =>{
            handleCancelBooking(_id,record.planprofitPerDay,record._id)
        }} disabled={record.status === "cancelled"}>
          Update
        </Button>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
    
    },
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

  const handleCancelBooking = (id,planam ,paymentId) => {
    // alert(id)
    // alert(planam)
    // return;
    setpaymentIdToUpdate(paymentId);
    setprofitToUpdate(planam)
    setuserIdToUpdate(id);
    setShowCancelForm(true);
  };

  const handleCancel = () => {
    setShowCancelForm(false);
  };
const [isLoading, setIsLoading] = useState(false);
  const handleSubmitCancelBooking = async (values) => {
    // alert(userIdToUpdate)
  
    try {
      setIsLoading(true);
      
      await axios.post(`/refund/${userIdToUpdate}/update`, {
        // email: values.email,
        // reason: values.reason,
        amount:profitToUpdate,
        paymentId:paymentIdToUpdate
        
      });
      toast.success("Wallet Updated successfully!");
      // alert("Booking cancelled successfully!");
      setIsLoading(false);
      setShowCancelForm(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/bookings/update/wallet/${userId}`
        );
        console.log(data.payments);
        setBookings(data.payments);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchBookings();
  }, [userId,showCancelForm,isLoading]);

  return (
    <AdminLayout>
      <Modal
        visible={showCancelForm}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form name="cancelBooking" onFinish={handleSubmitCancelBooking} hideRequiredMark>
          {/* <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Reason for cancellation" name="reason" rules={[{ required: true }]}>
            <Input />
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={isLoading ? <LoadingOutlined/>:<UpCircleOutlined/>}>
              Update  Wallet
            </Button>
            <Button onClick={handleCancel}    >Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
<Spin spinning={loading}>


      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
      </Spin>
    </AdminLayout>
  );
};

export default UpdateWallet;
