import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography, Layout,
  Avatar, Select,
  Image,
  Modal,
  Skeleton,
  Button
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaCaretDown, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOADS_URL, USERS , SURVEY } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import swal from "sweetalert";
import { ImageUrl } from "../../config/functions";

function UserDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [survey,Setsurvey] = useState([])

  useEffect(() => {
    getUser();
  }, []);

  

  const getUser = async () => {
    setLoading(true);
    const response = await Get(`${SURVEY.getUserSurvey}/${id}`);
    Setsurvey(response.data.surveyUser);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(USERS.toggleStatus + "/" + user._id , token,{});
      const _user = {...user};

      _user.status = _user.status == "ACTIVE" ? "INACTIVE" : "ACTIVE";
      setModalOpen(false);
      setUser(_user);
    } catch (error) {
      console.log(error.message);
    }  
    
  }; 
  

  // const handleDelete = async () => {
  //   try {
  //     const response = await Get(
  //       ADMIN.deleteUser + user._id,
  //       token,
  //       {}
  //     );

  //     if(response.status){
  //       swal("Success" , "User Deleted Successfully",'success')
  //       navigate(-1)
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

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
              Users Details
            </h1>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {user && <Typography.Text  style={{
              fontWeight: "bold",
            }}>Profile Status: <span style={{color:user.isActive ? '#5bd8bb' : "red"}}>{user.isActive ? "Active" : "Inactive"}</span></Typography.Text>}
          </Col>
        </Row>
        <br />

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

        {
          !loading && 
          survey  &&
          survey.map((data) => (
            <>
            <Row style={{ padding: "10px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                {/* <Avatar
                  size={100}
                  icon={
                    !user?.image ? (
                      <UserOutlined />
                    ) : (
                      <Avatar size={40} src={UPLOADS_URL + "Uploads/" + user?.image} />
                    )
                  }
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />{" "} */}
                &emsp;
                <h1
                  className="pageTitle"
                  style={{ margin: 0, textTransform: "capitalize" }}
                >
                  {}
                </h1>
              </Col>
            </Row>
            <Row style={{ padding: "20px" }}>
              <Col xs={24} md={16}>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: 'black'
                      }}
                    >
                      Name{" "}
                    </h5>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        color: "#7a7e7f",
                        marginTop:"10px"
                      }}
                    >
                  
                      {data?.firstName} {data?.lastName}
                    </h5>
                  </Col>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: 'black'
                      }}
                    >
                      Email Address{" "}
                    </h5>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        color: "#7a7e7f",
                        marginTop:"10px"
                      }}
                    >
                      {data?.email}
                    </h5>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  {/* <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: 'black'
                      }}
                    >
                      Phone Number{" "}
                    </h5>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        color: "#7a7e7f",
                        marginTop:"10px"
                      }}
                    >
                      {user?.phone_no}
                    </h5>
                  </Col> */}
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: 'black'
                      }}
                    >
                      Registered On{" "}
                    </h5>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        color: "#7a7e7f",
                        marginTop:"10px"
                      }}
                    >
                      {dayjs(data?.createdAt).format("M/D/YYYY")}
                    </h5>
                  </Col>
                </Row>
                      
                {
                  data?.survey.length > 1 &&
                  (
                    <>
                      <h2> Survey </h2>
                    </>
                  )
                }
                
               

                {
                  data?.survey?.map((surveys) => {
                    return(
                      <>
                        <h3>{surveys?.sportId?.name}</h3>
                        <br></br>
                        {
                          surveys?.details.length > 1  ?

                          surveys?.details?.map((qua_Ans) => {
                            return(
                                  <>
                                      <p>Question : {qua_Ans?.questionId?.name}</p>
                                      <br></br>
                                      <p>Answer : {qua_Ans?.answer}</p>
                                      <br></br>
                                  </>
                             
                            )
                          })

                          : null
                        }
                      </>
                    )
                  })
                }
                {/* <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: 'black'
                      }}
                    >
                      Total Followers{" "}
                    </h5>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        color: "#7a7e7f",
                        marginTop:"10px"
                      }}
                    >
                      {user?.followers.length}
                    </h5>
                  </Col>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: 'black'
                      }}
                    >
                     Total Following
                    </h5>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        color: "#7a7e7f",
                        marginTop:"10px"
                      }}
                    >
                      {user?.following.length}
                    </h5>
                  </Col>
                  
                </Row> */}
              </Col>
            </Row>
            {/* <Row style={{padding:'10px 20px'}}>
              <Button
                        type="primary"

                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" , background:'#F41242' }}
                        className="mainButton"
                        onClick={() => setModal2Open(true)}
                       
                      >
                        Delete User
                      </Button>
            </Row> */}
         </>
          ))
        }

        <br />
        <br />
      </div>

      <Modal
        open={modalOpen}
        centered
        onOk={() => handleStatus()}
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
          style: {
            border: "2px solid #F41242",
            color: "#000000",
            height: "auto",
            padding: "6px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            marginTop: "15px",
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#F41242",
            color: "white",
            marginTop: "15px",
            height: "auto",
            padding: "5px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            border: "2px solid #F41242",
          },
        }}
      >
        <Image
          src={ImageUrl("question.png")}
          preview={false}
          width={100}
          height={120}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          {user?.status == "ACTIVE" ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To {user?.status == "ACTIVE" ? "Deactivate" : "Activate"} This User?
        </Typography.Text>
      </Modal>

      {/* <Modal
        open={modal2Open}
        onOk={() => handleDelete()}
        onCancel={() => setModal2Open(false)}
        okText="Yes"
        centered
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
          style: {
            border: "2px solid #F41242",
            color: "#000000",
            height: "auto",
            padding: "6px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            marginTop: "15px",
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#F41242",
            color: "white",
            marginTop: "15px",
            height: "auto",
            padding: "5px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            border: "2px solid #F41242",
          },
        }}
      >
        <Image
          src={ImageUrl("question.png")}
          preview={false}
          width={100}
          height={120}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          Delete
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Are you Sure! You Want To Delete This User?
        </Typography.Text>
      </Modal> */}

      <br />
      <br />
    </Layout>
  );
}
export default UserDetails;
