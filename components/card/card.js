import { Button, Image, Typography, Space } from 'antd';
import React from 'react';

const { Text } = Typography;

const Card = ({ amount, img, checkoutHandler }) => {
  return (
    <Space direction="vertical" align="center">
      <Image src={img} width={64} height={64} preview={false} />
      <Text>₹{amount}</Text>
      <Button onClick={() => checkoutHandler(amount)}>Buy Now</Button>
    </Space>
  );
};

export default Card;
