import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Form, Input, Tag, Select, Option } from "antd";
import axios from 'axios';
import { AuthContext } from '../../../context/auth';
import AdminLayout from '../../../components/layout/AdminLayout';
import toast from "react-hot-toast";
const WalletDetails = () => {
  const [wallet, setWallet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [CurrentWallet, setCurrenttWallet] = useState(null);
  const userId = auth?.user?._id;
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [BookingIdToUpdate, setBookingIdToUpdate] = useState(null);
  const [form] = Form.useForm();
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
  }, [userId,showCancelForm]);

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
    
    },
    {
      title: "Actions",
      dataIndex: "user",
      key: "actions",
      render: (user, record) => (
        <Button onClick={() => handleUpdateWallet(record._id)} disabled={record.status === "approved"}>
         Update
        </Button>
      ),
    },
  ];

  
  const handleUpdateWallet = (id) => {
    setBookingIdToUpdate(id);
    setShowCancelForm(true);
  };

  const handleCancel = () => {
    setShowCancelForm(false);
  };

  const handleSubmitUpdateWallet = async (values) => {
     //alert(BookingIdToUpdate)
     //return
   
       try {
      const data=await axios.post(`/refund/wallet/${BookingIdToUpdate}/update`, {
           amount: values.amount,
          
           
         });
          console.log(data);
          if(data.data.success){
            toast.success("Wallet Updated Successfull!");
            form.resetFields();
            setShowCancelForm(false);
          }else{
            toast.error("Failed to Update Wallet!");
          }
         // alert("Amount Withdraw Successfull!");
   
       } catch (error) {
        toast.error("Failed to Update Wallet!");
         console.error(error);
       }
     };

  return (
    <AdminLayout>
    {/* <h1>Wallet Details</h1> */}
    <Modal
        visible={showCancelForm}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
        form={form}
         name="UpdateWallet" onFinish={handleSubmitUpdateWallet} hideRequiredMark>
        
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Wallet
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>

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