import React, { useEffect, useState } from "react";
// import Head from "next/head";
// import Image from "next/image";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Row, Col, Drawer,Image } from "antd";
import { AiFillCaretDown, AiFillApple } from "react-icons/ai";
import { Badge, Avatar, Dropdown, Popover, Alert, Button } from "antd";
import { FaBars, FaEllipsisV, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { SITE_NAME } from "../../config/constants";
// import "../../styles/Home.module.css";
import ClientHeader from "./ClientHeader";
import { ImageUrl } from "../../config/functions";
const { Header, Content, Sider } = Layout;

const sideNavItems = [
  { key: 1, icon: ImageUrl("dside-icon/1.png"), label: "Dashboard", path: "/" },
  {
    key: 2,
    icon: ImageUrl("dside-icon/2.png"),
    label: "User Management",
    path: "/user-management",
  },
  {
    key: 3,
    icon: ImageUrl("dside-icon/3.png"),
    label: "Service Provider Management",
    path: "/service-provider-management",
  },
  {
    key: 4,
    icon: ImageUrl("dside-icon/4.png"),
    label: "Sport Managementsssssssssssss",
    path: "/category-management",
  },
  {
    key: 5,
    icon: ImageUrl("dside-icon/5.png"),
    label: "Feedback Management",
    path: "/feedback-management",
  },
  {
    key: 6,
    icon: ImageUrl("dside-icon/6.png"),
    label: "Subscription Management",
    path: "/subscription-management",
  },
  {
    key: 7,
    icon: ImageUrl("dside-icon/7.png"),
    label: "Payment Logs",
    path: "/payment-logs",
  },
  {
    key: 8,
    icon: ImageUrl("dside-icon/8.png"),
    label: "Notifications",
    path: "/notifications",
  },
  {
    key: 9,
    icon: ImageUrl("dside-icon/9.png"),
    label: "Booking and Payment Details",
    path: "/booking-and-payment-details",
  },
  {
    key: 10,
    icon: ImageUrl("dside-icon/3.png"),
    label: "Queries Management",
    path: "/queries-management",
  },
  {
    key: 11,
    icon: ImageUrl("dside-icon/4.png"),
    label: "Article Category Management",
    path: "/article-category-management",
  },
  {
    key: 12,
    icon: ImageUrl("dside-icon/5.png"),
    label: "Article Management",
    path: "/article-management",
  },
  {
    key: 13,
    icon: ImageUrl("dside-icon/6.png"),
    label: "Learning Video Management",
    path: "/learning-video-management",
  },
].map((item, index) => {
  return {
    key: item.key,
    icon: (
      <Image
        src={item.icon}
        alt="Picture of the author"
        preview={false}
        width={17}
        height={18}
      />
    ),
    label: item.label,
    path: item.path,
  };
});

const items = [
  {
    key: "1",
    label: (
      <div
        className="headerDropdown"
        style={{
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          padding: "5px 12px",

        }}
      >
        <FaUser style={{ fontSize: "16px" }} /> &nbsp; My Profile
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div
        style={{
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          padding: "5px 12px",
        }}
      >
        <FaSignOutAlt style={{ fontSize: "16px" }} />
        &nbsp; Logout
      </div>
    ),
  },
];

const content = (
  <div style={{ width: "350px" }}>
    <div
      style={{
          padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        
      }}
    >
      <h3>Notifications</h3>
      <Alert
        message="5 New"
        type="success"
        style={{ fontSize: "12px", padding: "2px 10px", color: "green" }}
      />
    </div>
    <hr
      style={{
        borderLeft: "none",
        borderBottom: "none",
        borderRight: "none",
        borderTop: "1px solid rgb(0 0 0 / 15%)",
      }}
    />
    <div style={{ height: "250px", overflow: "auto" }}>
      <div style={{ padding: 10 }}>
        <Row style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Col xs={3}>
            <div
              style={{
                padding: "10px 10px 10px 10px",
                width: "35px",
                display: "flex",
                backgroundColor: "#000000",
                borderRadius: "5px",
              }}
            >
              <FiBell style={{ fontSize: "16px", margin: 0, color: "white" }} />
            </div>
          </Col>
          <Col xs={20}>
            <h6 class="notificationHeading">
              Lorem Ipsum is simply dummy text
            </h6>
            <p class="notificationText">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
              veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
              illo delectus.
            </p>
          </Col>
        </Row>
      </div>

      <div style={{ padding: 10 }}>
        <Row style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Col xs={3}>
            <div
              style={{
                padding: "10px 10px 10px 10px",
                width: "35px",
                display: "flex",
                backgroundColor: "#000000",
                borderRadius: "5px",
              }}
            >
              <FiBell style={{ fontSize: "16px", margin: 0, color: "white" }} />
            </div>
          </Col>
          <Col xs={20}>
            <h6 class="notificationHeading">
              Lorem Ipsum is simply dummy text
            </h6>
            <p class="notificationText">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
              veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
              illo delectus.
            </p>
          </Col>
        </Row>
      </div>

      <div style={{ padding: 10 }}>
        <Row style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Col xs={3}>
            <div
              style={{
                padding: "10px 10px 10px 10px",
                width: "35px",
                display: "flex",
                backgroundColor: "#000000",
                borderRadius: "5px",
              }}
            >
              <FiBell style={{ fontSize: "16px", margin: 0, color: "white" }} />
            </div>
          </Col>
          <Col xs={20}>
            <h6 class="notificationHeading">
              Lorem Ipsum is simply dummy text
            </h6>
            <p class="notificationText">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
              veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
              illo delectus.
            </p>
          </Col>
        </Row>
      </div>
    </div>

    <hr
      style={{
        borderLeft: "none",
        borderBottom: "none",
        borderRight: "none",
        borderTop: "1px solid rgb(0 0 0 / 15%)",
      }}
    />

    <div
      style={{
          padding: "12px 20px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button type="link">View All</Button>
    </div>
  </div>
);

const ClientLayout = ({ children, head }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [selectedItem, setSelectedItem] = useState("1");

  useEffect(() => {
    // get the path and set selected item to key of the path that matches
    const path = window.location.pathname;
    const item = sideNavItems.find((item) => item.path == path);
    if (item) {
      setSelectedItem(item.key.toString());
    }
  }, []);

  let title = head?.title ? head?.title : "";
  if (title) {
    title = `${SITE_NAME} | ${title}`;
  } else {
    title = SITE_NAME;
  }

  const containerStyle = {
    position: "relative",
    height: 200,
    padding: 48,
    overflow: "hidden",
    textAlign: "center",
  };



  return (
    <Layout style={{ backgroundColor: "white", scrollBehavior: "smooth" }}>
     
     <Layout style={{ height: "100vh" }}>
       
     {children}
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
