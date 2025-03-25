import { useEffect, useMemo, useState } from "react";
import { Col, Row, Card, Image, Table, List, Button ,Badge,Space  } from "antd";
import { FaSearch, FaFilter, FaCaretDown, FaEye } from "react-icons/fa";
import { useNavigate, useParams , useLocation } from "react-router";
// import { ImageUrl } from "../../config/helper";
import { useDispatch , useSelector } from 'react-redux'
import { getUserOrders } from "../../../redux/thunk/authSlice"
const DropzoneFiltercards = () => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch()
  const token = useSelector((state) => state?.user?.data?.token);
  const {  userOrder } = useSelector((state) => state.order)
  const ImageURL = 'https://react.customdev.solutions:3021/'

  // const { _id } = state

  const getUserOrder = async () => {
    const data = {
      token,
      id
    }
    const userOrder = await  dispatch(getUserOrders(data)).unwrap()
    setOrderDetails(userOrder?.data?.orders)  
  }

 
console.log("orderDetails",orderDetails)

  const datasource = useMemo(()=>{
    return [...orderDetails?.map((data, ind) => ({
      _id : data?._id,
      image : data?.services?.map(item => 
        (
            <Image
                preview={false}
                src={ImageURL+item?.categoryId?.catImage}
                width={"48px"}
                height={"48px"}
                style={{ objectFit: "contain" }}
              />
        )
      ),
      title : data.services.map(item => item.products.map(data => data.productId.title+" "+","+" " )),
      quantity : data.services.map(item => item.products.map(data => data.quantity+" "+","+" " ) ) ,
      status : data.status,
      price : data.grossTotal ,
      totalPrice : data.Total,
      orderNumbers : data.orderNumber,
      collectionData : data.collectionTime,
      delieveryData : data.DeliveryTime

    }))]
  },[orderDetails])


  useEffect(() => {
    getUserOrder()
    // setOrderDetails(datasource)
  },[])




  const columns = [
    {
      title: "Order NO",
      dataIndex: "orderNumbers",
      key: "orderNumbers",
      render: (value , item) => <span>{item?.orderNumbers ? item?.orderNumbers : "Not Availble"}</span> 
    },
    {
      title: "PRODUCT",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "COLLECTION DATE",
      dataIndex: "date",
      key: "date",
      render: (value , item) => <span>{item?.collectionData[0]?.date?.split('T')[0]}</span> 
    },
    {
      title: "COLLECTION TIME",
      dataIndex: "time",
      key: "date",
      render: (value , item) => <span>{item?.collectionData[0]?.time?.split('T')[0]}</span> 
    },
    {
      title: "DELIVERY DATE",
      dataIndex: "Cdate",
      key: "Cdate",
      render: (value , item) => <span>{item?.delieveryData[0]?.date?.split('T')[0]}</span> 
    },
    {
      title: "DELIVERY TIME",
      dataIndex: "Ctime",
      key: "Ctime",
      render: (value , item) => <span>{item?.delieveryData[0]?.time?.split('T')[0]}</span> 
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      render: (item) => 
      <span>
        <Space
            direction="vertical"
            size="middle"
            style={{
              width: '100%',
              padding: 16,
            }}
          >
            <Badge.Ribbon 
              text={item} 
              color={item?.toLowerCase() === 'pending' ? 'red' : item?.toLowerCase() === 'completed' ? 'green' : "blue"}
            >
              <Card size="small" style={{ backgroundColor:"white"}}>

              </Card>
            </Badge.Ribbon>
          </Space>
      
      </span>,
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (item) => <span>${item}</span>,
    },
    {
        title: "ACTION",
        dataIndex: "_id",
        key: "_id",
        render: (item) => (
          <FaEye
            style={{ fontSize: "16px", color: "#000",  cursor: "pointer" }}
               onClick={() => navigate("/userOrdersDetails/" + item )}
          />
        ),
      },
  ];
  return (
    <div className="shop-page">
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Col xs={23} md={21}>
          <div className="shop-page-main">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={24} lg={24} xl={24}>
                <div className="my-account-profile">
                  <section className="side-menu-parent">
                    <div className="about-us-section">
                      <div className="profile-information-wrapper">
                        <h3 className="main-heading">My Orders</h3>
                      </div>
                      <div className="bg-paren">
                        <Row justify="center">
                          <Col xs={24} md={24} xl={24}>
                            <Card className="orderDetails">
                              <div className="boxDetails">
                                <Row
                                  gutter={[16, 16]}
                                  style={{ padding: 20, overflow: "auto" }}
                                  justify={"center"}
                                >
                                  <Col lg={18}>
                                    <Table
                                      className="styledTable2"
                                      dataSource={datasource}
                                      columns={columns}
                                      pagination={false}
                                    />
                                  </Col>
                                  {/* <Col lg={6}>
                                    <div className="summary">
                                      <h5>SUMMARY</h5>
                                      <div className="summaryinner">
                                        <List itemLayout="horizontal">
                                          <List.Item>
                                            <List.Item.Meta
                                              title={
                                                <div className="summaryList">
                                                  <span>Subtotal</span>
                                                  <span>100</span>
                                                </div>
                                              }
                                            />
                                          </List.Item>
                                          <List.Item>
                                            <List.Item.Meta
                                              title={
                                                <div className="summaryList">
                                                  <span>Tax 0%</span>
                                                  <span>5%</span>
                                                </div>
                                              }
                                            />
                                          </List.Item>
                                          <List.Item>
                                            <List.Item.Meta
                                              title={
                                                <div className="summaryList">
                                                  {" "}
                                                  <span>Grand Total</span>{" "}
                                                  <span>321</span>
                                                </div>
                                              }
                                            />
                                          </List.Item>
                                        </List>

                                        <Button
                                            className="mainbtn"
                                            onClick={() =>
                                              navigate("/steps")
                                            }
                                          >
                                            Proceed To Checkout
                                          </Button>
                                      </div>
                                    </div>
                                  </Col> */}
                                </Row>
                              </div>
                            </Card>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </section>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DropzoneFiltercards;
