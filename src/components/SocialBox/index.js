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
  Avatar,
  Tabs,
  Table,
  Select,
  Image,
  Modal,
  Skeleton,
  message,
  Upload,
} from "antd";
import { ImEarth } from "react-icons/im";
import { AiFillLike } from "react-icons/ai";
import { BsFillChatDotsFill, BsFillShareFill } from "react-icons/bs";
import { UPLOADS_URL2 } from "../../config/constants";
import moment from 'moment'
import { ImageUrl } from "../../config/functions";

function SocialBox({post}) {
  return (
    <>
     {post && <div className="social-post-box">
        <Row>
          <Col xs={24} md={24}>
            <div className="for-d-flex" style={{ alignItems: "center" }}>
              <div className="for-flex-shrink-0">
                <Image
                  src={ImageUrl("profilepicture.png")}
                  
                  alt="Analytics Image"
                  preview={false}
                />
              </div>
              <div className="for-flex-grow">
                <h5 className="poster-name">
                  {post?.author.isAdmin ? "Admin" : post?.author.fullName} <ImEarth />
                </h5>
                <h6 className="posting-date"> Posted {moment(post.createdAt).fromNow()}</h6>
              </div>
            </div>
          </Col>
          <Col xs={24} md={24}>
            <p className="post-text">
              {post?.title}
            </p>
          </Col>
         {post.images.length > 0 &&  <Col xs={24} md={24}>
            <div className="post-pic-box">
              <Image
                src={UPLOADS_URL2  + post.images[0]}
                alt="Analytics Image"
                preview={false}
                className="abc"
              />
            </div>
          </Col>}
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Col xs={24} md={23}>
            <Row>
              <Col xs={12} md={12}>
                <div className="like-box">
                  <div className="like-box-iner">
                    <AiFillLike />
                    {post.likes.length} Likes
                  </div>
                </div>
              </Col>
              <Col xs={12} md={12} style={{ textAlign: "end" }}>
                <div className="like-box">
                  <div className="like-box-iner">
                    <BsFillChatDotsFill />
                    {post.comments.length} Comments
                  </div>
                </div>
              </Col>
            </Row>
            {/* <div className="for-line"></div>
            <Row>
              <div className="linke-comment-share">
                <div>
                  <AiFillLike /> Likes
                </div>
                <div className="">
                  <BsFillChatDotsFill /> Comments
                </div>
                <div className="">
                  <BsFillShareFill /> Share
                </div>
              </div>
            </Row> */}
          </Col>
        </Row>
      </div>}
    </>
  );
}

export default SocialBox;
