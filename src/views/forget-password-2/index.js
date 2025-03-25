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
import { useNavigate, useLocation } from "react-router";
import { verifyCode } from '../../redux/thunk/authSlice'
import { useSelector, useDispatch } from "react-redux";
import Link from "antd/es/typography/Link";
import { Post } from "../../config/api/post";
import { AUTH } from "../../config/constants";
import swal from "sweetalert";
import { ImageUrl } from "../../config/functions";
// import router from "next/router";

// const { OTP } = Input;

function ForgetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  let [codeData, setCodeData] = React.useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });

  const onFinish = async (values) => {

    console.log("Success:", values);
     setLoading(true);

    let data = {
      email: state.email,
      code: values.code
    };
    
     setLoading(false);
    const checkAdmin = await dispatch(verifyCode(data)).unwrap()

   if(!checkAdmin?.status){
    message.error(checkAdmin?.message)
   }
   else if(checkAdmin?.status){
    navigate("/forgot-password-3", { replace: true,  state: { code: values.code, email: state.email }});
   }


    // ---------------------------------------------------------------------

    // Post(AUTH.verifyCode, { code: values.code, email: state.email })
    //   .then((response) => {
    //     setLoading(false);
    //     console.log(response, "response")
    //     if ( response?.data) {
    //       swal("Success", response?.data?.message, "success");
    //       navigate("/forgot-password-3", {
    //         replace: true,
    //         state: { code: values.code, email: state.email },
    //       });
    //     } else {

    //       console.log(response);
    //       swal(
    //         "Oops!",
    //         response?.response?.data?.message,
    //         "error"
    //       );
    //     }
    //   })
    //   .catch((e) => {
    //    console.log(e,"SS")
    //     swal("Oops!", "internal server error", "error");
    //     setLoading(false);
    //   });



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
                  <Row justify="center">
                    <h2 class="authFormHeading">Forgot Password</h2>
                  </Row>
                  <Row justify="center">
                    <Col xs={24} md={18}>
                      <p style={{textAlign: "center" }} className="authFormPara">
                        An email has been sent to you with a verification code.
                        Please enter it here.
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
                          label="Verification Code"
                          name="code"
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Verification Code",
                            },
                          ]}
                        >
                          {/* <OTP
                            length={4} // Specify the length of the OTP input
                            size="large"
                            placeholder="Enter Verification Code"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              padding: "12px 20px",
                            }}
                          /> */}
                          <Input
                            size="large"
                            placeholder="Enter Verification Code"
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
                              type="primary"
                              htmlType="submit"
                              className="loginBtn"
                              style={{
                                fontSize: "16px",
                                minWidth: "200px",
                                // background: "#666666",
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
