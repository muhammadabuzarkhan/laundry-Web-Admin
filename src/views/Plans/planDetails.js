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

function PlanDetails() {
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
    const response = await Get(`${PLANS.getPlanById}${id}`);

    console.log("JJJ", response);

    setPlan(response);

    setLoading(false);
  };

  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };

  const deletePlan = () => {
    Post(PLANS.deletePlan + id, {}, token)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success", "Plan deleted successfully", "success");
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

  const onFinish = (values) => {
    Post(PLANS.updatePlan + id, values, token, null)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response) {
          swal("Success", "Plan updated successfully", "success");
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
              {editMode ? "UPDATE" : "VIEW"} PLAN
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
                <Col xs={24} md={14}>
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
                    // initialValues={plan}
                  >
                    {editMode ? (
                      <>
                        <Form.Item
                          label="Title"
                          name="planname"
                          initialValue={plan?.planname}
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
                          label="Type"
                          name="plantype"
                          initialValue={plan?.plantype}
                          rules={[
                            {
                              required: true,
                              message: "Please input plan abbreviation!",
                            },
                          ]}
                        >
                          <Select
                            className="FormSelect"
                            size="large"
                            style={{ width: "100%", marginBottom: "20px" }}
                            placeholder="Select Plan Type"
                          >
                            <Select.Option value={"MONTHLY"}>
                              {"Monthly"}
                            </Select.Option>
                            <Select.Option value={"YEARLY"}>
                              {"Yearly"}
                            </Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Amount"
                          name="planprice"
                          initialValue={plan?.planprice}
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
                          label="Duration"
                          name="planduration"
                          initialValue={plan?.planduration}
                          rules={[
                            {
                              required: true,
                              message: "Please input plan Duration!",
                            },
                          ]}
                        >
                          <Input
                            suffix="days"
                            size="large"
                            placeholder="Enter Plan Duration"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              padding: "12px 20px",
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Description"
                          name="description"
                          initialValue={plan?.description}
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
                              {plan?.features && plan.features.length > 0 ? (
                                plan.features.map((feature, index) => (
                                  <Col key={index} span={12}>
                                    <Checkbox value={feature}>
                                      {feature}
                                    </Checkbox>
                                  </Col>
                                ))
                              ) : (
                                <Col span={24}>
                                  <Typography.Text style={{ fontSize: "16px" }}>
                                    No features available
                                  </Typography.Text>
                                </Col>
                              )}
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
                              UPDATE
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
                              // height: "43px",
                              height: "50px",
                              width: "144px",
                              borderColor: "#aeafaf",
                              color: "#aeafaf",
                            }}
                            className="mainButton cancelBtn"
                            onClick={() => setEditMode(false)}
                          >
                            CANCEL
                          </Button>
                        </Row>{" "}
                      </>
                    ) : (
                      <>
                        <Row style={{ padding: "10px" }} align={"top"}>
                          <Col xs={12} flex={"auto"}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px", marginTop: 0 }}
                            >
                              Package Title:
                            </Typography.Title>
                          </Col>
                          <Col xs={12}>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {plan.planname}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }} align={"top"}>
                          <Col xs={12} flex={"auto"}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px", marginTop: 0 }}
                            >
                              Package Description:
                            </Typography.Title>
                          </Col>
                          <Col xs={12}>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {plan?.description}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }} align="top">
                          <Col xs={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px", marginTop: 0 }}
                            >
                              Type:
                            </Typography.Title>
                          </Col>
                          <Col xs={12}>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {plan?.plantype}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }} align="top">
                          <Col xs={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px", marginTop: 0 }}
                            >
                              Amount:
                            </Typography.Title>
                          </Col>
                          <Col xs={12}>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              $ {plan?.planprice}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }} align="top">
                          <Col xs={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px", marginTop: 0 }}
                            >
                              Duration:
                            </Typography.Title>
                          </Col>
                          <Col xs={12}>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {plan?.planduration} days
                            </Typography.Text>
                          </Col>
                        </Row>
                        {/* <Row style={{ padding: "10px" }}>
                          <Col>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              Duration
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {plan?.planduration} days
                            </Typography.Text>
                          </Col>
                        </Row> */}
                        <br />
                        {/* <Col style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              Features
                            </Typography.Title>
                            {plan?.features && plan.features.length > 0 ? (
                              <Checkbox.Group value={plan.features} style={{ marginLeft: "10px" }}>
                                {plan.features.map((feature, index) => (
                                  <Checkbox key={index} value={feature}>
                                    {feature}
                                  </Checkbox>
                                ))}
                              </Checkbox.Group>
                            ) : (
                              <Typography.Text style={{ fontSize: "16px" }}>
                                No features available
                              </Typography.Text>
                            )}
                          </Col> */}
                        <Row style={{ padding: "10px" }} align="top">
                          <Col xs={12} >
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              Features
                            </Typography.Title>
                          </Col>
                          <Col xs={12}>
                            {plan?.features && plan.features.length > 0 ? (
                              <Checkbox.Group value={plan.features}>
                                {plan.features.map((feature, index) => (
                                  <Checkbox key={index} value={feature}>
                                    {feature}
                                  </Checkbox>
                                ))}
                              </Checkbox.Group>
                            ) : (
                              <Typography.Text style={{ fontSize: "16px" }}>
                                No features available
                              </Typography.Text>
                            )}
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }}>
                          <Button
                            type="button"
                            htmlType="button"
                            size={"large"}
                            style={{ padding: "12px 40px", height: "auto" }}
                            className="mainButton loginBtn"
                            onClick={() => setEditMode(true)}
                          >
                            EDIT PLAN
                          </Button>
                        </Row>
                      </>
                    )}
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        )}

        <br />
        <br />

        {/* <Modal
          open={modalOpen}
          onOk={() => deletePlan()}
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
            Are You Sure You Want To Delete This Plan?
          </Typography.Text>
        </Modal> */}
      </div>
    </Layout>
  );
}
export default PlanDetails;
