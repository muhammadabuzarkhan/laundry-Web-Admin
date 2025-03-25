

// import React from 'react'
import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  Image,
  Table,
  Badge,
  Skeleton,
  Spin,
} from "antd";
import { useNavigate, useParams } from "react-router";
import { useSelector , useDispatch } from "react-redux";
import { getUserOrderDetails } from '../../../redux/thunk/authSlice'
// import DashbordSidebar from "../../../components/DashboardSidebar";
// import OrderSummary from "../../../components/orderSummary";
import { useLocation } from "react-router-dom";
// import image1 from "../../../assets/gloves.png";
// import { myordersData } from "../../../components/Data/data";
import dayjs from "dayjs";
// import { Get } from "../../../config/api/get";
// import { UPLOADS_URL } from "../../config/constants";


const OrderDetails = () => {

    const token = useSelector((state) => state?.user?.data?.token);
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams();
    const  UPLOADS_URL = "https://react.customdev.solutions:3021/"
    const ShowOrderDetails = async () => {
        const data = {
            token,
            id
        }
        const showOrder =  await dispatch(getUserOrderDetails(data)).unwrap()
        if(showOrder.status){
            setLoading(false)
            setProducts(showOrder?.data?.orders)
        }
       
    }

    useEffect(() => {
        ShowOrderDetails()
    },[id])


    console.log("products",products);

    const columns = [
        {
          title: "Image",
          dataIndex: "image",
          key: "image",
          render: (value , item) => 
        
            item?.services?.map(image => {
                return(
                    <>
                     <Image
                    preview={false}
                    src={UPLOADS_URL + image?.categoryId?.catImage}
                    width={"48px"}
                    height={"48px"}
                    style={{ objectFit: "contain" }}
                        />
                    </>
                )
            })
        },
        {
          title: "PRODUCT",
          dataIndex: "title",
          key: "title",
          render: (value , item) => 
            item?.services?.map(image => {
                return(
                    <>
                     <p>{image?.products?.map(data => data?.productId?.title+" , ")}</p>
                    </>
                )
            })
        },
        {
          title: "QUANTITY",
          dataIndex: "quantity",
          key: "quantity",
          render: (value , item) => 
            item?.services?.map(image => {
                return(
                    <>
                     <p>{image?.products?.map(data => data?.quantity+" , ")}</p>
                    </>
                )
            })
        },
        {
          title: "UNIT PRICE",
          dataIndex: "grossTotal",
          key: "grossTotal",
          render: (item) => <span>${item}</span>,
        },
        {
          title: "Total",
          dataIndex: "Total",
          key: "Total",
          render: (item) => <span>${item}</span>,
        },
      ];

      let address1 = products[0]?.userid?.address?.address?.split(' ')
  return (
    <div>
        <div className="shop-page">
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Col xs={23} md={21}>
          <div className="shop-page-main">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={24} lg={24} xl={24}>
                <div className="my-account-profile">
                  <section className="side-menu-parent">
                    {/* <DashbordSidebar /> */}
                    <div className="about-us-section">
                      <div className="profile-information-wrapper">
                        <h3 className="main-heading">My Orders</h3>
                      </div>
                      <div className="bg-paren">
                        <Row justify="center">
                          {!loading ? (
                            <Col xs={24} md={24} xl={24}>
                              <Card className="orderDetails">
                                <Row
                                  gutter={30}
                                  style={{ marginBottom: "50px" }}
                                >
                                  <Col xs={24}>
                                    <h6 className="heading-18">Order Status</h6>
                                    <Badge.Ribbon
                                      text={orderDetails?.status}
                                      color={
                                        orderDetails?.status === "COMPLETED"
                                          ? "#00B31D"
                                          : orderDetails?.status === "PENDING"
                                          ? "#DD9F00"
                                          : orderDetails?.status === "ONGOING"
                                          ? "#2D308B"
                                          : "red"
                                      }
                                      placement="start"
                                    ></Badge.Ribbon>
                                  </Col>
                                </Row>
                                <Row gutter={30}>
                                  <Col xs={24} md={15} lg={17}>
                                    <h3>Order Information</h3>
                                    <h4>
                                      Order ID:{" "}
                                      {"#" + products[0]?.orderNumber}
                                    </h4>
                                    <h5>
                                      Order Date:{" "}
                                      {dayjs(products[0]?.createdAt).format(
                                        "M/D/YYYY"
                                      )}
                                    </h5>

                                    <h3>Account Information</h3>
                                    <h5>
                                      Customer Name:{" "}
                                      {products[0]?.userid?.firstName + " " + products[0]?.userid?.lastName}
                                    </h5>
                                    <h5>
                                      Email Address: {products[0]?.userid?.email}
                                    </h5>

                                    <h3>Billing Address</h3>
                                    <Row gutter={[16, 16]}>
                                      <Col lg={6}>
                                        <h6 className="heading-18">
                                          User Name
                                        </h6>
                                        <h5>{products[0]?.userid?.firstName + " " + products[0]?.userid?.lastName}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">
                                          Phone Number
                                        </h6>
                                        <h5>{products[0]?.userid?.phoneNumber}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">Address</h6>
                                        <h5>
                                          {
                                            products[0]?.userid?.address?.address
                                          }
                                        </h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">Country</h6>
                                        <h5>
                                          {
                                            "UK"
                                          }
                                        </h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">City</h6>
                                        <h5>
                                          {
                                          

                                              address1 [ address1?.length - 3] 
                                            }
                                        </h5>
                                      </Col>
                                      {/* <Col lg={6}>
                                        <h6 className="heading-18">State</h6>
                                        <h5>
                                          {orderDetails?.billingAddress?.state}
                                        </h5>
                                      </Col> */}
                                      <Col lg={6}>
                                        <h6 className="heading-18">Zipcode</h6>
                                        <h5>
                                          {
                                            products[0]?.userid?.address?.postcode
                                          }
                                        </h5>
                                      </Col>
                                    </Row>

                                    {/* <h3>Payment & Shipping</h3>

                                    <Row gutter={[16, 16]}>
                                      <Col lg={6}>
                                        <h6 className="heading-18">
                                          User Name
                                        </h6>
                                        <h5>{orderDetails?.customerName}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">
                                          Phone Number
                                        </h6>
                                        <h5>{orderDetails?.phone}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">Address</h6>
                                        <h5>
                                          {
                                            orderDetails?.shippingAddress
                                              ?.address
                                          }
                                        </h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">Country</h6>
                                        <h5>
                                          {
                                            orderDetails?.shippingAddress
                                              ?.country
                                          }
                                        </h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">City</h6>
                                        <h5>
                                          {orderDetails?.shippingAddress?.city}
                                        </h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">State</h6>
                                        <h5>
                                          {orderDetails?.shippingAddress?.state}
                                        </h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">Zipcode</h6>
                                        <h5>
                                          {
                                            orderDetails?.shippingAddress
                                              ?.zipCode
                                          }
                                        </h5>
                                      </Col>
                                    </Row> */}

                                  </Col>
                                  <Col xs={24} md={9} lg={7}>
                                    {/* <OrderSummary
                                      subTotal={orderDetails?.totalPrice}
                                    /> */}
                                  </Col>
                                </Row>
                                <div className="boxDetails">
                                  <Row
                                    style={{ padding: 20, overflow: "auto" }}
                                  >
                                    {loading ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          width: "100%",
                                        }}
                                      >
                                        <Skeleton active />
                                        <br />
                                      </div>
                                    ) : (
                                      <Table
                                        className="styledTable2"
                                        dataSource={products}
                                        columns={columns}
                                        pagination={false}
                                      />
                                    )}
                                  </Row>
                                </div>
                              </Card>
                            </Col>
                          ) : (
                            <Col
                              xs={24}
                              md={24}
                              xl={24}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "150px 0px",
                              }}
                            >
                              <Spin />
                            </Col>
                          )}
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
    </div>
  )
}

export default OrderDetails
