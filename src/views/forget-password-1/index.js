import React from "react";
import AuthLayout from "../../components/AuthLayout";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Checkbox,
  Tabs,
  Table,
  Image,
  Divider,
  Layout,
  message
} from "antd";
import { useNavigate } from "react-router";
import Link from "antd/es/typography/Link";
import { Post } from "../../config/api/post";
import { AUTH } from "../../config/constants";
import swal from "sweetalert";
import { ImageUrl } from "../../config/functions";
import { useSelector, useDispatch } from "react-redux";
import { forgetPassword } from '../../redux/thunk/authSlice'

function ForgetPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  // const onFinish = (values) => {
  //   Post(AUTH.emailCode, { email: values?.email, type: "ADMIN" })
  //     .then((response) => {
  //       setLoading(false);
  //       console.log(response, "response")
  //       if (response?.data) {
  //         form.resetFields();
  //         swal("Success", response?.message, "success");
  //         navigate("/forget-password-2", { replace: true , state: { email: values?.email } });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //       swal("Error", err?.response?.data?.message, "error");
  //     });
  // };

  const onFinish = async (values) => {
    console.log("Success:", values);
     setLoading(true);

    let data = {
      email: values.email
    };
    
     setLoading(false);
    const checkAdmin = await dispatch(forgetPassword(data)).unwrap()

   if(!checkAdmin?.status){
    message.error(checkAdmin?.message)
   }
   else if(checkAdmin?.status){
    navigate("/forgot-password-2", { replace: true, state: values });
   }
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
                    <p className="authFormPara">
                      Enter an email address to receive a verification code.
                    </p>
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
                          label="Email Address"
                          name="email"
                          rules={[
                            {
                              type: "email",
                              message: "Please input valid email!",
                              // warningOnly: true,
                            },
                            {
                              required: true,
                              message: "Please input your email!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter Email Address"
                            style={{
                              borderRadius: "5px",
                              background: "white",
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
