import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  TextArea,
  Button,
  Popover,
  Layout,
  Avatar,
  Tabs,
  Table,
  Select,
  Image,
  Modal,
  Skeleton,
  InputNumber,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import {
  UPLOADS_URL,
  PLANS,
  CONTENT_TYPE,
  EVE,
  PLANSNT,
  NOTIFICATION,
} from "../../config/constants";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";

import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { ImageUrl } from "../../config/functions";

function AddNotification() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((plan) => plan.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const bodyNotification = {
        ...values,
        type: "PUSH"
      }
      const response = await Post(
        NOTIFICATION.sendPushNotification,
        bodyNotification,
        token
      )
      setLoading(false);
      console.log(response, "response");
      if (response) {
        swal(response?.message);
        message.success("Push notifications sent successfully");
        navigate('/pushnotifications');
      } else {
        message.error("Failed to send push notifications");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending push notifications:", error);
      message.error("Internal server error");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill in all required fields");
  };

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
              PUSH NOTIFICATION
            </h1>
          </Col>
        </Row>
        <br />
        {loading ? (
          <div style={{ padding: "30px" }}>
            <Skeleton.Image active /> <br />
            <br /> <Skeleton active /> <br />
            <br /> <Skeleton active /> <br />
            <br /> <Skeleton.Button active />
          </div>
        ) : (
          <Row style={{ padding: "20px" }} justify={"center"}>
            <Col xs={24} md={16}>
              <Row style={{ padding: "10px" }}>
                <Col xs={24} md={11}>
                  <Form
                    layout="vertical"
                    name="basic"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      // className="authInput"
                      name="title"
                      // initialValue={plan?.description}
                      rules={[
                        {
                          required: true,
                          message: "Please Input Notfication Title!",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "12px 20px",
                        }}
                        // className="mainInput dashInput"
                        placeholder="Enter Notification Title"
                      />
                    </Form.Item>
                    {/* <Form.Item
                      // className="authInput"
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Notfication Type!",
                        },
                      ]}
                    >
                      <Select
                        style={{
                          height: 48, // Adjust the width as needed
                          borderRadius: 5,
                          background: 'white',
                          fontSize: "16px", // Increase the font size
                        }}
                        placeholder="Select Notification Type"
                      >
                        <Select.Option value="PUSH" style={{ padding: "10px 20px" }}>
                          PUSH
                        </Select.Option>
                      </Select>
                    </Form.Item> */}
                    <Form.Item
                      className="authtextarea"
                      name="content"
                      // initialValue={plan?.description}
                      rules={[
                        {
                          required: true,
                          message: "Please Input Notfication Message!",
                        },
                      ]}
                    >
                      <TextArea
                        rows={8}
                        size="large"
                        placeholder="Enter Push Notification Message"
                      />
                    </Form.Item>
                    <br />
                    <Row justify="">
                      <Form.Item>
                        <Button
                          type="button"
                          htmlType="submit"
                          size={"large"}
                          style={{ padding: "12px 40px", height: "auto" }}
                          className="mainButton loginBtn"
                        >
                          PUSH NOTIFICATION
                        </Button>
                      </Form.Item>
                      &emsp;
                      <Button
                        type="button"
                        htmlType="button"
                        size={"large"}
                        ghost
                        style={{
                          padding: "10px 40px",
                          height: "50px",
                          width: "194px",
                          borderColor: "#aeafaf",
                          color: "#aeafaf",
                        }}
                        className="mainButton cancelBtn"
                        onClick={() => navigate("/pushnotifications")}
                      >
                        CANCEL
                      </Button>
                    </Row>{" "}
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        )}

        <br />
      </div>
    </Layout>
  );
}
export default AddNotification;
