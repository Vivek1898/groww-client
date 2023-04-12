import { List } from 'antd';
import { Row, Col, Card } from 'antd';
import {
  UserOutlined,
  ProfileOutlined,
  TransactionOutlined,
  MoneyCollectOutlined,
  WalletOutlined,
  EnterOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import SubscriberLayout from '../../components/layout/SubsLayout';

const HomeScreen = () => {
  const data = [
    {
      key: '1',
      icon: <UserOutlined />,
      title: 'Home',
      link: '/subscriber'
    },
    {
      key: '2',
      icon: <ProfileOutlined />,
      title: 'Profile',
      link: '/subscriber/profile/user'
    },
    {
      key: '3',
      icon: <TransactionOutlined />,
      title: 'Recharge History',
      link: '/subscriber/bookings'
    },
    {
      key: '4',
      icon: <MoneyCollectOutlined />,
      title: 'Apply Withdrawal',
      link: '/subscriber/refund/apply'
    },
    {
      key: '5',
      icon: <TransactionOutlined />,
      title: 'Withdrawal History',
      link: '/subscriber/refund/history'
    },
    {
      key: '6',
      icon: <WalletOutlined />,
      title: 'User Wallet',
      link: '/subscriber/wallet/user'
    },
    {
      key: '7',
      icon: <EnterOutlined />,
      title: 'User Plans',
      link: '/subscriber/plans/user'
    }
  ];

  return (
    <SubscriberLayout>
  {/* <List
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Link href={item.link}>
            <a>
              {item.icon}
              <span>{item.title}</span>
            </a>
          </Link>
        </List.Item>
      )}
    /> */}
    <Row gutter={[16, 16]}>
      {data.map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} key={item.key}>
          <Link href={item.link}>
            <a>
            <Card hoverable >
  <Card.Meta
    avatar={item.icon}
    description={item.title}
    align="center"
  />
</Card>

            </a>
          </Link>
        </Col>
      ))}
    </Row>
    </SubscriberLayout>
  
  );
};

export default HomeScreen;
