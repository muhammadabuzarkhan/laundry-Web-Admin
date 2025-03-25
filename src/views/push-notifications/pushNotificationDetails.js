import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Popover,
  Layout,
  Avatar,
  message,
  Table,
  Select,
  Image,
  Modal,
  DatePicker,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { UPLOADS_URL, NOTIFICATION } from "../../config/constants";
// import { CiCalendarDate } from "react-icons/ci";
import { IoIosTime } from "react-icons/io";
import { BsCalendarDateFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Notifications from ".";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function NotificationDetails() {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (id) {
      getNotificationDetails();
    }
  }, []);

  const getNotificationDetails = async () => {
    setLoading(true);
    const { data } = await Get(
      `${NOTIFICATION.getNotificationById}${id}`,
      token
    );
    console.log(data, "notifications");
    setNotification(data);
    setLoading(false);
  };

  // const addNotification = async () => {
  //   try {
  //     const response = await Post(
  //       NOTIFICATION.getNotificationById,
  //       notification,
  //       token
  //     );
  //     console.log(response, "response");
  //     if (response.status === 200) {
  //       message.success("Notification Created Successfully");
  //       navigate(-1);
  //     }

  //     console.log(response);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaArrowLeft
              style={{ fontWeight: "bold", fontSize: "20px", color: "black" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageName" style={{ margin: 0 }}>
              VIEW NOTIFICATION DETAILS
            </h1>
          </Col>
        </Row>
        <br />

        {id && (
          <>
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                <Skeleton active paragraph={{ rows: 10 }} />
              </div>
            )}

            {!loading && notification && (
              <>
                <Row style={{ padding: "20px" }}>
                  <Col xs={24} md={16}>
                  <Row style={{ padding: "10px" }}>
                      <Col xs={24} md={12}>
                        <h5
                          style={{
                            // display: "block",
                            display: "flex",
                            alignItems: "center",
                            fontSize: 16,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          <BsCalendarDateFill
                            size={20}
                            style={{ marginRight: "5px", color: "#838383" }}
                          />
                          <span>
                            {dayjs(notification?.createdAt).format(
                              "ddd D MMMM, YYYY"
                            )}
                          </span>
                          <IoIosTime size={25} style={{ marginLeft: "20px", marginRight: "5px", color: "#838383" }} />
                          <span>
                            {dayjs(notification?.createdAt).format("hh:mm A")}
                          </span>
                        </h5>
                      </Col>
                    </Row>
                    <Row style={{ padding: "10px" }}>
                      <Col xs={24} md={12}>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "black",
                          }}
                        >
                          Notification Title{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {notification?.title}
                        </h5>
                      </Col>
                    </Row>
                    <Row style={{ padding: "10px" }}>
                      <Col xs={24} md={12}>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "black",
                          }}
                        >
                          Notification Type{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {notification?.notificationType}
                        </h5>
                      </Col>
                    </Row>
                    <Row style={{ padding: "10px" }}>
                      <Col xs={24} md={12}>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "black",
                          }}
                        >
                          Notification Message{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {notification?.body}
                        </h5>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            )}
          </>
        )}

        <br />
        <br />
      </div>

      <br />
      <br />
    </Layout>
  );
}
export default NotificationDetails;
