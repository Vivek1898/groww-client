import React from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { useState, useContext } from 'react';
import SubscriberLayout from '../../../components/layout/SubsLayout';
import { AuthContext } from '../../../context/auth';
import { Card, Row, Col } from 'antd';

const Profile = () => {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <AdminLayout>
      <h1 style={{ textAlign: 'center' }}>Profile</h1>

      <Row justify="center">
        <Col xs={24} sm={18} md={12} lg={8} xl={6}>
          <Card title={`Name: ${auth?.user?.name}`} className="plan-card-content">
            <p>Email: {auth?.user?.email}</p>
            {/* <p>Phone: {auth?.user?.phone}</p> */}
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Profile;
