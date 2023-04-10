import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Form, Input,Tag } from "antd";
import axios from "axios";
import { AuthContext } from  "../../../../context/auth";
import AdminLayout from "../../../../components/layout/AdminLayout";
import { SearchOutlined } from "@ant-design/icons";
import SubscriberLayout from "../../../../components/layout/SubsLayout";
const UpdateWallet = () => {
  const [bookings, setBookings] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);

  const userId = auth?.user?._id;

  

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
        if (currentDate < expiryDate) {
          return <Tag color="orange">Expired</Tag>;
        } else {
          // Use a date formatting library to format the date
          return <Tag color="green">Active</Tag>;
        }
      }
    },
    {
      title:"Last Updated",
      dataIndex:"updatedAt",
      key:"updatedAt",
      render:(updatedAt)=>new Date(updatedAt).toLocaleDateString()
    
    },
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

  

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          `/bookings/user/wallet/plans/${userId}`
        );
        console.log(data.payments);
        setBookings(data.payments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <SubscriberLayout>
   <br></br>
   <h1 style={{ textAlign: 'center' }}>User Plans</h1>

      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
       <br></br>
    </SubscriberLayout>
  );
};

export default UpdateWallet;
