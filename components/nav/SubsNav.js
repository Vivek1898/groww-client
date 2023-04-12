// import React, { useState, useEffect, useContext } from "react";
// import { Menu, Layout } from "antd";
// import Link from "next/link";
// import { useWindowWidth } from "@react-hook/window-size";
// import { AuthContext } from "../../context/auth";
// import {
//   SettingOutlined,
//   UserOutlined,
//   CommentOutlined,
//   WalletFilled,
//   EnterOutlined,
//   TransactionOutlined,
//   ProfileOutlined,
//   MoneyCollectFilled,
//   MoneyCollectOutlined,
//   WalletOutlined,
// } from "@ant-design/icons";

// const { SubMenu } = Menu;
// const { Sider } = Layout;

// const SubscriberNav = () => {
//   // context
//   const [auth, setAuth] = useContext(AuthContext);
//   // state
//   const [collapsed, setCollapsed] = useState(false);
//   const [current, setCurrent] = useState("");
//   // hooks
//   const onlyWidth = useWindowWidth();

//   useEffect(() => {
//     process.browser && setCurrent(window.location.pathname);
//   }, [process.browser && window.location.pathname]);

//   useEffect(() => {
//     if (onlyWidth < 800) {
//       setCollapsed(true);
//     } else if (onlyWidth > 800) {
//       setCollapsed(false);
//     }
//   }, [onlyWidth < 800]);

//   const activeName = (name) => `${current === name && "active"}`;

//   return (
//     <Sider
//       collapsible
//       collapsed={collapsed}
//       onCollapse={() => setCollapsed(!collapsed)}
//     >
//         <Menu
//         // defaultSelectedKeys={["1"]}
//         defaultOpenKeys={["2", "6", "10"]}
//         mode="inline"
//         inlineCollapsed={collapsed}
//       >
    


//         <Menu.Item key="4" icon={<ProfileOutlined />}>
//           <Link href="/subscriber/profile/user">
//             <a className={activeName("/subscriber/profile/user")}>Profile</a>
//           </Link>
//         </Menu.Item>
        
//         <Menu.Item key="5" icon={<TransactionOutlined />}>
//           <Link href="/subscriber/bookings">
//             <a className={activeName("/subscriber/bookings")}>Recharge History</a>
//           </Link>
//         </Menu.Item>
       
       
       
//           <Menu.Item key="9" icon={<MoneyCollectOutlined />}>
//           <Link href="/subscriber/refund/apply">
//             <a className={activeName("/subscriber/refund/apply")}>Apply Withdrawl</a>
//           </Link>
//         </Menu.Item>
        
//         <Menu.Item key="19" icon={<TransactionOutlined />}>
//           <Link href="/subscriber/refund/history">
//             <a className={activeName("/subscriber/refund/history")}>Withdrawl History</a>
//           </Link>
//         </Menu.Item>
     
       
//         <Menu.Item key="12" icon={<WalletOutlined />}>
//           <Link href="/subscriber/wallet/user">
//             <a className={activeName("/subscriber/wallet/user")}>User Wallet</a>
//           </Link>
//         </Menu.Item>
//         <Menu.Item key="13" icon={<EnterOutlined />}>
//           <Link href="/subscriber/plans/user">
//             <a className={activeName("/subscriber/plans/user")}>User Plans</a>
//           </Link>
//         </Menu.Item>

//       </Menu>
//     </Sider>
//   );
// };

// export default SubscriberNav;

import React, { useState, useEffect, useContext } from "react";
import { Tabs, Layout } from "antd";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import { AuthContext } from "../../context/auth";
import {
  SettingOutlined,
  UserOutlined,
  CommentOutlined,
  WalletFilled,
  EnterOutlined,
  TransactionOutlined,
  ProfileOutlined,
  MoneyCollectFilled,
  MoneyCollectOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Sider } = Layout;

const SubscriberNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  // hooks
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth > 800) {
      setCollapsed(false);
    }
  }, [onlyWidth < 800]);

  const activeName = (name) => `${current === name && "active"}`;

  return (
    
      <Tabs
      centered
        defaultActiveKey="1"
        activeKey={current}
        onChange={(key) => setCurrent(key)}
       
      >
        {/* <TabPane
          key="/subscriber/dashboard"
          tab={
            <Link href="/subscriber/dashboard">
              <a>
                <UserOutlined />
                <span>Dashboard</span>
              </a>
            </Link>
          }
        /> */}
           <TabPane
          key="/subscriber"
          tab={
            <Link href="/subscriber">
              <a>
                <ProfileOutlined />
                <span>Home</span>
              </a>
            </Link>
          }
        />

        <TabPane
          key="/subscriber/profile/user"
          tab={
            <Link href="/subscriber/profile/user">
              <a>
                <ProfileOutlined />
                <span>Profile</span>
              </a>
            </Link>
          }
        />

        <TabPane
          key="/subscriber/bookings"
          tab={
            <Link href="/subscriber/bookings">
              <a>
                <TransactionOutlined />
                <span>Recharge History</span>
              </a>
            </Link>
          }
        />

        <TabPane
          key="/subscriber/refund/apply"
          tab={
            <Link href="/subscriber/refund/apply">
              <a>
                <MoneyCollectOutlined />
                <span>Apply Withdrawl</span>
              </a>
            </Link>
          }
        />

        <TabPane
          key="/subscriber/refund/history"
          tab={
            <Link href="/subscriber/refund/history">
              <a>
                <TransactionOutlined />
                <span>Withdrawl History</span>
              </a>
            </Link>
          }
        />

        <TabPane
          key="/subscriber/wallet/user"
          tab={
            <Link href="/subscriber/wallet/user">
              <a>
                <WalletOutlined />
                <span>User Wallet</span>
              </a>
            </Link>
          }
        />

        <TabPane
          key="/subscriber/plans/user"
          tab={
            <Link href="/subscriber/plans/user">
              <a>
                <EnterOutlined />
                <span>User Plans</span>
              </a>
            </Link>
          }
        />
      </Tabs>

  );
};

export default SubscriberNav;

