import React, { useEffect, useState } from "react";
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
  message,
} from "antd";
import dayjs from "dayjs";
import swal from "sweetalert";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { IoMdClose } from "react-icons/io";
import { FaSuperscript , FaSearch, FaFilter, FaCaretDown, FaEye, FaTrash, FaEdit} from "react-icons/fa";
import ClientLayout from "../../components/ClientLayout";
import { Get } from "../../config/api/get";
import { Delete } from "../../config/api/delete";
import { CATEGORIES, UPLOADS_URL } from "../../config/constants";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImageUrl } from "../../config/functions";
import { dateAndStatusFilter , searchProducts,softDeleteProducts , getallServices , getProductsWithCategory ,getallProducts } from '../../redux/thunk/serviceSlice'
function Categories() {
  const token = useSelector((state) => state?.user?.data?.token);
  const imgs = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrUfiySJr8Org5W-oE2v3_i7VqufglYtSdqw&s'
  const ImageURL = 'https://react.customdev.solutions:3021/'
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textFilter , SettextFilter] = useState("")
  const [searchicon , Setsearchicon] = useState("")
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cat , Setcat ] = useState([])
  const [selectedCat , SetselectedCat] = useState("")
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch()
 
    const [filter, setFilter] = useState({
    status: null,
    keyword: "",
    from: null,
    to: null,
    name : "",
    id : ""
  });

  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = `Showing records ${endIndex} of ${paginationConfig.totalDocs}`;

  useEffect(() => {
    getCategories();
  }, []);



  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getCategories(pageNumber);
  };

  const handleSearch = (value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
  };

  const handleStatusChange = (values , label) => {
   
    setFilter({
      ...filter,
      id: values,
      name: label.label,
    });

  };

  const resetFilter = () => {
    setFilter({
      status: null,
      keyword: "",
      from: null,
      to: null,
      name: "",
      id: "",
    });
    SetselectedCat("")
    // setFilter({
    //     ...filter,
    //     name: "",
    //     id: "",
    //   });
      

     

    getCategories(
      paginationConfig.pageNumber,
      paginationConfig.limit,
      "",
      true
    );
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };


  console.log("selectedCat======>",filter);
  
  const handleFilterByCategory = async () => {
   
    const data = {
        id : filter.id ,
        token : token
    }
    const response = await dispatch(getProductsWithCategory(data)).unwrap()
    SetselectedCat(response?.selectedProducts)
    setCategories(response?.selectedProducts)
  }

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

    getCategories(1, pageSize);
  };


  const getCategories = async (
    pageNumber,
    pageSize,
    search,
    reset = false
  ) => {
    setLoading(true);
    try {

     
      //const response = await    Get(CATEGORIES.getAllCategories,token 
      //   {
      //   page: pageNumber
      //     ? pageNumber.toString()
      //     : paginationConfig.pageNumber.toString(),
      //   limit: pageSize
      //     ? pageSize.toString()
      //     : paginationConfig.limit.toString(),
      //   status: reset ? "" : filter.status || null,
      //   keyword: search ? search : null,
      //   from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
      //   to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
      // }
   // );

    const data = {
        token : token
    }
    const response = await dispatch(getallProducts(data)).unwrap()
      setLoading(false);
      console.log("response======>", response);
      if (response) {
        setCategories(response?.selectedProducts);
        // setPaginationConfig({
        //   pageNumber: response?.data?.page,
        //   limit: response?.data?.limit,
        //   totalDocs: response?.data?.totalDocs,
        //   totalPages: response?.data?.totalPages,
        // });
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getAllCategories = async () => {
    const response = await dispatch(getallServices(token)).unwrap()
    
   
     const datas = response?.allcategory?.map((names) =>({
        value: names._id,
        label: names.title

     }))
    
     Setcat(datas)
  }



  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteButtonClick = (item) => {
    setDeleteModalOpen(true);
    console.log(item);
    setSelectedCategory(item);
  };

  const deleteCategory = async () => {
    console.log("selectedCategory",selectedCategory);
    const {_id  , status , ...others  } = selectedCategory
    
    let userData
    if(status == "Active"){
        userData = {status : "inActive"}
    } else if (status == "inActive"){
       userData = {status : "Active"}
    }
   
    const data = {
      id : _id,
      token : token,
      userData : userData
    }
    const resp = await dispatch(softDeleteProducts(data)).unwrap()
    console.log("=========>" , resp);

    if(resp?.status){
      setDeleteModalOpen(false)
      getCategories();
    }else{
      message.error(resp?.message)
    }

  };

  const onTextSearch = async () => {

    const Searchdata = {
      text : textFilter,
      token : token
    }
    const searched = await dispatch(searchProducts(Searchdata)).unwrap()
    const {status , data } = searched
    if(status){
      Setsearchicon(data?.selectedProducts)
      setCategories(data?.selectedProducts)
    }
    else{
      getCategories();
    }
  }

  const handleDateFilter = async () => {
    console.log("filter.to", new Date(filter.to).toISOString() , 
    "filter.from" , new Date(filter.from).toISOString(),
  "filter.id",filter.id
  );
    let fromDate = new Date(filter.from).toISOString().split('T')[0] ? new Date(filter.from).toISOString().split('T')[0] : null
    let toDate = new Date(filter.to).toISOString().split('T')[0] ? new Date(filter.to).toISOString().split('T')[0] : null
    let id = filter.id

    let userData;

    if(fromDate && toDate && id){
      userData = { fromDate, toDate, id }
    } 
    else if(fromDate && toDate){
        userData = {fromDate,toDate }
  }else if(id){
     userData = {id}
  }

    
    const datas  = {
      token : token,
      userData : userData
    }

    console.log("datas",datas);

    const dateFilter = await dispatch(dateAndStatusFilter(datas)).unwrap()

    const {status , data } = dateFilter

    if(status){
      setCategories(data?.datefilter);
    }

  }
console.log("filter?.name",filter?.name);

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
      title: "S.N0",
      dataIndex: "key",
      key: "key",
      render: (value, item, index) => (index < 9 && "0") + (index + 1),
    },
    // {
    //   title: "IMAGE",
    //   dataIndex: "image",
    //   key: "image",
    //   width: 100,
    //   render: (item) => <Image preview={false} src={`${UPLOADS_URL}Uploads/${item}`} width={"48px"} height={"48px"} style={{objectFit:"contain"}} />,
    // },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      render: (value, item, index) => value,
    },
    {
        title: "PRICE",
        dataIndex: "price",
        key: "price",
        render: (value, item, index) => value,
      },
      {
        title: "WEIGHT",
        dataIndex: "weight",
        key: "weight",
        render: (value, item, index) => value,
      },
      {
        title: "SUBCATEGORY",
        dataIndex: "subCatName",
        key: "subCatName",
        render: (value, item, index) => value,
      },
    {
        title: "CATEGORY",
        dataIndex: "catId",
        key: "catId",
        render: (value, item, index) => <span> {(item ? item?.category?.title : null)}</span> 
      },
    {
      title: "CATEGORY IMAGE",
      dataIndex: "catImage",
      key: "catImage",
      render: (value, item) => 
      <>
      { 
      (
        <img src={
            item?.category?.catImage ?
          ImageURL+item?.category?.catImage :
          imgs
        } 
        className="img-fluid"
        style={{maxHeight:'50px',  objectFit:'cover', objectPosition:'center'}}
        />
      )
      } 
      </>
       ,
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
    },

    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (value , item) => (
        <div style={{display: "flex", alignItems: "center"}}>
      <div 
        className="view-link" 
        onClick={() => navigate("/product/editProduct/" + item?._id)}
        >
        <FaEdit style={{ fontSize: "16px", color: "black" }} />
      </div>
      <div 
        className="delete-link" 
        style={{marginLeft: "15px"}} 
        onClick={() => handleDeleteButtonClick(item)}
        >
        <FaTrash style={{ fontSize: "16px", color: "red", cursor: "pointer" }}/>
      </div>
    </div>
      ),
    },
   
    {
      // title: "Action",
      // dataIndex: "_id",
      // key: "_id",
    //   render: (item) => (
    //     <div style={{display: "flex", alignItems: "center"}}>
    //   <div className="view-link" onClick={() => navigate("/categories/editCategory/" + item)}>
    //     <FaEdit style={{ fontSize: "16px", color: "black" }} />
    //   </div>
    //   <div className="delete-link" style={{marginLeft: "10px"}} onClick={() => handleDeleteButtonClick(item)}>
    //     <FaTrash style={{ fontSize: "16px", color: "red", cursor: "pointer" }}/>
    //   </div>
    // </div>
    //   ),
    },
    // {
    //   title: "ACTION",
    //   dataIndex: "_id",
    //   key: "_id",
    //   render: (item) => (
    //     <FaTrash
    //       style={{ fontSize: "16px", color: "red", cursor: "pointer" }}
    //       onClick={() => handleDeleteButtonClick(item)}
    //     />
    //   ),
    // },
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
          value={filter.from ? filter.from : null}
          onChange={(e) => handleFrom(e)}
        />
        <DatePicker
          className="mainInput filterInput"
          value={filter.to ? filter.to : null}
          onChange={(e) => handleTo(e)}
        />

        <p className="mainLabel">Filter by Category:</p>

        <Select
          size={"large"}
          className="filterSelectBox"
          placeholder="Select Status"
          value={filter.id ? filter?.name : null}
          onChange={(e , v) => {
            handleStatusChange(e , v)
           
            }}
          style={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "left",
          }}
          options={cat}
        />

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() =>
             
            //  !open ?
            //  getCategories() :
            //  handleFilterByCategory()

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

  useEffect(() => {
    getAllCategories();
  }, [open]);
  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageName">PRODUCT MANAGEMENT</h1>
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
            <Button

              type="primary"
              shape="round"
              size={"large"}
              style={{padding: "12px 40px", height:'auto'}}
              className="mainButton loginBtn"
              onClick={() => navigate("/product/addProduct")}
            >
              ADD PRODUCT
            </Button>
          </Col>
        </Row>
        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
            <h5 style={{ display: "inline", fontSize: 16, color: 'black' }}>Show : </h5>
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
                            getCategories()
                          SettextFilter("")
                          Setsearchicon()
                          }
                        }
                      />
                  )
                
                
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
                  backgroundColor: "#007DE9",
                }}
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
              dataSource={categories}
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
          open={deleteModalOpen}
          onOk={() => deleteCategory()}
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
            Are You Sure You Want To Delete This Product?
          </Typography.Text>
        </Modal>
    </Layout>
  );
}

export default Categories;