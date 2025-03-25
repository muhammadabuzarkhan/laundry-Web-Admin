import React, { useEffect, useState } from "react";
import { Layout, Form, Input, Button, message,  Select, Upload, Row, Col } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { createsubServices , getallServices , subCatByCategory } from '../../redux/thunk/serviceSlice'
import { useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import ImageUploading from 'react-images-uploading';
import { createServices } from '../../redux/thunk/serviceSlice'


const { TextArea } = Input;

function AddCategory() {
   const token = useSelector((state) => state.user.data.token );


  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [images, setImages] = useState([]);
  const [cat , Setcat ] = useState([])
  const [subCat , SetsubCat] = useState("")
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Ensure only one file is kept
  };

  const onChange32 = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleStatusChange = (e) => {
    SetsubCat(e)
  }

  const getAllCategories = async () => {
    const response = await dispatch(getallServices(token)).unwrap()
     const datas = response?.allcategory?.map((names) =>({
        value: names._id,
        label: names.title

     }))
     Setcat(datas)
  }


  useEffect(() => {
    getAllCategories()
  },[])

  const onFinish =  async (values) => {
    setLoading(true);
   const {title } = values
    const userData = {
      title : title,
      catId : subCat
    }

    setLoading(false);
    const data = {
      token : token,
      userData : userData
    }

    const newCategory = await dispatch(createsubServices(data)).unwrap()

    if(newCategory.status){
      navigate('/subcategories')
    }

    console.log("newCategory",newCategory);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Layout>
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
              ADD SUB CATEGORY
            </h1>
          </Col>
        </Row>
        <Row align="middle" gutter={24}>
      

          <Col lg={6} md={24} xs={24}>
            <Form
              className="row g-3"
              name="basic"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
              onFinishFailed={onFinishFailed}
              form={form}
            >
              <Form.Item
                label="Sub Category Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input Sub Category Name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Name of Sub Category"
                  style={{
                    borderRadius: "5px",
                    background: "white",
                    fontSize: "14px",
                    padding: "12px 20px",
                  }}
                />
              </Form.Item>

              <p className="mainLabel">Select Category:</p>

                <Select
                size={"large"}
                className="filterSelectBox"
                placeholder="Select Status"
                value={cat?.label}
                onChange={(e) => {
                    handleStatusChange(e)
                
                    }}
                style={{
                    width: "100%",
                    marginBottom: "10px",
                    textAlign: "left",
                }}
                  options={cat}
                />
              {/* <p style={{ margin: "10px", fontWeight: "bold" }}>
                Upload Images*
              </p>
              <Form.Item
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: "Please upload an image!",
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                  accept="image/*"
                  multiple={false}
                  maxCount={1} // Prevent automatic upload
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item> */}
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
                    ADD
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
                  onClick={() => navigate("/categories")}
                >
                  CANCEL
                </Button>
              </Row>
            </Form>

           
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default AddCategory;
