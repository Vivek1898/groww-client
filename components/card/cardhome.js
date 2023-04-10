// import { Button, Image, Typography, Space } from 'antd';
// import React from 'react';

// const { Text } = Typography;

// const Card = ({name,planCompleteTime, amount, profitPerDay,totalProfit, checkoutHandler ,id}) => {
//     const dynamicDescription = () => {
//         if (name === "BASIC") {
//           return "5 exclusice stocks";
//         } else if (name === "STANDARD") {
//           return "10 exclusice stocks";
//         } else if (name === "PREMIUM") {
//           return "20 exclusice stocks";
//         }
//       };
    
//       const buttonStyle = () => {
//         return name === "BASIC" ? "btn-outline-danger" : "btn-danger";
//       };
    
//       const headerStyle = () => {
//         return name === "Basic" ? "black" : "header";
//       };
    
//       const borderStyle = () => {
//         return name === "PREMIUM" ? "border-danger" : " ";
//       };
    
//       const buttonText = () => {
//         return state && state.token ? "Buy the plan" : "Sign up";
//       };
//   return (
//     // <Space direction="vertical" align="center">
//     //   <Image src={img} width={64} height={64} preview={false} />
//     //   <Text>₹{amount}</Text>
//     //   <Button onClick={() => checkoutHandler(amount)}>Buy Now</Button>
//     // </Space>

    
// <div class="columns">
//   <ul class="price">
//     <li  className={`card-header py-3 ${headerStyle()}`}>{name}</li>
//     <li  className="grey"> Investment - ₹ {amount} </li>
//     <li>Profit ₹ {profitPerDay}/day</li>
//     <li>Total {planCompleteTime}</li>
//     <li>Total Profit ₹ {totalProfit}</li>
//     <li class="grey"><Button onClick={() => checkoutHandler(amount,name,planCompleteTime, profitPerDay,totalProfit,id )}>Buy Now</Button></li>
//   </ul>
// </div>

//   );
// };

// export default Card;



import { Button, Card, Col, Row, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const PlanCard = ({ name, planCompleteTime, amount, profitPerDay, totalProfit, checkoutHandler, id,walletBalance }) => {
  const dynamicDescription = () => {
    if (name === "BASIC") {
      return "5 exclusive stocks";
    } else if (name === "STANDARD") {
      return "10 exclusive stocks";
    } else if (name === "PREMIUM") {
      return "20 exclusive stocks";
    }
  };

  const buttonStyle = () => {
    return name === "BASIC" ? "btn-outline-danger" : "btn-danger";
  };

  const headerStyle = () => {
    return name === "Basic" ? "black" : "header";
  };

  const borderStyle = () => {
    return name === "PREMIUM" ? "border-danger" : " ";
  };

  const buttonText = () => {
    return state && state.token ? "Buy the plan" : "Sign up";
  };

  return (
    <Col xs={24} sm={12} md={8} className="plan-card">
      <Card title={name} className="plan-card-content">
        <ul className="price">
          <li className="gg">Investment - ₹ {amount}</li>
          <li>Profit ₹ {profitPerDay}/day</li>
          <li>Total {planCompleteTime} Days</li>
          <li>Total Profit ₹ {totalProfit}</li>
          <li className="gg">
            <Button type="primary" onClick={() => checkoutHandler(amount, name, planCompleteTime, profitPerDay, totalProfit, id,walletBalance)}>
              {/* {walletBalance >= amount ? "Access Plan" : "Buy Now"} */} Buy Now
            </Button>
          </li>
        </ul>
      </Card>
    </Col>
  );
};


export default PlanCard;