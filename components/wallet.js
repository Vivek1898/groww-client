import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AdminLayout from '../components/layout/AdminLayout';
import RenderProgress from './progress/RenderProgress';
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
        console.error(err);
        setLoading(false);
      }
    };
    fetchWalletDetails();
  }, [userId]);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!wallet ) {
    return <p>Loading....</p>;
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
      <div>
        {/* <h4>Latest Balance</h4>
        <p className="money minus">₹{wallet.latestBal}</p> */}
         <RenderProgress
            number={wallet.latestBal}
            name="Latest Balance"
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