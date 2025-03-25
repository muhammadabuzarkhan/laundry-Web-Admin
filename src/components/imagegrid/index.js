import React, { useState } from "react";
import { Image, Row, Col } from "antd";
import { UPLOADS_URL } from "../../config/constants";

const ImageGrid = ({ smallImages }) => {

  console.log("smallImages",smallImages)
  const smallImageHeight = 100; // Adjust the height of small images here (in pixels)
  const spacing = 16; // Adjust the spacing between small images here (in pixels)
  // const largeImageHeight = smallImages.length * (smallImageHeight + spacing);
  const [selectedImage, setSelectedImage] = useState(smallImages[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Row gutter={8}>
        <Col span={6}>
        <Row gutter={[0, 25]} style={{maxHeight:"500px",overflow:"auto"}}>
          {smallImages.map((image, index) => (
            <Col span={24} key={index}>
              <Image preview={false} className="border-radius-20"
                src={UPLOADS_URL + image}
                style={{
                  height: "150px",
                  width:'150px',
                  border:"1px solid #dadada",
                  borderRadius:"20px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleImageClick(image)}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={18}  className="bigproductimg">
        <Image preview={false} className="border-radius-15"
          src={UPLOADS_URL +selectedImage}
          style={{
            height: "500px",
                  width:'500px',
                  border:"1px solid #dadada",
            objectFit: "cover",
            cursor: "pointer",
            
          }}
        />
      </Col>
      
    </Row>
  );
};

export default ImageGrid;
