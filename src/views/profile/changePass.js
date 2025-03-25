import { useState,useEffect } from "react";
import { Col, Row, Layout, Upload,Avatar, Form, Button,Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {USER , UPLOADS_URL} from "../../config/constants"
import { CONTENT_TYPE } from "../../config/constants";
import swal from "sweetalert";
import { Post } from "../../config/api/post";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import { FaArrowLeft } from "react-icons/fa";

function ChangePass() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  console.log(token, "token");


  const onFinish = (values) => {
    Post(USER.changePassword, values, token)
      .then((response) => {
        console.log(response)
        if (!response?.data?.status && !response?.response?.data?.status)  {
          swal("Oops!", response?.response?.data?.message ||response?.data?.message , "error");
        } else {
          swal("Success!", "Password Updated Successfully", "success");
          navigate("/")
        }
      })
      .catch((e) => {
       console.log(e)
      });
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
              Change Password
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" , justifyContent:"center" }}>
        <Col xs={24} md={8}>
                <Form
                  layout="vertical"
                  name="basic"
                  labelCol={{
                    span: 0,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                  className="authInput"
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input Email Address!",
                      },
                      {
                        type: "string",
                        min: 8,
                        message: "password must be atleast 8 characters!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Email Address"
                      style={{
                        borderRadius: "5px",
                        fontSize: "14px",
                          padding: "12px 20px",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    className="authInput"
                    label="Old Password"
                    name="oldPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Old Password!",
                      },
                      {
                        type: "string",
                        min: 8,
                        message: "password must be atleast 8 characters!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter Old Password"
                      style={{
                        borderRadius: "5px",
                        fontSize: "14px",
                          padding: "12px 20px",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    className="authInput"
                    label="New Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your New Password!",
                      },
                      {
                        type: "string",
                        min: 8,
                        message: "password must be atleast 8 characters!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter New Password"
                      style={{
                        borderRadius: "5px",
                        fontSize: "14px",
                          padding: "12px 20px",
                      }}
                    />
                  </Form.Item>
                  <br />

                  <Row justify="center">
                    <Form.Item>
                      <Button
                         type="primary"
                         htmlType="submit"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton loginBtn"
                       
                      >
                        Update Password
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>
              </Col>
        </Row>

        <br />
        <br />

      </div>
    </Layout>
  );
}
export default ChangePass;
