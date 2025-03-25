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
import { UPLOADS_URL, FEEDBACKS } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Feedbacks from ".";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function FeedbackDetails() {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (id) {
      getFeedbackDetails();
    }
  }, []);

  const getFeedbackDetails = async () => {
    setLoading(true);
    const feedback = await Get(`${FEEDBACKS.getFeedbackById}${id}`, token);

    setFeedback(feedback);
    setLoading(false);
  };

  const addFeedback = async () => {
    try {
      const response = await Post(FEEDBACKS.getFeedbackById,feedback, token);

      if(response.status === 200){
        message.success("Feedback Created Successfully");
        navigate(-1);
      }


      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
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
              style={{ fontWeight: "bold", fontSize: "20px" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
              {id ? "View Feedback Details" : "Post New Feedback"}
            </h1>
          </Col>
        </Row>
        <br />

        {id ? (
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

            {!loading && feedback && (
              <>
                <Row style={{ padding: "20px" }}>
                  <Col xs={24} md={16}>
                    <Row style={{ padding: "10px" }}>
                      <Col xs={24} md={12}>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          Full Name{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {feedback?.fullname}
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
                          }}
                        >
                          Email{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {feedback?.email}
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
                          }}
                        >
                         Subject
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {feedback?.subject}
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
                          }}
                        >
                          Date{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {dayjs(feedback.createdAt).format("M/D/YYYY")}
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
                          }}
                        >
                          Message{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {feedback?.message}
                        </h5>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            )}
          </>
        ) : (
          <>
            <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  Feedback Title
                </h5>
                <Input
                  style={{ width: "100%" }}
                  className="mainInput dashInput"
                  placeholder="Feedback ABC"
                  value={feedback?.feedbackTitle}
                  onChange={(e) =>
                    setFeedback({ ...feedback, feedbackTitle: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  Feedback Type
                </h5>
                <Input
                  style={{ width: "100%" }}
                  className="mainInput dashInput"
                  placeholder="Alert Feedback"
                  value={feedback?.feedbackType}
                  onChange={(e) =>
                    setFeedback({
                      ...feedback,
                      feedbackType: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  Descriptive Text
                </h5>

                <TextArea
                  className="mainInput dashInput"
                  rows={4}
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                  value={feedback?.description}
                  onChange={(e) =>
                    setFeedback({ ...feedback, description: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row style={{ padding: "5px 20px" }}>
            <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton primaryButton"
              onClick={() => addFeedback()}
          
            >
              Post
            </Button>
            </Row>
           
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
export default FeedbackDetails;
