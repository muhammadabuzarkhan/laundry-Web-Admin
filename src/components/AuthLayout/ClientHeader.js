import React, { useState } from "react";
import { Image, Badge, Avatar, Dropdown, Popover, Alert } from "antd";
import { MdMenu } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { FaBars, FaEllipsisV, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Layout, Row, Col, Button } from "antd";
import { FiBell } from "react-icons/fi";
import { ImageUrl } from "../../config/functions";

const { Header } = Layout;

const dropdownItemStyle = {
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  padding: "5px 12px",
};

const iconStyle = { fontSize: "16px" };

const contentHeaderStyle = {
  padding: "12px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const alertStyle = {
  fontSize: "12px",
  padding: "2px 10px",
  color: "green",
};

const separatorStyle = {
  borderLeft: "none",
  borderBottom: "none",
  borderRight: "none",
  borderTop: "1px solid rgb(0 0 0 / 15%)",
};

const notificationContainerStyle = {
  height: "250px",
  overflow: "auto",
};

const notificationItemStyle = {
  padding: 10,
};

const notificationRowStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
};

const notificationIconStyle = {
  padding: "10px",
  width: "35px",
  display: "flex",
  backgroundColor: "black",
  borderRadius: "5px",
};

const bellIconStyle = {
  fontSize: "16px",
  margin: 0,
  color: "white",
};

const viewAllStyle = {
  padding: "12px 20px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
};

const desktopHeaderStyle = {
  height: "10vh",
  backgroundColor: "black",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "25px 60px",
};

const headerIconsStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const userNameStyle = {
  marginLeft: 10,
  fontSize: "16px",
};

const mobileHeaderStyle = {
  height: "10vh",
  backgroundColor: "black",
  display: "flex",
  alignItems: "center",
  padding: "15px 35px",
};

const mobileRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};

const mobileIconStyle = {
  fontSize: 22,
  color: "#000000",
};

const items = [
  {
    key: "1",
    label: (
      <div className="headerDropdown" style={dropdownItemStyle}>
        <FaUser style={iconStyle} /> &nbsp; My Profile
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div style={dropdownItemStyle}>
        <FaSignOutAlt style={iconStyle} /> &nbsp; Logout
      </div>
    ),
  },
];

const ClientHeader = ({ visible, setVisible, visible2, setVisible2 }) => {
  const [notifications, setNotifications] = useState([]);

  const content = (
    <div style={{ width: "350px" }}>
      <div style={contentHeaderStyle}>
        <h3>Notifications</h3>
        <Alert message={`${notifications.length} New`} type="success" style={alertStyle} />
      </div>
      <hr style={separatorStyle} />
      <div style={notificationContainerStyle}>
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} style={notificationItemStyle}>
              <Row style={notificationRowStyle}>
                <Col xs={3}>
                  <div style={notificationIconStyle}>
                    <FiBell style={bellIconStyle} />
                  </div>
                </Col>
                <Col xs={20}>
                  <h6 className="notificationHeading">{notification.title}</h6>
                  <p className="notificationText">{notification.message}</p>
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <p style={{ padding: "10px", textAlign: "center" }}>No new notifications</p>
        )}
      </div>
      <hr style={separatorStyle} />
      <div style={viewAllStyle}>
        <Button type="link">View All</Button>
      </div>
    </div>
  );

  return (
    <>
      <Row>
        <Col xs={0} md={24}>
          <Header style={desktopHeaderStyle}>
            <Image src={ImageUrl("logo.jpg")} alt="logo" width={140} height={50} preview={false} />
            <div style={headerIconsStyle}>
              <Popover content={content} placement="bottomRight" arrow={false} className="headerPopover">
                <Badge count={notifications.length} style={{ backgroundColor: "#000000" }}>
                  <FiBell style={{ fontSize: "25px" }} />
                </Badge>
              </Popover>
              &emsp; &emsp;
              <Avatar size={40} src={ImageUrl("avatar.png")} />
              <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
                <p style={userNameStyle}>Masooma Albert <AiFillCaretDown fontSize={12} /></p>
              </Dropdown>
            </div>
          </Header>
        </Col>
      </Row>

      <Row>
        <Col xs={24} md={0}>
          <Header style={mobileHeaderStyle}>
            <Row style={mobileRowStyle}>
              <Col>
                <FaEllipsisV style={mobileIconStyle} onClick={() => setVisible2(!visible2)} />
              </Col>
              <Col>
                <Image preview={false} alt="logo" src={ImageUrl("logo.jpg")} style={{ maxWidth: 120 }} />
              </Col>
              <Col>
                <FaBars style={mobileIconStyle} onClick={() => setVisible(!visible)} />
              </Col>
            </Row>
          </Header>
        </Col>
      </Row>
    </>
  );
};

export default ClientHeader;