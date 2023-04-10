import Profile from "../profile";
import React from "react";
import WalletDetails from "../../../components/wallet";
import { AuthContext } from "../../../context/auth";
import { useState, useContext } from "react";
import SubscriberLayout from "../../../components/layout/SubsLayout";

const User = () => {
    const [auth, setAuth] = useContext(AuthContext);

    const userId = auth?.user?._id;
    return (
        <SubscriberLayout>
            
        <WalletDetails userId={userId} />
            <Profile />
       <div style={{ display: 'flex', justifyContent: 'center' }}>
     

         
       
   
          
      
    </div>
        </SubscriberLayout>
    
    );
    };

export default User;