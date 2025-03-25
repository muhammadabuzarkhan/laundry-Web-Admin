import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Layout,
  Input,
  Button,
  Checkbox,
  Tabs,
  Table,
  Image,
  Modal,
  Divider,
} from "antd";
import Link from "antd/es/typography/Link";
import { useNavigate, useLocation } from "react-router";
import { Post } from "../../config/api/post";
import { AUTH } from "../../config/constants";
import swal from "sweetalert";
import { ImageUrl } from "../../config/functions";

function ForgetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      password: values.password,
      confirmPassword: values.confirm_password,
      email: state.email,
      code: state.code,
    };
    Post(AUTH.resetPassword, data)
      .then((response) => {
        console.log("response",response);
        setLoading(false);
        if (response?.status) {
          swal("Success", response?.message, "success");
          navigate("/signin", { replace: true });
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
        }
      })
      .catch((e) => {
        //swal("Oops!", "internal server error", "error");
        return  e?.response?.data        
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
   

    <AuthLayout
    head={{ title: "User Management", description: "Some Description." }}
  >
    <Layout className="login-bg">
      <Row
        style={{
          // padding: window.innerWidth < 500 ? "10px" :"100px" ,
          justifyContent: "center",
        }}
      >
        <Col xs={24} sm={22} md={22} lg={16}>
          <div
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <Row justify={"center"}>
              {/* <Col xs={0} sm={0} md={12}>
                <div
                  className="loginScreenContentWrapper"
                  style={{ position: "relative" }}
                ></div>
              </Col> */}
              <Col
                xs={24}
                md={12}
                style={{ background: "white", borderRadius: "30px"}}
                className="formMainWrap"
              >
                <Row>
                  <Image
                    src={ImageUrl("loginlogo.png")}
                    style={{ maxWidth: "200px" }}
                    alt=""
                    preview={false}
                  />
                </Row>
                <Row justify="center">
                  <h2 class="authFormHeading">FORGOT PASSWORD</h2>
                </Row>
                <Row justify="center">
                  <Col xs={24} >
                    <p style={{ color: "black", textAlign: "center" }} className="authFormPara">
                    Set your new password
                    </p>
                  </Col>
                </Row>
                <br />
                <Row style={{ width: "100%" }}>
                  <Col span={24}>
                    <Form
                      layout="vertical"
                      name="basic"
                      labelCol={{
                        span: 24,
                      }}
                      wrapperCol={{
                        span: 24,
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                    <Form.Item
                    className="authInput"
                    label="New Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password!",
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

                  <Form.Item
                    className="authInput"
                    label="Confirm Password*"
                    name="confirm_password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Confirm Password!",
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
                      placeholder="Confirm Password"
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
                            className="loginBtn"
                            type="primary"
                            htmlType="submit"
                            style={{
                              fontSize: "16px",
                              minWidth: "200px",
                              background: "#666666",
                              padding: "10px",
                              height: "auto",
                              borderRadius: "5px",
                            }}
                          >
                            Continue
                          </Button>
                        </Form.Item>
                      </Row>
                      <Row justify="center">
                        <span
                          style={{
                            textDecoration: "underlined",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate("/signin")}
                        >
                          Back to{" "}
                          <span style={{ color: "#09cabf" }}>login </span>
                        </span>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Layout>
  </AuthLayout>
  );
}

export default ForgetPassword;
