import React, { useState, useEffect } from "react";
import { Menu, Button, Layout } from "antd";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import {
  PieChartOutlined,
  MailOutlined,
  PushpinOutlined,
  CameraOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  BgColorsOutlined,
  UserOutlined,
  CommentOutlined,
  MoneyCollectFilled,
  StarOutlined,
  WalletOutlined,
  MoneyCollectOutlined,
  ProfileOutlined,
  ProfileTwoTone,
  FileAddOutlined,
  UserAddOutlined,
  EnterOutlined,
  TransactionOutlined,
  UpSquareOutlined,
  BookOutlined,
  MoneyCollectTwoTone,
  TranslationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const AdminNav = () => {
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
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        // defaultSelectedKeys={["1"]}
        defaultOpenKeys={["2", "6", "10"]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<StarOutlined />}>
          <Link href="/admin">
            <a className={activeName("/admin")}>Stats</a>
          </Link>
        </Menu.Item>

        {/* posts */}
        {/* <SubMenu key="2" icon={<PushpinOutlined />} title="Posts">
          <Menu.Item key="3">
            <Link href="/admin/posts">
              <a className={activeName("/admin/posts")}>All Posts</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/admin/post/new">
              <a className={activeName("/admin/post/new")}>Add New</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link href="/admin/categories">
              <a className={activeName("/admin/categories")}>Categories</a>
            </Link>
          </Menu.Item>
        </SubMenu> */}

        {/* library */}
        {/* <SubMenu key="6" icon={<CameraOutlined />} title="Media">
          <Menu.Item key="7">
            <Link href="/admin/media/library">
              <a className={activeName("/admin/media/library")}>Library</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link href="/admin/media/new">
              <a className={activeName("/admin/media/new")}>Add New</a>
            </Link>
          </Menu.Item>
        </SubMenu> */}


        {/* comments */}
        <Menu.Item key="2" icon={<WalletOutlined />}>
          <Link href="/admin/wallet">
            <a className={activeName("/admin/wallet")}>Admin Wallet</a>
          </Link>
        </Menu.Item>

        {/* Recharge */}
<Menu.Item key="3" icon={<MoneyCollectOutlined />}>
          <Link href="/admin/recharge">
            <a className={activeName("/admin/recharge")}>Admin Recharge</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ProfileTwoTone />}>
          <Link href="/admin/profile">
            <a className={activeName("/admin/profile")}>Admin Profile</a>
          </Link>
        </Menu.Item>
        

        {/* users */}
        {/* <SubMenu key="10" icon={<UserSwitchOutlined />} title="Users">
          <Menu.Item key="11">
            <Link href="/admin/users">
              <a className={activeName("/admin/users")}>All Users</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link href="/admin/users/new">
              <a className={activeName("/admin/users/new")}>Add New</a>
            </Link>
          </Menu.Item>
        </SubMenu> */}

        {/* profile */}

        <Menu.Item key="6" icon={<UserAddOutlined />}>
          <Link href="/admin/plans">
            <a className={activeName("/admin/plans")}>Admin Create Plans</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<EnterOutlined />}>
          <Link href="/admin/plans/allplans">
            <a className={activeName("/admin/plans/allplans")}>Admin All Plans</a>
          </Link>
        </Menu.Item>
          <Menu.Item key="8" icon={<TransactionOutlined />}>
          <Link href="/admin/refund">
            <a className={activeName("/admin/refund")}>Admin Withdrawl Details</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="21" icon={<TransactionOutlined />}>
          <Link href="/admin/manual">
            <a className={activeName("/admin/manual")}>Manual Add</a>
          </Link>
        </Menu.Item>
       
        <Menu.Item key="10" icon={<UpSquareOutlined />}>
          <Link href="/admin/update">
            <a className={activeName("/admin/update")}>Admin Profit Update</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="11" icon={<BookOutlined />}>
          <Link href="/admin/bookings/admin">
            <a className={activeName("/admin/bookings/admin")}>Admin Bookings</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="12" icon={<WalletOutlined />}>
          <Link href="/admin/wallet/user">
            <a className={activeName("/admin/wallet/user")}>User Wallet</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="13" icon={<EnterOutlined />}>
          <Link href="/admin/plans/user">
            <a className={activeName("/admin/plans/user")}>User Plans</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<MoneyCollectTwoTone />}>
          <Link href="/admin/refund/apply">
            <a className={activeName("/admin/refund/apply")}>User  Apply Withdrawl</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<TranslationOutlined />}>
          <Link href="/admin/bookings">
            <a className={activeName("/admin/bookings")}> User Recharge History</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="19" icon={<TransactionOutlined />}>
          <Link href="/admin/refund/history">
            <a className={activeName("/admin/refund/history")}>User Withdrawl History</a>
          </Link>
        </Menu.Item>

        {/* Customize */}
        {/* <Menu.Item key="14" icon={<BgColorsOutlined />}>
          <Link href="/admin/customize">
            <a className={activeName("/admin/customize")}>Customize</a>
          </Link>
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default AdminNav;
