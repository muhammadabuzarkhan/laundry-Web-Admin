import {
  Col,
  Image,
  Layout,
  Row
} from "antd";
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Get } from "../../config/api/get";
import { USERS , ADMIN  , CATEGORIES , SUBCATEGORIES , ORDER , PRODUCTS , QUERY} from "../../config/constants";
import { ImageUrl } from "../../config/functions";


ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);
ChartJS.register(Tooltip);




export default function Dashboard() {
  const token = useSelector((state) => state?.user?.data?.token);
  const [stats, setStats] = useState(0);
  const [catstats, setcatStats] = useState(0);
  const [subcatstats, Setsubcatstats] = useState(0);
  const [productstats, Setproductstats] = useState(0);
  const [orderstats, Setorderstats] = useState(0);
  const [querystats, Setquerystats] = useState(0);
  const [tstats, settStats] = useState(0);

  const [subscriptions, setSubscriptions] = useState([]);
  // const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const Months = ["Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"]

  // const data = {
  //   labels: orders.map(item => Months[parseInt(item.month.split("-")[1]) - 1] + " " + item.month.split("-")[0]),
  //   datasets: [
  //     {
  //       label: "Total Sales",
  //       data: orders.map(item => item.count),
  //       fill: true,
  //       backgroundColor: "rgba(157,98,245,0.2)",
  //       borderColor: "#000",
  //       pointRadius: 3,
  //     },
  //   ],
  // };

  // const options = {
  //   maintainAspectRatio: false,
  //   responsive: true,
  //   scales: {
  //     y: {
  //       title: {
  //         display: true,
  //         text: "Total Users",
  //         color: "#000000",
  //       },
  //       min: 0,
  //     },
  //     x: {
  //       title: {
  //         display: true,
  //         text: "Months",
  //         color: "#000000",
  //       },
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: 'top',
  //     },
  //   },
  // };

  const data2 = {
    labels: subscriptions.map(item => Months[parseInt(item.month.split("-")[1]) - 1] + " " + item.month.split("-")[0]),
    datasets: [
      {
        label: "Users",
        data: subscriptions.map(item => item.totalAmount),
        fill: true,
        backgroundColor: "rgba(157,98,245,0.2)",
        borderColor: "#000",
        pointRadius: 3,
      },
    ],
  };

  const options2 = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Amount",
          color: "#FFFFFF",
        },
        min: 0,
      },
      x: {
        title: {
          display: true,
          text: "Durations",
          color: "#FFFFFF",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  

  useEffect(() => {
    getallUsers();
    getallCategory();
    getallSubCategory();
    getallProducts();
    getallOrders();
    getallQuery();
    // getSubscriptionChart();
    // getUsersChart();
  }, []);


  const getallUsers = async () => {
    setLoading(true);
    try {
      const response = await Get(USERS.getAllUsers , token);
      setLoading(false);
      setStats(response.total);

    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getallCategory = async () => {
    setLoading(true);
    try {
      const response = await Get(CATEGORIES.getAllCategories , token);
      setLoading(false);
      setcatStats(response.total);

    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getallSubCategory = async () => {
    setLoading(true);
    try {
      const response = await Get(SUBCATEGORIES.getAllsubCategories , token);
     
      setLoading(false);
      Setsubcatstats(response.total);

    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  const getallProducts = async () => {
    setLoading(true);
    try {
      const response = await Get(PRODUCTS.getall , token);
     
      setLoading(false);
      Setproductstats(response.total);

    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getallOrders = async () => {
    setLoading(true);
    try {
      const response = await Get(ORDER.getall , token);
      setLoading(false);
      Setorderstats(response.total);

    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getallQuery = async () => {
    setLoading(true);
    try {
      const response = await Get(QUERY.getall , token);
     
      setLoading(false);
      Setquerystats(response.total);

    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  const getsPORTSStats = async () => {
    setLoading(true);
    try {
      const response = await Get(CATEGORIES.getAllCategories);
      setLoading(false);

      console.log("response===>", response)

      settStats(response.total);

    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getSubscriptionChart = async () => {
    setLoading(true);
    try {
      const response = await Get(ADMIN.getSubscriptionChart, token);
      setLoading(false);
      if (response?.status) {
        setSubscriptions(response?.data);
      } else {
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  // const getUsersChart = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await Get(ADMIN.getUsersChart, token);
  //     setLoading(false);
  //     console.log("response", response);
  //     if (response?.status) {
  //       setOrders(response?.data);
  //     } else {
  //       console.log("error====>", response);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     setLoading(false);
  //   }
  // };

  return (
    <Layout className="configuration">
      {/* ================================ROW ONE START========================================= */}
      <Row gutter={[20, 10]} >
        <Col xs={24} md={8}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={6}>
                <div class="analyticsIcon">
                  <Image preview={false} src={ImageUrl('totaluserimage.png')} style={{ fontSize: "60px", color: 'black' }} />
                </div>
              </Col>
              <Col xs={15} md={18}>
              <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                  TOTAL USERS</h6>
                <h6 class="analyticsText" style={{ margin: 0 }}>
                  {stats || 0}
                </h6>
              </Col>
            </Row>
          </div>
        </Col>
        {/* <Col xs={24} md={8}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={8}>
                <div class="analyticsIcon">
                  <Image preview={false} src={ImageUrl('stat-icon-2.png')} style={{ fontSize: "60px", color: 'black' }} />
                </div>
              </Col>
              <Col xs={15} md={16}>
                <h6 class="analyticsText" style={{ margin: 0 }}>
                  {stats?.totalSubscription || 0}
                </h6>
                <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                  SUBSCRIPTIONS
                </h6>
              </Col>
            </Row>
          </div>
        </Col> */}
        <Col xs={24} md={8}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={6}>
                <div class="analyticsIcon">
                  <Image preview={false} src={ImageUrl('totalsalesimage.png')} style={{ fontSize: "60px", color: 'black' }} />
                </div>
              </Col>
              <Col xs={15} md={18}>
                <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                  TOTAL CATEGORY
                </h6>
                <h6 class="analyticsText" style={{ margin: 0 }}>
                   {catstats || 0}
                </h6>
                
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={6}>
                <div class="analyticsIcon">
                  <Image preview={false} src={ImageUrl('totalsalesimage.png')} style={{ fontSize: "60px", color: 'black' }} />
                </div>
              </Col>
              <Col xs={15} md={18}>
                <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                  TOTAL SUB-CATEGORY
                </h6>
                <h6 class="analyticsText" style={{ margin: 0 }}>
                   {subcatstats || 0}
                </h6>
                
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <br />
      <br />
      <Row gutter={[20, 10]} >
        <Col xs={24} md={8}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={6}>
                <div class="analyticsIcon">
                  <Image preview={false} src={ImageUrl('totaluserimage.png')} style={{ fontSize: "60px", color: 'black' }} />
                </div>
              </Col>
              <Col xs={15} md={18}>
              <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                  TOTAL PRODUCTS</h6>
                <h6 class="analyticsText" style={{ margin: 0 }}>
                  {productstats || 0}
                </h6>
              </Col>
            </Row>
          </div>
        </Col>
        {/* <Col xs={24} md={8}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={8}>
                <div class="analyticsIcon">
                  <Image preview={false} src={ImageUrl('stat-icon-2.png')} style={{ fontSize: "60px", color: 'black' }} />
                </div>
              </Col>
              <Col xs={15} md={16}>
                <h6 class="analyticsText" style={{ margin: 0 }}>
                  {stats?.totalSubscription || 0}
                </h6>
                <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                  SUBSCRIPTIONS
                </h6>
              </Col>
            </Row>
          </div>
        </Col> */}
        <div style={{ paddingTop:15}}> </div>
        <Col xs={24} md={8}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={6}>
                <div class="analyticsIcon">
                  <Image preview={false} src={ImageUrl('totalsalesimage.png')} style={{ fontSize: "60px", color: 'black' }} />
                </div>
              </Col>
              <Col xs={15} md={18}>
                <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                  TOTAL QUERY
                </h6>
                <h6 class="analyticsText" style={{ margin: 0 }}>
                   {querystats || 0}
                </h6>
                
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={6}>
                <div class="analyticsIcon">
                  <Image preview={false} src={ImageUrl('totalsalesimage.png')} style={{ fontSize: "60px", color: 'black' }} />
                </div>
              </Col>
              <Col xs={15} md={18}>
                <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                  TOTAL ORDER
                </h6>
                <h6 class="analyticsText" style={{ margin: 0 }}>
                   {orderstats || 0}
                </h6>
                
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      {/* ================================ROW ONE END========================================= */}
      <br />
      {/* ================================ROW TWO START========================================= */}
      {/* <Row gutter={[20, 10]}>
        <Col xs={24}>
          <div class="boxDetails" style={{ padding: "30px" }}>
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={24} md={12}>
                <h5 class="sectionTitle">Subscriptions</h5>
              </Col>

            </Row>
            <Row style={{ minHeight: "400px", overflowX: "auto" }}>
              <div style={{ minWidth: "600px", width: "100%" }}>
                <Line options={options} data={data} />
              </div>
            </Row>
          </div>
        </Col>
      </Row> */}

      <br />
      {/* ================================ROW TWO START========================================= */}
      {/* <Row gutter={[20, 10]}>
        <Col xs={24}>
          <div class="boxDetails" style={{ padding: "30px", borderRadius: "12px" }}>
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={24} md={12} style={{color: "black"}}>
                <h5 class="sectionTitle">Earning Stats</h5>
              </Col>
            </Row>
            <Row style={{ minHeight: "400px", overflowX: "auto", background: "#007DE9", borderRadius: "12px"}}>
              <div style={{ minWidth: "600px", width: "100%" }}>
                <Line options={options2} data={data2} />
              </div>
            </Row>
          </div>
        </Col>
      </Row> */}
      <br />


      <br />
      <br />
    </Layout>
  );
}
