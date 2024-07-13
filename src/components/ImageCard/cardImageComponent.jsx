import  { Suspense, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./imageCard.css";
import { FaArrowDownLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import DialogBox from "../../components/dialogBox/DialogBox"; // Import the DialogBox component
import LazyLoad from "react-lazyload";
import { Skeleton } from "antd";
import { ThreeDots } from "react-loader-spinner";
// import LazyImage from '../LazyLoad/LazyLoadedImage';

function BasicExample({ imageUrl, title, id }) {
  const [dialogOpen, setDialogOpen] = useState(false); // State to control the dialog open/close
  const navigate = useNavigate();

  // Define handleClickOpen function to handle the dialog open
  const handleClickOpen = (id) => {
    setDialogOpen(true); // Open the dialog when the button is clicked
    navigate(`${id}`);
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
    navigate("/gallery");
  };

  const [imageLoaded, setImageLoaded] = useState(false); // State to track if the image is loaded

  const handleImageLoad = () => {
    setImageLoaded(true); // Set imageLoaded to true when the image is loaded
  };

  return (
    <LazyLoad height={200} offset={300}>
      <Card style={{ width: "18rem" }}>
        <Suspense fallback={<Skeleton avatar paragraph={{ rows: 3 }} />}>
          <Link to={`${id}`} className="card-link">
            {!imageLoaded && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <ThreeDots
                  visible={true}
                  height="60"
                  width="50"
                  color=""
                  radius="9"
                  justifyContent="center"
                  alignItems="center"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}{" "}
            {/* Show loader until the image is loaded */}
            <Card.Img
              onClick={() => handleClickOpen(id)}
              variant="top"
              src={imageUrl}
              onLoad={handleImageLoad} // Call handleImageLoad when the image is loaded
              style={{ display: imageLoaded ? "block" : "none" }} // Show the image only when it is loaded
            />
          </Link>
          <Card.Body
            style={{
              borderTop: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ alignItems: "center" }}>
              <Card.Title>{title}</Card.Title>
            </div>
            <Button variant="primary">
              <FaArrowDownLong />
            </Button>
          </Card.Body>
          {/* Render the DialogBox component only when dialogOpen is true */}
          {dialogOpen && (
            <DialogBox
              open={dialogOpen}
              onClose={handleDialogClose}
              top={"top"}
              id={id}
            />
          )}
        </Suspense>
      </Card>
    </LazyLoad>
  );
}

export default BasicExample;
