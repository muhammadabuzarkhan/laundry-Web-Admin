import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography, Input,
  Modal,
  Button,
  Popover,
  Layout, Skeleton,
  Table, Select,
  Image,
  Pagination,
  DatePicker
} from "antd";
import { FaSearch, FaFilter, FaEye, FaTrash } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { Delete } from "../../config/api/delete";
import { PLANS, UPLOADS_URL } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ImageUrl } from "../../config/functions";
import swal from "sweetalert";



function Plans() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  console.log(token, "token")
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });

  const [filter, setFilter] = useState({
    status: null,
    keyword: "",
    from: null,
    to: null,
  });

  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = `Showing records ${endIndex} of ${paginationConfig.totalDocs}`;

  useEffect(() => {
    getAllPlans();
  }, []);

  

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getAllPlans(pageNumber);
  };

  const handleSearch = (value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
  };

  const handleStatusChange = (value) => {
    setFilter({
      ...filter,
      status: value,
    });
  };

  const resetFilter = () => {
    setFilter({
      status: null,
      keyword: "",
      from: null,
      to: null,
    });
    getAllPlans(paginationConfig.pageNumber, paginationConfig.limit, "", true);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleFrom = (date) => {
    setFilter({
      ...filter,
      from: date,
    });
  };

  const handleTo = (date) => {
    setFilter({
      ...filter,
      to: date,
    });
  };

  const handleLimitChange = (pageSize) => {
    setPaginationConfig({
      ...paginationConfig,
      limit: pageSize,
      current: 1,
    });

    getAllPlans(1, pageSize);
  };

  const handleStatus = async () => {
    try {
      const index = plans.findIndex((user) => user._id == selectedUser._id);

      console.log(index)
      const response = await Get(PLANS.toggleStatus + "/" + selectedUser._id , token,{});
      const newUsers = [...plans];
      
      console.log(">>>>",newUsers[index].isActive)
      console.log(">>>>",selectedUser.isActive)
      newUsers[index].isActive = !selectedUser.isActive;
      setModalOpen(false);
      setPlans(newUsers);
    } catch (error) {
      console.log(error.message);
    }  
    
  };
  

  const getAllPlans = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const response = await Get(PLANS.getAllPlans, {}, {
        page: pageNumber
        ? pageNumber.toString()
        : paginationConfig.pageNumber.toString(),
        limit: pageSize
          ? pageSize.toString()
          : paginationConfig.limit.toString(),
        keyword: search ? search : null,
        from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
        to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
      });
      setLoading(false);
      console.log("csss", response);
      if (response) {
        setPlans(response?.subscriptions?.docs);
        setPaginationConfig({
          pageNumber: response?.subscriptions?.page,
          limit: response?.subscriptions?.limit,
          totalDocs: response?.subscriptions?.totalDocs,
          totalPages: response?.subscriptions?.totalPages,
        });
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  console.log("paginationConfig", paginationConfig);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteButtonClick = (item) => {
    setDeleteModalOpen(true);
    console.log(item);
    setSelectedPlan(item);
  };

  const deletePlan = () => {
    setLoading(true);
    Delete(PLANS.deletePlan + selectedPlan, token)    
      .then((response) => {
        setLoading(false);
        console.log(response, "response");
        if (response) {
          swal(response.msg);
          setDeleteModalOpen(false);
          setPlans(plans.filter(plan => plan._id !== selectedPlan));
        } else {
          console.error(response?.data?.message);
          // Handle error
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error.message);
        // Handle error
      });
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const columns = [
    {
      title: "S.NO",
      dataIndex: "key",
      key: "key",
      width: 100,
      render: (value, item, index) => (index < 10 && "0") + (index + 1),
    },
    {
      title: "Name",
      dataIndex: "planname",
      key: "planname",
    },
    {
        title: "Amount",
        dataIndex: "planprice",
        key: "planprice",
        render: (value, item, index) => <>$ {value}</>,

      },
      {
        title: "Plan Type",
        dataIndex: "plantype",
        key: "plantype",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
      },
      {
        title: "Duration",
        dataIndex: "planduration",
        key: "planduration",
        render: (item) => <span>{item} Days</span>,

      },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (item) => (
        <div style={{display: "flex", alignItems: "center"}}>
      <div className="view-link" onClick={() => navigate("/plans/" + item)}>
        <FaEye style={{ fontSize: "16px", color: "black" }} />
      </div>
      <div className="delete-link" style={{marginLeft: "10px"}} onClick={() => handleDeleteButtonClick(item)}>
        <FaTrash style={{ fontSize: "16px", color: "red" }} />
      </div>
    </div>
      ),
    },
  ];

  const filterContent = (
    <div className="filterDropdown">
      <div>
        <p className="mainLabel" style={{ padding: "10px" }}>
          Filter
        </p>
      </div>
      <hr style={{ margin: 0 }} />

      <div className="filterDropdownBody">
        <p className="mainLabel">Creation Date:</p>
        <DatePicker
          className="mainInput filterInput"
          value={filter.from}
          onChange={(e) => handleFrom(e)}
        />
        <DatePicker
          className="mainInput filterInput"
          value={filter.to}
          onChange={(e) => handleTo(e)}
        />

        <p className="mainLabel">Filter by Status:</p>

        <Select
          size={"large"}
          className="filterSelectBox"
          placeholder="Select Status"
          value={filter.status}
          onChange={(e) => handleStatusChange(e)}
          style={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "left",
          }}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => getAllPlans()}
        >
          Apply
        </Button>
        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          className="mainButton primaryButton2"
          onClick={() => resetFilter()}
        >
          Clear All
        </Button>
      </div>
    </div>
  );

  return (
    <Layout className="configuration">
      <div className="boxDetails">
      <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
           <h1 className="pageName">SUBSCRIPTION MANAGEMENT</h1>
          </Col>
        </Row>
        {/* <Row style={{ padding: "10px 20px" }}>
          <h1 className="pageTitle">Movies</h1>
        </Row> */}

        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={8}>
            <h5 style={{ display: "inline", fontSize: 16,color:"black" }}>Show : </h5>
            <Select
              size={"large"}
              className="chartSelectBox"
              defaultValue={paginationConfig.limit}
              onChange={(e) => handleLimitChange(e)}
              style={{
                width: 70,
                textAlign: "left",
              }}
              options={[
                { value: 10, label: "10" },
                { value: 20, label: "20" },
                { value: 30, label: "30" },
                { value: 40, label: "40" },
                { value: 50, label: "50" },
              ]}
            />
            &emsp;
            <h5 style={{ display: "inline", fontSize: 16 }}>Entries</h5>
          </Col>
          <Col
            xs={24}
            md={8}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{padding: "12px 40px", height:'auto'}}
              className="mainButton loginBtn"
              onClick={() => navigate("/plans/addPlan")}
            >
              ADD PLAN
            </Button>
          </Col>
          <Col
            xs={24}
            md={8}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Input
              style={{ width: "250px" }}
              className="mainInput dashInput"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
              suffix={
                <FaSearch
                  style={{
                    color: "#000",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    getAllPlans(1, paginationConfig.limit, filter.keyword)
                  }
                />
              }
              onPressEnter={(e) =>
                getAllPlans(1, paginationConfig.limit, filter.keyword)
              }
            />
            &emsp;
            <Popover
              content={filterContent}
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
              placement="bottomRight"
              arrow={false}
            >
              <Button
                style={{
                  padding: "10px 15px",
                  height: "auto",
                }}
                className="fltr-btn"
              >
                <FaFilter style={{ fontSize: "16px", color: "white" }} />
              </Button>
            </Popover>
          </Col>
        </Row>

        <Row style={{ padding: 20, overflow: "auto" }}>
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
              className="styledTable"
              dataSource={plans}
              columns={columns}
              pagination={false}
            />
          )}
        </Row>
        {/* <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
            <p>{message}</p>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Pagination
              className="styledPagination"
              onChange={(e) => handlePageChange(e)}
              current={parseInt(paginationConfig.pageNumber)}
              pageSize={paginationConfig.limit}
              total={paginationConfig.totalDocs}
              itemRender={itemRender}
            />
          </Col>
        </Row> */}
        <br />
      </div>
      <br />
      <br />
      {/* <Modal
        visible={modalOpen}
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
          width={80}
          height={80}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          {selectedUser?.isActive ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
        Do You Want To  {selectedUser?.isActive ? "Deactivate" : "Activate"} This Service Provider?
        </Typography.Text>
      </Modal> */}

      <Modal
          open={deleteModalOpen}
          onOk={() => deletePlan()}
          onCancel={() => setDeleteModalOpen(false)}
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
        </Modal>
    </Layout>
  );
}

export default Plans;
