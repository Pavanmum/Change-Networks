import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import {  Drawer, Carousel,Radio, Space, Button } from 'antd';

const DialogBox = ({ open, onClose ,id,top }) => {
  console.log(id);

  const [show, setShow] = useState(true);
  const [image, setImage] = useState({});

  async function getData(id) {
    const response = await fetch(`http://localhost:5000/api/get-image-by-id?id=${id}`);
    const data = await response.json();
    console.log(data);
    setImage({
      gallery_id: data.data.gallery_id,
      img: data.data.img,
      product_code: data.data.product_code
    });
  }

  // const [placement, setPlacement] = useState('top');


  const contentStyle = {
    height: '800px',
    color: '#fff',
    lineHeight: '160px',
    justifyContent: 'center',
    textAlign: 'center',
    background: '#364d79',
    width: '800px',
    alignItem: 'center',
  };

  // const onChange = (e) => {
  //   setPlacement(e.target.value);
  // };

  const CarouselDesgin = {
    width: '600px',
    // background: '#364d79',
    // textAlign: "center",
  }

  const drawerController = {
    height: '900px',
    // marginLeft: '19rem',
    // marginRigth: '19',
    // overflow: 'auto',
    // z-index: '1040',
    // zIndex: '1040',
    width: "900px",
    // height: "100%",
    right: "60%",
    left: "30%",
    top: "0",
    // // margin: "10rem 0rem ",
    background: "transparent",
   
  }

  console.log(image);

  useEffect(() => {

    if(id !== undefined ){
      getData(id);

    }
  }, [id]);

  return (
    <> <Drawer
    
    title="Drawer with extra actions"
    placement={top}
    width={500}
    onClose={onClose}
    open={open}
    extra={
      <Space>
        <Button
         onClick={onClose}>Cancel</Button>
        <Button type="primary" onClick={onClose}>
          OK
        </Button>
      </Space>
    }
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>

    </>
  );
};

export default DialogBox;
