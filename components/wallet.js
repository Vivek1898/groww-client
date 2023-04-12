import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AdminLayout from '../components/layout/AdminLayout';
import RenderProgress from './progress/RenderProgress';
import { Spin } from 'antd';
import toast from 'react-hot-toast';
const WalletDetails = ( {userId,walletBalance,setwalletBalance}) => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  const [CurrentWallet, setCurrenttWallet] = useState(null);


  useEffect(() => {
    const fetchWalletDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/bookings/wallets/${userId}`);
        console.log(response.data)
        setWallet(response.data);
        setwalletBalance(response.data.latestBal)
        setLoading(false);
      } catch (err) {
        // toast.error('Server Error');
        console.error(err);
        setLoading(false);
      }
    };
    fetchWalletDetails();
  }, [userId]);


if (loading || !wallet) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin />
    </div>
  );
}

  return (
    <div>

<div className="inc-exp-container">
      <div>
        {/* <h4>Profit</h4> */}
        {/* <p className="money minus">₹{wallet.balance}</p> */}
        <RenderProgress
            number={wallet.balance}
            name="Profit"
            link="/admin/posts"
          />
      </div>
      <div>
        {/* <h4>Invested</h4>
        <p className="money plus">₹{wallet.sum}</p> */}
         <RenderProgress
            number={`${wallet.sum}`}
            name="Invested"
            link="/admin/posts"
          />
      </div>
      <div >
        {/* <h4>Latest Balance</h4>
        <p className="money minus">₹{wallet.latestBal}</p> */}
         <RenderProgress
         
            number={wallet.latestBal}
            name="Wallet"
            link="/admin/posts"
          />
      </div>
    </div>
      {/* <h2>Wallet Details</h2>
      <p>User ID: {wallet.userId}</p>
      <p>Invested: {wallet.sum}</p>
      <p>Profit: {wallet.balance}</p> */}
    </div>
  );
};

export default WalletDetails;