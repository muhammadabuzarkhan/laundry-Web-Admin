// import router from "next/router";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Popover,
  Layout,
  Space,
  Tabs,
  Table,
  Select,
  Image,
  Skeleton,
  message,
  Upload,
} from "antd";
import { ImEarth } from "react-icons/im";
import { AiFillLike } from "react-icons/ai";
import { BsFillChatDotsFill, BsFillShareFill } from "react-icons/bs";
import { UPLOADS_URL2 } from "../../config/constants";

function SocialBoxLoading() {
  return (
    <>
      <div className="social-post-box">
        <Row>
        <Space>
                <Skeleton.Avatar active />
                <Skeleton.Button
                  active
                  size="small"
                  style={{ width: "200px" }}
                />
              </Space>
              </Row>
              <br/>
              <Row>
        
         
              <Skeleton
                  active
                  size="large"
                  block
                  paragraph={{rows:8}}
             
                />
             </Row>
            
        <br/>
     
      </div>
    </>
  );
}

export default SocialBoxLoading;
