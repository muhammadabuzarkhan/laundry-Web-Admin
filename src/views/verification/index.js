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
  InputNumber,
  Layout,
  Avatar,
  Tabs,
  Table,
  Select,
  Image,
  Modal,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOADS_URL, VERIFICATION , CONTENT_TYPE, CATEGORIESEVENT } from "../../config/constants";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";

import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { ImageUrl } from "../../config/functions";

function CategoryDetails() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [verificationPackage, setPackage] = useState({});


  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setLoading(true);
    const response = await Get(`${VERIFICATION.getPackage}`, token);

    console.log("response",response)
    setPackage(response[0]);
    setLoading(false);
  };


  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };


  const deleteCategory = () => {

    Post(VERIFICATION.deleteCategory+id, {},token)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success","Category deleted successfully","success");
          navigate(-1)
        } else {
          swal("Oops!", response?.data?.message || response?.response?.data?.message, "error");
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
      });
  };

  const onFinish = (values) => {
    Post(VERIFICATION.updatePackage, values,token)
      .then((response) => {
        setLoading(false);
        console.log("response",response)
        if (response?.data?.status) {
          swal("Success","Category updated successfully","success");
          navigate(-1)
        } else {
          swal("Oops!", response?.data?.message || response?.response?.data?.message, "error");
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
      });
  };

  
  const onFinish2 = (values) => {
    Post(VERIFICATION.verifyAccount, values,token)
      .then((response) => {
        setLoading(false);
        console.log("response",response)
        if (response?.data?.status) {
          swal("Success","User Verified successfully","success");
          navigate(-1)
        } else {
          swal("Oops!", response?.data?.message || response?.response?.data?.message, "error");
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
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
        
            <h1 className="pageTitle" style={{ margin: 0 }}>
             Verification Package
            </h1>
          </Col>
        </Row>
        <br />
        {loading ? (
          <div style={{ padding: "30px" }}>
            <Skeleton active /> <br />
            <br /> <Skeleton.Button active />
          </div>
        ) : (
          <Row style={{ padding: "20px" }}>
            <Col xs={24} md={16}>
              <Row style={{ padding: "10px" }}>
                <Col xs={24} md={11}>
                  <Form
                    layout="vertical"
                    name="basic"
                    
                    wrapperCol={{
                      span: 24,
                    }}
                    onFinish={onFinish}
                  >
                    {editMode ? (
                      <>
                        <Form.Item
                          label="Title"
                          name="title"
                          initialValue={verificationPackage?.title}
                          rules={[
                           
                            {
                              required: true,
                              message: "Please input verification Package title!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter Package Title"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                                padding: "12px 20px",
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Basic Amount"
                          name="amount_1"
                          initialValue={verificationPackage?.amount_1}
                          rules={[
                           
                            {
                              required: true,
                              message: "Please input verification Package Basic Amount!",
                            },
                          ]}
                        >
                          <InputNumber
prefix="$"
size="large"
                            placeholder="Enter Basic Amount"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              width:'100%',
                                padding: "4px 20px",
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Secondary Amount"
                          name="amount_2"
                          initialValue={verificationPackage?.amount_2}
                          rules={[
                           
                            {
                              required: true,
                              message: "Please input verification Package Secondary Amount!",
                            },
                          ]}
                        >
                          <InputNumber
prefix="$"
size="large"
                            placeholder="Enter Secondary Amount"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              width:'100%',
                                padding: "4px 20px",
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Minimum Followers"
                          name="followers"
                          initialValue={verificationPackage?.followers}
                          rules={[
                           
                            {
                              required: true,
                              message: "Please input minimum followers!",
                            },
                          ]}
                        >
                          <InputNumber
size="large"
                            placeholder="Enter Minimum Followers"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              width:'100%',
                                padding: "4px 20px",
                            }}
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
                              className="mainButton graden-bg"
                            >
                              Update
                            </Button>
                          </Form.Item>
&emsp;
                          <Button
                              type="button"
                              htmlType="button"
                              ghost
                              style={{ padding: "10px 40px", height: "43px", borderColor:"#aeafaf", color:"#aeafaf" }}
                              className="mainButton "
                              onClick={() => setEditMode(false)}
                            >
                              Cancel
                            </Button>
                        </Row>{" "}
                      </>
                    ) : (
                      <>
                        <Row style={{ padding: "10px" }}>
                          <Col>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              Package Title *
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {verificationPackage?.title}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }}>
                          <Col>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              Basic Amount *
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                             $ {verificationPackage?.amount_1}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }}>
                          <Col>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              Secondary Amount *
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                             $ {verificationPackage?.amount_2}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }}>
                          <Col>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              Minimum Followers
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {verificationPackage?.followers}
                            </Typography.Text>
                          </Col>
                        </Row>
             
                        <br />
                        <Row style={{ padding: "10px" }}>
                          <Button
                            type="button"
                            htmlType="button"
                            size={"large"}
                            style={{ padding: "12px 40px", height: "auto" }}
                            className="mainButton graden-bg"
                            onClick={() => setEditMode(true)}
                          >
                            Edit
                          </Button>
                        </Row>
                      </>
                    )}
                  </Form>
                </Col>
              </Row>

              <Row style={{ padding: "10px" }}>
                <Col xs={24} md={11}>
                  <Form
                    layout="vertical"
                    name="secondary"
                    
                    wrapperCol={{
                      span: 24,
                    }}
                    onFinish={onFinish2}
                  >

<Form.Item
                          label="Assign Verification Package"
                          name="userEmail"
                          
                          rules={[
                           
                            {
                              required: true,
                              message: "Please input user email!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter User Email"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                                padding: "12px 20px",
                            }}
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
                              className="mainButton graden-bg"
                            >
                              Verify User Account
                            </Button>
                          </Form.Item>
                        </Row>{" "}
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        )}

        <br />
        <br />

        <Modal
        open={modalOpen}
        onOk={() => deleteCategory()}
        onCancel={() => setModalOpen(false)}
        okText="Yes"
        className="StyledModal"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
        cancelText="No"
        cancelButtonProps={{
          className: "no-btn",
        }}
        okButtonProps={{
          className: "yes-btn",
        }}
      >
        <Image
          src={ImageUrl("question.png")}
          preview={false}
          width={74}
          height={74}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
        System Message!
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
        Are You Sure You Want To Delete This Category?
        </Typography.Text>
      </Modal>
      </div>
    </Layout>
  );
}
export default CategoryDetails;
