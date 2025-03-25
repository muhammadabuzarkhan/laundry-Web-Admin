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
  Checkbox,
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
} from "../../config/constants";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";

import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { ImageUrl } from "../../config/functions";

function AddPlan() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((plan) => plan.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [plan, setPlan] = useState({});

  useEffect(() => {
    getPlan();
  }, []);

  const getPlan = async () => {
    setLoading(true);
    const response = await Get(`${PLANS.getPlanById}${id}`, token);
    setPlan(response?.data?.plan);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(
        PLANS.toggleStatus + "/" + user._id,
        token,
        {}
      );
      const newUser = { ...user };

      newUser.isActive = !user.isActive;
      setModalOpen(false);
      setUser(newUser);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinish = (values) => {
    Post(PLANS.addPlan, values, token, null)
      .then((response) => {
        setLoading(false);
        if (response) {
          swal("Success", "Plan added successfully", "success");
          navigate(-1);
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
      });
  };

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleFeatureChange = (selectedFeatureValues) => {
    setSelectedFeatures(selectedFeatureValues);
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
              ADD PLAN
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
          <Row style={{ padding: "20px" }}>
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
                  >
                    <Form.Item
                      // className="authInput"
                      label="Title"
                      name="planname"
                      // initialValue={plan?.subscriptionname}
                      rules={[
                        {
                          required: true,
                          message: "Please input plan title!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter Plan Title"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "12px 20px",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      // className="authInput"
                      label="Type"
                      name="plantype"
                      // initialValue={plan?.subscriptiontype}
                      rules={[
                        {
                          required: true,
                          message: "Please input plan abbreviation!",
                        },
                      ]}
                    >
                      <Select
                        // className="FormSelect"
                        size="large"
                        style={{ width: "100%", marginBottom: "20px" }}
                        placeholder="Select subscription type"
                      >
                        <Select.Option value={"Monthly"}>
                          {"Monthly"}
                        </Select.Option>
                        <Select.Option value={"Yearly"}>
                          {"Yearly"}
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      // className="authInput"
                      label="Amount"
                      name="planprice"
                      // initialValue={plan?.subscriptionprice}
                      rules={[
                        {
                          required: true,
                          message: "Please input plan price!",
                        },
                      ]}
                    >
                      <InputNumber
                        prefix="$"
                        size="large"
                        placeholder="Enter Plan Price"
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "2px 10px",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      // className="authInput"
                      label="Duration"
                      name="planduration"
                      // initialValue={plan?.subscriptionduration}
                      rules={[
                        {
                          required: true,
                          message: "Please input plan Duration!",
                        },
                      ]}
                    >
                      <InputNumber
                        suffix="days"
                        size="large"
                        placeholder="Enter Plan Duration"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          width: "100%",
                          padding: "4px 20px",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      // className="authtextarea"
                      label="Description"
                      name="description"
                      // initialValue={plan?.description}
                      rules={[
                        {
                          required: true,
                          message: "Please input plan Description!",
                        },
                      ]}
                    >
                      <TextArea
                        rows={5}
                        suffix="days"
                        size="large"
                        placeholder="Enter Plan Description"
                        style={{
                          borderRadius: "5px",
                          background: "white",
                          fontSize: "14px",
                          padding: "12px 20px",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Features"
                      name="features"
                      initialValue={plan?.features}
                      rules={[
                        {
                          required: true,
                          message: "Please Check the Plan Features !",
                        },
                      ]}
                    >
                      <Checkbox.Group
                        style={{ width: "100%" }}
                        defaultValue={plan?.features}
                        value={selectedFeatures}
                        onChange={handleFeatureChange}
                      >
                        <Row gutter={[16, 16]}>
                          {[
                            "Unlimited Users",
                            "24/7 Customer Support",
                            "Monthly Reports",
                            "Mobile App Access",
                            "Customizable Dashboard",
                          ].map((feature, index) => (
                            <Col
                              key={index}
                              xs={24}
                            >
                              <Checkbox value={feature}>{feature}</Checkbox>
                            </Col>
                          ))}
                        </Row>
                      </Checkbox.Group>
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
                          ADD PLAN
                        </Button>
                      </Form.Item>
                      &emsp;
                      <Button
                        type="button"
                        htmlType="button"
                        size="large"
                        ghost
                        style={{
                          padding: "10px 40px",
                          height: "50px",
                          width: "154px",
                          borderColor: "#aeafaf",
                          color: "#aeafaf",
                        }}
                        className="mainButton cancelBtn"
                        onClick={() => navigate("/plans")}
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
        <br />

        <Modal
          open={modalOpen}
          onOk={() => handleStatus()}
          onCancel={() => setModalOpen(false)}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              className="yes-btn"
            >
              Okay
            </Button>,
          ]}
          cancelButtonProps={false}
          okText="Yes"
          className="StyledModal"
          style={{
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
          okButtonProps={{}}
        >
          <Image
            src={ImageUrl("done.png")}
            preview={false}
            width={74}
            height={74}
          />
          <Typography.Title level={4} style={{ fontSize: "25px" }}>
            System Message!
          </Typography.Title>
          <Typography.Text style={{ fontSize: "16px" }}>
            Plan Has Been Updated Successfully!
          </Typography.Text>
        </Modal>
      </div>
    </Layout>
  );
}
export default AddPlan;
