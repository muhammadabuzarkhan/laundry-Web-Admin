import React from "react";
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
  message,
  Tabs,
  Table,
  Image,
  Divider,
} from "antd";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authLogin } from '../../redux/thunk/authSlice'
// import { addUser, removeUser } from "../../redux/slice/authSlice";
import swal from "sweetalert";
import { ImageUrl } from "../../config/functions";

// import router from "next/router";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      email: values.email,
      password : values.password,
    };

    const checkAdmin = await dispatch(authLogin(data)).unwrap()

    console.log("checkAdmin",checkAdmin);

   if(!checkAdmin.status){
    message.error(checkAdmin.message)
   }else{
    navigate("/")
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
                  style={{ background: "white", borderRadius: "30px" }}
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
                  <Row>
                    <h2 className="authFormHeading">Login</h2>
                  </Row>
                  <br />
                  <Row>
                    <p className="authFormPara">
                      Enter your credentials to log in to the platform
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
                              color: "#000"
                            }}
                          />
                        </Form.Item>

                        <Form.Item
                          className="authInput"
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
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
                            placeholder="Enter Password"
                            style={{
                              borderRadius: "5px",
                              fontSize: "14px",
                              padding: "12px 20px",
                            }}
                          />
                        </Form.Item>
                        <Row>
                          <Col xs={24} md={12}>
                            <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: 0,color:"black" }}
                      >
                        <Checkbox style={{color:'black'}}>Remember me</Checkbox>
                      </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Button
                              type="link"
                              style={{
                                float: "right",
                                color: "#007DE9",
                                fontWeight: "bold",
                                fontSize: "14px",
                                textDecoration: "underline"
                              }}
                              onClick={() => navigate("/forgot-password")}
                            >
                              Forgot Password?
                            </Button>
                          </Col>
                        </Row>
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
                                // background: "#F41242",
                                padding: "10px",
                                height: "auto",
                                // borderRadius: "5px",
                              }}
                            >
                              {loading ? "Loading..." : "Login"}
                            </Button>
                          </Form.Item>
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

export default Signin;
