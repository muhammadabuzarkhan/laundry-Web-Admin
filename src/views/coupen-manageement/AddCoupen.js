import React, { useState } from "react";
import { Layout, Form, Input, Button, message, Upload, Row, Col , DatePicker } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import ImageUploading from 'react-images-uploading';
import { CreateCoupen } from '../../redux/thunk/coupenSlice'


const { TextArea } = Input;

function AddCategory() {
   const token = useSelector((state) => state.user.data.token );


  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [images, setImages] = useState([]);
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


  const onChange2 = (date) => {
   console.log("date",date);
   setStartDate(date) 
  };


  const disabledDate = (current) => {
    // Disable dates before today
    const today = new Date();
    // Set the time of the current date to midnight for comparison
    today.setHours(0, 0, 0, 0);
    // Disable dates that are before today
    return current && current < today;
  };


  
  const [startDate, setStartDate] = useState(null);

  const onFinish =  async (values) => {
    setLoading(true);
   

   const {title,discount,limitCoupenTimes } = values


    const Udata = {
        title,
        expireDate : startDate,
        discount : Number(discount),
        limitCoupenTimes : Number(limitCoupenTimes)
    }
  


    const data = {
      token : token,
      formdata : Udata
    }

    const newCategory = await dispatch(CreateCoupen(data)).unwrap()

    console.log("newCategory",newCategory);
    

    if(!newCategory?.status){
        message.error(newCategory?.message)
      
    }else if(newCategory?.status){
        navigate('/coupen')
    }

    
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
              ADD COUPEN
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
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input Coupen Name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Name of Coupen"
                  style={{
                    borderRadius: "5px",
                    background: "white",
                    fontSize: "14px",
                    padding: "12px 20px",
                  }}
                />
              </Form.Item>

             
              <Form.Item
                label="Discount"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: "Please input discount amount!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Coupen Discount"
                  type="number"
                  style={{
                    borderRadius: "5px",
                    background: "white",
                    fontSize: "14px",
                    padding: "12px 20px",
                  }}
                />
              </Form.Item>

              
              <Form.Item
                label="Coupen Limit"
                name="limitCoupenTimes"
                rules={[
                  {
                    required: true,
                    message: "Please input coupen limit!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Coupen Limit"
                  type="number"
                  style={{
                    borderRadius: "5px",
                    background: "white",
                    fontSize: "14px",
                    padding: "12px 20px",
                  }}
                />
              </Form.Item>


           
                <Form.Item label="Select day" className="select-icon customDatePicker">
                
                  <DatePicker 
                    className="web-input" 
                    style={{paddingRight:"10px", width:"100%"}} 
                    onChange={onChange2} 
                    value={startDate}
                    disabledDate={disabledDate}
                    />
                </Form.Item>
           
            

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