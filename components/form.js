import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CancelBookingForm = ({ showCancelForm,email,reason, onCancel ,handleSubmitCancelBooking,setEmail,setReason,setShowCancelForm }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setEmail('');
    setReason('');
    console.log(values.email)
    console.log(email)
    console.log('Cancel booking form values:', values);
    // TODO: Send email and reason to cancel booking
    setEmail(values.email);
    setReason(values.reason);
    

    form.resetFields();
    onCancel();
  };
  useEffect(() => {
    handleSubmitCancelBooking();
  }, [email,reason]);

  return (
    <Modal title="Cancel Booking" visible={showCancelForm} onCancel={onCancel} footer={null}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email',
            },
            {
              type: 'email',
              message: 'Please enter a valid email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Reason"
          name="reason"
          rules={[
            {
              required: true,
              message: 'Please enter a reason for cancellation',
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CancelBookingForm;