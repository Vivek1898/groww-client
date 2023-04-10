import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useState, useContext } from 'react';
import SubscriberLayout from '../../components/layout/SubsLayout';
import { AuthContext } from '../../context/auth';
import { Card, Row, Col } from 'antd';
import Wallet from "./wallet/user"
const Profile = () => {
  const [auth, setAuth] = useContext(AuthContext);

  return (
   
   <Wallet />
    
  );
};

export default Profile;
