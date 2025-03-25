import React, { useEffect, useLayoutEffect, useState } from "react";
// import Head from "next/head";
// import Image from "next/image";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

// import router from "next/router";
import { Breadcrumb, Layout, Menu, theme, Row, Col, Drawer,Image } from "antd";
import { AiFillCaretDown, AiFillApple } from "react-icons/ai";
import { Badge, Avatar, Dropdown, Popover, Alert, Button } from "antd";
import { FaBars, FaEllipsisV, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { SITE_NAME } from "../../config/constants";
import "../../styles/Home.module.css";
import ClientHeader from "./ClientHeader";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineEventNote } from "react-icons/md";
import { FaFlagUsa } from "react-icons/fa";
import { MdOutlineLeaderboard } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { IoCashOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineVerified,MdDashboard } from "react-icons/md";
import { BsQuestionSquare } from "react-icons/bs";
import { AiOutlineDollar } from "react-icons/ai";
import { PiNotificationBold } from "react-icons/pi";
import { ImageUrl } from "../../config/functions";
import { TbCategoryPlus } from "react-icons/tb";


const { Header, Content, Sider } = Layout;


const sideNavItems = [
  { key: 1, icon: <RxDashboard style={{fontSize:"18px",}}/>, label: "DASHBOARD", path: "/" },
  {
    key: 2,
    icon: <FaRegUser style={{fontSize:"18px"}}/>,
    label: "USERS MANAGEMENT",
    path: "/users",
  },
  {
    key: 3,
    icon: <TbCategoryPlus style={{fontSize:"18px"}}/>,
    label: "CATEGORY MANAGEMENT",
    path: "/categories",
  },
  {
    key: 4,
    icon: <TbCategoryPlus style={{fontSize:"18px"}}/>,
    label: "SUB-CATEGORY MANAGEMENT",
    path: "/subcategories",
  },
  {
    key: 5,
    icon: <TbCategoryPlus style={{fontSize:"18px"}}/>,
    label: "PRODUCT MANAGEMENT",
    path: "/product",
  },
  {
    key: 6,
    icon: <TbCategoryPlus style={{fontSize:"18px"}}/>,
    label: "QUERY MANAGEMENT",
    path: "/query",
  },
  {
    key: 7,
    icon: <TbCategoryPlus style={{fontSize:"18px"}}/>,
    label: "ORDER MANAGEMENT",
    path: "/order",
  },
  {
    key: 8,
    icon: <TbCategoryPlus style={{fontSize:"18px"}}/>,
    label: "COUPEN MANAGEMENT",
    path: "/coupen",
  },
  // {
  //   key: 9,
  //   icon: <TbCategoryPlus style={{fontSize:"18px"}}/>,
  //   label: "REFERAL CODE MANAGEMENT",
  //   path: "/referal",
  // },
  // {
  //   key: 8,
  //   icon: <TbCategoryPlus style={{fontSize:"18px"}}/>,
  //   label: "CONTENT MANAGEMENT",
  //   path: "/categories",
  // },
  // {
  //   key: 4,
  //   icon: <IoCashOutline style={{fontSize:"18px"}}/>,
  //   label: "PAYMENTS",
  //   path: "/payments",
  // },
  // {
  //   key: 5,
  //   icon: <PiNotificationBold style={{fontSize:"18px"}}/>,
  //   label: "PUSH NOTIFICATION",
  //   path: "/pushnotifications",
  // },
  // {
  //   key: 6,
  //   icon: <AiOutlineDollar style={{fontSize:"18px"}}/>,
  //   label: "SUBSCRIPTION MANAGEMENT",
  //   path: "/plans",
  // },

  // {
  //   key: 6,
  //   icon: <FaRegFileAlt style={{fontSize:"18px"}}/>,
  //   label: "Feedbacks",
  //   path: "/feedbacks",
  // },
  // {
  //   key: 7,
  //   icon: <BsEmojiSmile style={{fontSize:"18px"}}/>,
  //   label: "Emotions",
  //   path: "/emotions",
  // },
  // {
  //   key: 8,
  //   icon: <MdOutlineVerified style={{fontSize:"18px"}}/>,
  //   label: "Verification",
  //   path: "/verification",
  // },
]

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
        padding: "10px 18px",
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
                padding: "10px 10px AddState10px 10px",
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
        padding: "10px 18px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button type="link">View All</Button>
    </div>
  </div>
);

const ClientLayout = ({ children, head, }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [selectedItem, setSelectedItem] = useState("1");
  const navigate = useNavigate();
  const path = window.location.pathname;


  useLayoutEffect(() => {
    // get the path and set selected item to key of the path that matches

    const item = sideNavItems.find((item) => item.path == path);
    if (item) {
      setSelectedItem(item.key.toString());
    }else{
      setSelectedItem();
    }
  }, [path]);

  let title = head?.title ? head?.title : "";
  if (title) {
    title = `${SITE_NAME} | ${title}`;
  } else {
    title = SITE_NAME;
  }

  // set the page title
  useEffect(() => {
    document.title = title;
  }, [title]);

  const containerStyle = {
    position: "relative",
    height: 200,
    padding: 48,
    overflow: "hidden",
    textAlign: "center",
  };

  return (
    <Layout style={{ backgroundColor: "#f2f2f2", scrollBehavior: "smooth",height:"100vh" }}>
     
      <ClientHeader
        visible={visible}
        setVisible={setVisible}
        visible2={visible2}
        setVisible2={setVisible2} 
      />

      <Layout style={{ height: "90vh",background:"#f2f2f2" }}>
        <Row
          style={{
            background: "white",
          }}
        >
          <Col xs={0} md={24}>
            <Sider
            collapsible
              width={280}
              style={{
                background: "white",
              }}
              className="mainSider"
            >
              <Menu
                mode="inline"
                selectedKeys={[selectedItem]}
                style={{
                  height: "100%",
                  borderRight: 0,
                  background: "white",
                }}
              >
                {sideNavItems.map((item) => (
                  <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={() => {
                      navigate(item.path);
                      setSelectedItem(item.key.toString());
                    }}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
          </Col>
        </Row>

        <Layout
          style={{
            padding: "30px",
            overflow: "auto",
            backgroundColor: "#f2f2f2",
            position: "relative",
            outline: "none",
          }}
        >
          {visible2 && (
            <div
              style={{
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Row style={{ alignItems: "flex-end" }}>
                <Col xs={24} md={0}>
                  <div
                    style={{
                      backgroundColor: "#000000",
                      padding: "18px",
                      display: "flex",
                      justifyContent: "flex-end",
                      transition: "all 0.5s ease-in-out",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Popover
                        content={content}
                        placement="bottomRight"
                        arrow={false}
                        className="headerPopover"
                      >
                        <Badge count={5} style={{ backgroundColor: "#000000" }}>
                          <FiBell
                            style={{ fontSize: "25px", color: "white" }}
                          />
                        </Badge>
                      </Popover>
                      &emsp; &emsp;
                      <Avatar size={40} src={ImageUrl("avatar.png")} />
                      <Dropdown
                        menu={{
                          items,
                        }}
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <p
                          style={{
                            marginLeft: 10,
                            fontSize: "16px",
                            color: "white",
                          }}
                        >
                          Masooma Albert <AiFillCaretDown fontSize={12} />{" "}
                        </p>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}

          {children}

          <Drawer
            className="drawer"
            
            placement={"left"}
            size={"default"}
            closable={false}
            onClose={() => setVisible(false)}
            visible={visible}
            getContainer={false}
            key={"drawer"}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedItem]}
              style={{
                height: "100%",
                borderRight: 0,
                backgroundColor: "rgb(0,0,0)",
                fontWeight:'bold'
              }}
            >
              {sideNavItems.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  className="menuItem"
                  onClick={() => {
                    navigate(item.path);
                    setSelectedItem(item.key.toString());
                  }}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
