import Profile from "../profile";
import React from "react";
import WalletDetails from "../../../components/wallet";
import { AuthContext } from "../../../context/auth";
import { useState, useContext } from "react";
import SubscriberLayout from "../../../components/layout/SubsLayout";
import AdminLayout from "../../../components/layout/AdminLayout";
const User = () => {
    const [auth, setAuth] = useContext(AuthContext);

    const userId = auth?.user?._id;
    return (
        <AdminLayout>
        <WalletDetails userId={userId} />
            <Profile />
       <div style={{ display: 'flex', justifyContent: 'center' }}>
     

         
       
   
          
      
    </div>
        </AdminLayout>
    
    );
    };

export default User;