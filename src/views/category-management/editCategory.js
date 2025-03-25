import React, { useState , useEffect } from "react";
import { Layout, Form, Input, Button, message, Upload, Row, Col } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate , useParams } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import ImageUploading from 'react-images-uploading';
import { UpdateCategory , updateDays , createServices , getCategoryById } from '../../redux/thunk/serviceSlice'
import { removeProfileImage} from '../../redux/slice/serviceSlice'

const { TextArea } = Input;

function AddCategory() {
   const token = useSelector((state) => state?.user?.data?.token );
  const id = useParams()
  const ImageURL = 'https://react.customdev.solutions:3021/'
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [images, setImages] = useState([]);
  const [catImages, setCatImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [catDetails , SetcatDetails] = useState({})
  const [NoOfDays , SetNoOfDays] = useState(0)

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

  const GetCategoryDataById = async () => {
    const data = {
      token,
      id : id?.id
    }
    
    const getCategory = await dispatch(getCategoryById(data)).unwrap()
    SetcatDetails(getCategory?.categoryDetails);
  }

  useEffect(() => {
    GetCategoryDataById()
  },[])


  

  const onFinish =  async (values) => {
    setLoading(true);
   

   const {title,tags,priceDescription,price,description,Includes,NoOfDays } = values

   const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

   const formdata = new FormData()
  formdata.append('title' , title ?  title : catDetails?.title)
  formdata.append('description' , description  ? description : catDetails?.description)
  formdata.append('tags' , tags  ?  JSON?.stringify(tagsArray) :   JSON?.stringify(catDetails?.tags) )
  formdata.append('price' , price ? Number(price)  : catDetails?.price)
  formdata.append('priceDescription' , priceDescription ? priceDescription : catDetails?.priceDescription)
  formdata.append('Includes' , Includes ? Includes : catDetails?.Includes)

 
 
   if (images && images.length > 0) {
    formdata.append('catImage', images[0]?.file); 
  } else{
    formdata.append('catImage', catDetails?.catImage);
  }
    
console.log("images",images);

    const data = {
      token : token,
      payload : formdata,
      id : id?.id,
    }

    const newCategory = await dispatch(UpdateCategory(data)).unwrap()

    const payload = {
      NoOfDays : NoOfDays ?  Number(NoOfDays) : catDetails?.NoOfDays
    }

    const datas = {
      id : id?.id,
      payload,
      token
    }

    await dispatch(updateDays(datas)).unwrap()

    if(newCategory?.status){
      navigate('/categories')
    }

    console.log("newCategory",newCategory);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  const ExistingImage = () => {
    let {  catImage ,  ...rest   }  = catDetails
    const data  = {
      ...rest ,
      catImage : ""
    }
    SetcatDetails(data)
    return data
  }

  const handleNo_of_Days = (e) =>{ 
    const {value } = e.target;
    SetNoOfDays(value)
  }

  // const updateNoDays = async () => {
   
  //   const payload = {
  //     NoOfDays : Number(NoOfDays)
  //   }
  //   console.log("gggg" , payload);
  //   const data = {
  //     id : id?.id,
  //     payload,
  //     token
  //   }
  //   let checked =  await dispatch(updateDays(data)).unwrap()
  //   console.log("checked",checked);
  // }
 
console.log("catDetails",catDetails , "====images ===>" , images);
  
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
              EDIT CATEGORY
            </h1>
          </Col>
        </Row>
        <Row align="middle" gutter={24}>
        <Col md={10} lg={10} xl={8}>
                            <div className="wrapper-group-1000001858">
                              <>  
                              {
                                catDetails?.catImage  ?
                                  (
                                    <>
                                    <img src={ImageURL + catDetails.catImage} alt="" width="200" height="200" />
                                    <button onClick={() => ExistingImage()}>Discard Image</button>
                                    
                                    </>
                                  )
                                  : 
                                  (
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
                                  )

                                }
                             
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
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input Category Name!",
                //   },
                // ]}
              >
                <Input
                  size="large"
                  placeholder={catDetails.title}
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
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input Category Name!",
                //   },
                // ]}
              >
                <Input
                  size="large"
                  placeholder={catDetails.description}
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
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input Category Name!",
                //   },
                // ]}
              >
                <Input
                  size="large"
                  placeholder={catDetails.tags}
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
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input Category Name!",
                //   },
                // ]}
              >
                <Input
                  size="large"
                  placeholder={catDetails.price}
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
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input Category Name!",
                //   },
                // ]}
              >
                <Input
                  size="large"
                  placeholder={catDetails.priceDescription}
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
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input Category Name!",
                //   },
                // ]}
              >
                <Input
                  size="large"
                  placeholder={catDetails.Includes}
                  style={{
                    borderRadius: "5px",
                    background: "white",
                    fontSize: "14px",
                    padding: "12px 20px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Delievery Days"
                name="NoOfDays"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input Category Name!",
                //   },
                // ]}
              >
                <Input
                  size="large"
                  type="number"
                  placeholder={catDetails.NoOfDays}
                  onChange={(e) => {
                    handleNo_of_Days(e)
                    
                      }}
                    value={NoOfDays}
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
                    EDIT
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
