import { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Checkbox ,Select} from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Typography } from "antd";
import toast from "react-hot-toast";
import AdminLayout from "../../../components/layout/AdminLayout";

import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const { Title } = Typography;

const Manual = () => {
  // context
 
  // hooks
  const router = useRouter();
  // state
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const onFinish = async (values) => {
    console.log(selectedPlanId)
 console.table(values);

    try {
      setLoading(true);
      const { data } = await axios.post(`/manual`, {values,selectedPlanId});
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      
      }
    } catch (err) {
      toast.error("Signup failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

 
  
  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      const { data } = await axios.get("/plans/get");
      console.log(data);
      setPlans(data.plan);
      setLoading(false);
    };
  
    fetchPlans();
  }, []);


  const planOptions = plans.map((plan) => ({
    label: plan.name,
    value: plan._id,
  }));

  return (
    <AdminLayout>
    <Row>
      <div style={{ margin: 'auto' }}>
          <h1>Groww Cash</h1>
         
          </div>
      <Col span={12} offset={6} style={{ paddingTop: "10%" }}>
        <Title>Manual Add User To Plan</Title>

        <Form onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name!",
              },
            ]}
            hasFeedback
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            hasFeedback
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                min: 6,
                max: 24,
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/* <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item> */}

<Form.Item>
      <Select
        placeholder="Select a plan"
        value={selectedPlanId}
        options={planOptions}
        onChange={(value) => setSelectedPlanId(value)}
      />
    </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
             Add User
            </Button>
            
          </Form.Item>
        </Form>
      </Col>
    </Row>
    </AdminLayout>
  );
};

export default Manual;
