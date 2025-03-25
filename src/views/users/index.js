import React, { useEffect, useMemo, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Modal,
  Button,
  Popover,
  Layout,
  Checkbox,
  Skeleton,
  Table,
  Spin,
  Select,
  Image,
  Pagination,
  DatePicker,
  message
} from "antd";
import dayjs from "dayjs";
import { IoMdClose } from "react-icons/io";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaSearch, FaFilter, FaCaretDown, FaEye } from "react-icons/fa";
import ClientLayout from "../../components/ClientLayout";
import { Get } from "../../config/api/get";
import { ADMIN, USER, USERS } from "../../config/constants";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {DateFilterUsers , getAllUsers , searchUsers} from '../../redux/thunk/authSlice'
import { Post } from "../../config/api/post";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { ImageUrl } from "../../config/functions";
import { Put } from "../../config/api/put";
import { allusers } from '../../redux/slice/authSlice'

function UserManagement() {
  const token = useSelector((state) => state?.user?.data?.token);
  const allUserMang = useSelector((state) => state?.user?.users)
  const dispatch = useDispatch()
  console.log(token, "token")
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [textFilter , SettextFilter] = useState("")
  const [searchicon , Setsearchicon] = useState("")
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const imgs = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrUfiySJr8Org5W-oE2v3_i7VqufglYtSdqw&s'
  const ImageURL = 'https://react.customdev.solutions:3021/'
  const navigate = useNavigate();
  const [search , Setsearch] = useState("")
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
    getUsers();
  }, []);

  
  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getUsers(pageNumber);
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
    getUsers(paginationConfig.pageNumber, paginationConfig.limit, "", true);
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

    getUsers(1, pageSize);
  };
  
  const handleStatus = async () => {
    try {
      const response = await Put(
        `${USERS.toggleStatus}${selectedUser._id}`,
        token,
        { status: selectedUser.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
      );

      if (response?.status) {
        const updatedUsers = users.map((u) =>
          u._id === selectedUser._id ? { ...u, status: response?.data?.status } : u
        );
        setUsers(updatedUsers);
        setModalOpen(false);
      } else {
        console.error("Error toggling user status:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  }
  
  const handleTextSearch = async  (search) => {
    const searchedUser = await Get(USERS.searchText+search)
    setUsers(searchedUser.data.textfilter)
    
  }
  
 
  // console.log("users", users.map(item => item.isActive))
  const getUsers = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const data = {
        userToken : token
      }
      const response = await dispatch(getAllUsers(data)).unwrap()
      console.log("response999991======>",response);
      setLoading(false)
      if(response){
        setUsers(response?.getallUser)
      }
      // dispatch(allusers(response.getallUser))


    //   const response = await Get(USERS.getAllUsers, {}, 
    //   //   {
    //   //   page: pageNumber
    //   //     ? pageNumber.toString()
    //   //     : paginationConfig.pageNumber.toString(),
    //   //   limit: pageSize
    //   //     ? pageSize.toString()
    //   //     : paginationConfig.limit.toString(),
    //   //   status: reset ? "" : filter.status || null,
    //   //   keyword: search ? search : null,
    //   //   from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
    //   //   to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
    //   // }
    // );
    //   console.log(response);
    //   setLoading(false);
    //   console.log("response", response);
    //   if (response) {
    //     setUsers(response?.data?.allusers);
    //     // setPaginationConfig({
    //     //   pageNumber: response?.data?.page,
    //     //   limit: response?.data?.limit,
    //     //   totalDocs: response?.data?.totalDocs,
    //     //   totalPages: response?.data?.totalPages,
    //     // });
    //   } else {
    //     message.error("Something went wrong!");
    //     console.log("error====>", response);
    //   }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  console.log("222222",users);

  const getUsersByDateFilter = async () => {
    let fromDate = new Date(filter.from).toISOString().split('T')[0]
    let toDate = new Date(filter.to).toISOString().split('T')[0]
    const searchWithDate = await Get(`${USERS.datefilter}?fromDate=${fromDate}&toDate=${toDate}`)
    setUsers(searchWithDate.data.allUsers)
  }



  const onTextSearch = async () => {

    const Searchdata = {
      text : textFilter,
      token : token
    }
    const searched = await dispatch(searchUsers(Searchdata)).unwrap()
   
    const {status , data } = searched
    if(status){
      Setsearchicon(data?.AlreadyService)
      setUsers(data?.AlreadyService)
    }
  }

  const handleDateFilter = async () => {
    console.log("filter.to", new Date(filter.to).toISOString() , "filter.from" , new Date(filter.from).toISOString());
    let fromDate = new Date(filter.from).toISOString().split('T')[0]
    let toDate = new Date(filter.to).toISOString().split('T')[0]

    const userData = {
      fromDate,
      toDate
    }
    const datas  = {
      token : token,
      userData : userData
    }
    const dateFilter = await dispatch(DateFilterUsers(datas)).unwrap()

    const {status , data } = dateFilter

    if(status){
      setUsers(data?.datefilter);
    }

  }


  console.log("paginationConfig", paginationConfig);

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
      title: "S.NO.",
      dataIndex: "key",
      key: "key",
      width: 100,
      render: (value, item, index) => (index < 10 && "0") + (index + 1),
    },
    {
      title: "FULL NAME",
      dataIndex: "fullName",
      key: "fullName",
      render: (value, item) => 
      <>
      { 
      !item.firstName && !item.lastName ? // USer Name
      "" :
      `${item.firstName} ${item.lastName}`
      } 
      </>
       ,
    },
    {
      title: "EMAIL ADDRESS",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
      render: (value, item) => 
      <>
      { 
      (
        <img src={
          !item.image ? 
          imgs :
          ImageURL+item.image
        } 
        className="img-fluid"
        style={{
          maxHeight:'50px',  objectFit:'cover', objectPosition:'center' , 
          'max-width': '50px'  , 'border-radius': '100px' 
          }}
        />
      )
      } 
      </>
       ,
    },
    // {
    //   title: "Verification",
    //   dataIndex: "is_verified",
    //   key: "is_verified",
    //   render: (value, item, index) => <>{value ? <FaCheck style={{color:'green'}} /> : <ImCross style={{color:'red'}} />}</>
    // },
    // {
    //   title: "Subscription",
    //   dataIndex: "subscriptionid",
    //   key: "subscriptionid",
    //   render: (value, item, index) => value?.subscriptiontype ,
    // },
    
    {
      title: "REGISTRATION DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
    },
    // {
    //   title: "STATUS",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status, item, index) => (
    //     <Select
    //       className={status === "ACTIVE" ? "greenSelect" : "redSelect"}
    //       suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
    //       value={status}
    //       bordered={false}
    //       onChange={() =>{ 
    //         // handleStatus(users[index])
    //         setModalOpen(true);
    //         setSelectedUser(users[index]);
    //       }} // Call toggleUserStatus function on status change
    //       options={[
    //         {
    //           value: "ACTIVE",
    //           label: "Active",
    //         },
    //         {
    //           value: "INACTIVE",
    //           label: "Inactive",
    //         },
    //       ]}
    //     />
    //   ),
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (value, item, index) => (
    //     <Select
    //       className={value ? "greenSelect" : "redSelect"}
    //       suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
    //       value={value}
    //       bordered={false}
    //       onChange={() => {
    //         setModalOpen(true);
    //         setSelectedUser(users[index]);
    //       }}
    //       options={[
    //         {
    //           value: "ACTIVE",
    //           label: "Active",
    //         },
    //         {
    //           value: "INACTIVE",
    //           label: "Inactive",
    //         },
    //       ]}
    //     />
    //   ),
    // },
    // {
    {
      title: "ACTION",
      dataIndex: "_id",
      key: "_id",
      render: (item) => (
        <FaEye
          style={{ fontSize: "16px", color: "#000",  cursor: "pointer" }}
             onClick={() => navigate("/userOrders/" + item  )}
        />
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

        {/* <p className="mainLabel">Filter by Status:</p>

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
            { value: "ACTIVE", label: "Active" },
            { value: "INACTIVE", label: "Inactive" },
          ]}
        /> */}

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => 
            handleDateFilter()
            }
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
          <h1 className="pageName">USER MANAGEMENT</h1>
        </Row>

        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
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
            md={12}
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
              onChange={(e) => SettextFilter(e.target.value)}
              value={textFilter ? textFilter : null}
              suffix={
                
                  !searchicon ?
                  (
                    <>
                      <FaSearch
                          style={{
                            color: "#000",
                            fontSize: 16,
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            // getCategories(1, paginationConfig.limit, filter.keyword)

                            onTextSearch()
                          }
                        />
                    </>
                  )
                  :
                  (
                    <IoMdClose 
                        style={{
                          color: "#000",
                          fontSize: 16,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          {
                            getUsers()
                          SettextFilter("")
                          Setsearchicon()
                          }
                        }
                      />
                  )
                
                
              }
              onPressEnter={(e) =>
                getUsers(1, paginationConfig.limit, filter.keyword)
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
              dataSource={users}
              columns={columns}
              pagination={false}
            />
          )}
        </Row>
        <Row style={{ padding: "10px 20px" }}>
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
        </Row>
        <br />
      </div>
      <br />
      <br />
      <Modal
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
        Do You Want To  {selectedUser?.isActive ? "Deactivate" : "Activate"} This User?
        </Typography.Text>
      </Modal>
    </Layout>
  );
}

export default UserManagement;
