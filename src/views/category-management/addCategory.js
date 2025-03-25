import React, { useState } from "react";
import { Layout, Form, Input, Button, message, Upload, Row, Col } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import ImageUploading from 'react-images-uploading';
import { createServices } from '../../redux/thunk/serviceSlice'


const { TextArea } = Input;

function AddCategory() {
  const token = useSelector((state) => state.user.data.token);


  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
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

  // const onFinish = async (values) => {
  //   setLoading(true);


  //   const { title, tags, priceDescription, price, description, Includes } = values

  //   const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

  //   const formdata = new FormData()
  //   formdata.append('title', title)
  //   formdata.append('description', description)
  //   formdata.append('tags', JSON.stringify(tagsArray))
  //   formdata.append('price', Number(price))
  //   formdata.append('priceDescription', priceDescription)
  //   formdata.append('Includes', Includes)





  //   if (images) {
  //     formdata.append('catImage', images?.map(data => data.file).pop());
  //   }




  //   const data = {
  //     token: token,
  //     formdata: formdata
  //   }

  //   const newCategory = await dispatch(createServices(data)).unwrap()

  //   if (newCategory.status) {
  //     navigate('/categories')
  //   }

  //   console.log("newCategory", newCategory);
  // };
  const onFinish = async (values) => {
    if (images.length === 0) {
      setImageError("Please upload an image.");
      message.error("Please upload an image.");
      return;
    }
    setImageError(""); // Clear error if an image is selected
  
    setLoading(true);
    const { title, tags, priceDescription, price, description, Includes } = values;
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
  
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('description', description);
    formdata.append('tags', JSON.stringify(tagsArray));
    formdata.append('price', Number(price));
    formdata.append('priceDescription', priceDescription);
    formdata.append('Includes', Includes);
    
    if (images.length > 0) {
      formdata.append('catImage', images[0].file); // Ensures only one image is uploaded
    }
  
    const data = { token, formdata };
    const newCategory = await dispatch(createServices(data)).unwrap();
  
    if (newCategory.status) {
      navigate('/categories');
    } else {
      message.error("Failed to add category.");
    }
  
    setLoading(false);
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
              ADD CATEGORY
            </h1>
          </Col>
        </Row>
        <Row align="middle" gutter={24}>
          <Col md={10} lg={10} xl={8}>
            <div className="wrapper-group-1000001858">
              <>
                {/* <Upload
                                  name="image"
                                  showUploadList={false}
                                  style={{ position: "relative" }}
                                  onChange={handleChangepro}
                                  beforeUpload={beforeUpload}
                                >
                                  {" "}
                                  <div
                                    style={{
                                      height: "300px",
                                      border: "1px solid gray",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {imageUrl ? (
                                      <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                          width: "100%",
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={
                                          ImageURL + state?.image
                                        }
                                        alt="avatar"
                                        style={{
                                          width: "100%",
                                          maxHeight: "360px",
                                          objectFit: "cover",
                                          objectPosition: "center",
                                          filter: "blur(1px)",
                                        }}
                                      />
                                    )}
                                    <FaCamera
                                      style={{
                                        position: "absolute",
                                        color: "rgb(0,127,202)",
                                        fontSize: "25px",
                                      }}
                                    />
                                  </div>{" "}
                                </Upload> */}

                <ImageUploading
                  value={images}
                  onChange={onChange32}
                  maxNumber={1}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <button
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click or Drop here
                      </button>
                      &nbsp;
                      {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image['data_url']} alt="" width="200" height="200" />
                          <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageUpdate(index)}>Update</button>
                            <button onClick={() => onImageRemove(index)}>Remove</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>

              </>
            </div>
          </Col>

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
                label="Category Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input Category Name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Name of Category"
                  style={{
                    borderRadius: "5px",
                    background: "white",
                    fontSize: "14px",
                    padding: "12px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Category Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input Category Name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Description of Category"
                  style={{
                    borderRadius: "5px",
                    background: "white",
                    fontSize: "14px",
                    padding: "12px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Tags"
                name="tags"
                rules={[
                  {
                    required: true,
                    message: "Please input Category Name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Tags for Category"
                  style={{
                    borderRadius: "5px",
                    background: "white",
                    fontSize: "14px",
                    padding: "12px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input Category Name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Price for Category"
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
                label="price Description"
                name="priceDescription"
                rules={[
                  {
                    required: true,
                    message: "Please input Category Name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Price Description for Category"
                  style={{
                    borderRadius: "5px",
                    background: "white",
                    fontSize: "14px",
                    padding: "12px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Includes"
                name="Includes"
                rules={[
                  {
                    required: true,
                    message: "Please input Category Name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter Includes for Category"
                  style={{
                    borderRadius: "5px",
                    background: "white",
                    fontSize: "14px",
                    padding: "12px 20px",
                  }}
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
