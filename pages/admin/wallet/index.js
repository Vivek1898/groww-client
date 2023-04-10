import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Form, Input,Tag } from "antd";
import axios from 'axios';
import { AuthContext } from '../../../context/auth';
import AdminLayout from '../../../components/layout/AdminLayout';
const WalletDetails = () => {
  const [wallet, setWallet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [CurrentWallet, setCurrenttWallet] = useState(null);
  const userId = auth?.user?._id;

  useEffect(() => {
    const fetchWalletDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/booking/mywallet/all`);
        console.log(response.data.wallets)
        setWallet(response.data.wallets);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchWalletDetails();
  }, [userId]);

  const columns = [
    {
      title: 'Wallet ID',
      dataIndex: ['user', '_id'],
      key: 'user._id',
    },
    {
      title: 'Email ',
      dataIndex: ['user', 'email'],
      key: 'user.email',
    },
    {
      title: 'Invested',
      dataIndex: 'totalBalance',
      key: 'totalBalance',
    },
    {
      title: 'Profit',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Latest Balance',
      dataIndex: 'latestBalance',
      key: 'latestBalance',
    },
    {
      title:"Last Updated",
      dataIndex:"updatedAt",
      key:"updatedAt",
      render:(updatedAt)=>new Date(updatedAt).toLocaleDateString()
    
    }
  ];

  


//   useEffect(() => {
//     const fetchWallet = async () => {
//       try {
//         const walletData = await axios.get(`/current/wallets/${userId}`);
//         setCurrenttWallet(walletData.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchWallet();
//   }, [userId]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!wallet ) {
  //   return <p>Loading....</p>;
  // }

  return (
    <AdminLayout>
    {/* <h1>Wallet Details</h1> */}
    <Table
        dataSource={wallet}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </AdminLayout>
  );
};

export default WalletDetails;