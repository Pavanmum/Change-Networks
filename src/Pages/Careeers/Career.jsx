import React from "react";
import Navbar from "../../cn_components/Navbar";
import Filter from "../../components/FilterComponent/Filter";
import "./Career.css";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import {
  Col,
  Divider,
  Layout,
  Row,
  theme,
  Form,
  Input,
  Button,
  Checkbox,
  List,
  Typography,
  Flex,
  Card,
} from "antd";
const { Content, Footer, Header, Sider } = Layout;
import { AiFillCarryOut } from "react-icons/ai";

import Career_list from "../../components/careers/career_list";

const Career = () => {
  const headerStyle = {
    textAlign: "center",
    color: "black",
    height: "auto",
    lineHeight: "64px",
    backgroundColor: "#fff",
  };

  const contentStyle = {
    padding: "24px",
    // height: "100%", // Adjust height to fit within viewport, accounting for header and footer
    // overflowY: "auto", // Enable vertical scrolling
    backgroundColor: "#fff",
    // border: "1px solid #E0E0E0",
    borderRadius: "8px",
    overflowY: "auto",
    height: "calc(100vh - 160px)",
  };

  const siderStyle = {
    textAlign: "left",
    with:"auto",
    backgroundColor: "#fff",
    height: "calc(100vh - 160px)",
    paddingleft: "38px;",
    overflowY: "auto",

  };

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#4096ff",
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    height: "auto",
  };

  const data = ["dassodspoaspoas", "asdkaslnkds;adskdaskdas", "asdoiasoldfla"];

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const datas = ["React Native"];

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {/* <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Navbar />
          <Filter title={"Primary"} size={"5.7rem"} />
        </Header>
        <Divider />
        <Layout >
          <Sider width="25%" style={siderStyle}>
            <Card
              // style={{
              //   width: 300,
              //   borderRadius: "8px",
              //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              //   alignContent:"left",
              //   // justif
              // }}
              className="card"
            >
              <h5 style={{ fontWeight: "bold",fontSize:"16px" }}>IT Recruiter</h5>
              <p>
                <EnvironmentOutlined /> India, Navi Mumbai
              </p>
              <p>
                <ClockCircleOutlined /> 2+ years
              </p>
              <p>
                <ClockCircleOutlined /> 10 am to 7pm
              </p>
              <p>
                <WalletOutlined /> ₹ 4L ~ ₹ 8L
              </p>
            </Card>
            <Card
              // style={{
              //   width: 300,
              //   borderRadius: "8px",
              //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              //   alignContent:"left",
              //   // justif
              // }}
              className="card"
            >
              <h3 style={{ fontWeight: "bold",fontSize:"16px" }}>IT Recruiter</h3>
              <p>
                <EnvironmentOutlined /> India, Navi Mumbai
              </p>
              <p>
                <ClockCircleOutlined /> 2+ years
              </p>
              <p>
                <ClockCircleOutlined /> 10 am to 7pm
              </p>
              <p>
                <WalletOutlined /> ₹ 4L ~ ₹ 8L
              </p>
            </Card>
            <Card
            className="card"
              // style={{
              //   width: 300,
              //   borderRadius: "8px",
              //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              //   alignContent:"left",
              //   // justif
              // }}
            >
              <h3 style={{ fontWeight: "bold",fontSize:"16px" }}>IT Recruiter</h3>
              <p>
                <EnvironmentOutlined /> India, Navi Mumbai
              </p>
              <p>
                <ClockCircleOutlined /> 2+ years
              </p>
              <p>
                <ClockCircleOutlined /> 10 am to 7pm
              </p>
              <p>
                <WalletOutlined /> ₹ 4L ~ ₹ 8L
              </p>
            </Card>
            <Card
              // style={{
              //   width: 300,
              //   borderRadius: "8px",
              //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              //   alignContent:"left",
                
              // }}
              className="card"
            >
              <h3 style={{ fontWeight: "bold" }}>IT Recruiter</h3>
              <p>
                <EnvironmentOutlined /> India, Navi Mumbai
              </p>
              <p>
                <ClockCircleOutlined /> 2+ years
              </p>
              <p>
                <ClockCircleOutlined /> 10 am to 7pm
              </p>
              <p>
                <WalletOutlined /> ₹ 4L ~ ₹ 8L
              </p>
            </Card>
            <Card
              className="card"
              // style={{
              //   width: 300,
              //   borderRadius: "8px",
              //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              //   alignContent:"left",
              //   // justif
              // }}
            >
              <h3 style={{ fontWeight: "bold" }}>IT Recruiter</h3>
              <p>
                <EnvironmentOutlined /> India, Navi Mumbai
              </p>
              <p>
                <ClockCircleOutlined /> 2+ years
              </p>
              <p>
                <ClockCircleOutlined /> 10 am to 7pm
              </p>
              <p>
                <WalletOutlined /> ₹ 4L ~ ₹ 8L
              </p>
            </Card>
          </Sider>
          <Content>
            <Header
              className="site-page-header"
              style={{
                display: "flex",
                marginBottom: "49px",
                rowGap: "1.1rem",
                flexDirection: "column",
                // justifyContent: "space-between",
                color: "black",
                background: "#fff",
                position: "sticky",
                top: 0,
                zIndex: 999,
                padding: "0 24px",
              }}
            >
              <Row style={{ display: "flex", justifyContent: "space-between" }}>
                <h5 style={{ margin: 0 }}>MERN Stack Developer</h5>
                <Button style={{ margin: 0 }}>Apply Now</Button>
              </Row>
              <Row>
                <ul
                  className="d-flex"
                  style={{
                    gap: "3rem",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    height: "60px",
                    width: "55px",
                  }}
                >
                  <li className="li-header">pavan</li>
                  <li className="li-header">pavan</li>
                  <li className="li-header">pavan</li>
                  <li className="li-header">pavan</li>
                </ul>
              </Row>
            </Header>
            <Form
              style={contentStyle}
              name="job_form"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Job Description"
                name="jobTitle"
                initialValue="MERN Stack Developer"
              >
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                  {data.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Typography.Text
                        strong
                        style={{ lineHeight: "1", fontSize: "20px" }}
                      >
                        •
                      </Typography.Text>
                      <Typography.Text>{item}</Typography.Text>
                    </li>
                  ))}
                </ul>
              </Form.Item>

              <Form.Item
                label="Highlights"
                name="highlights"
                initialValue="Should be able to develop user friendly and efficient software"
              >
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                  {data.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Typography.Text
                        strong
                        style={{ lineHeight: "1", fontSize: "20px" }}
                      >
                        •
                      </Typography.Text>
                      <Typography.Text>{item}</Typography.Text>
                    </li>
                  ))}
                </ul>
              </Form.Item>

              <Form.Item label="Requirements" name="requirements">
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                  {data.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Typography.Text
                        strong
                        style={{ lineHeight: "1", fontSize: "20px" }}
                      >
                        •
                      </Typography.Text>
                      <Typography.Text>{item}</Typography.Text>
                    </li>
                  ))}
                </ul>
              </Form.Item>

              <Form.Item
                label="More Info"
                name="moreInfo"
                initialValue="moreInfo"
              >
                <List
                  size="small"
                  style={{ marginBottom: "1rem", border: "none" }}
                  header={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.3rem",
                        alignItems: "center",
                      }}
                    >
                      <Typography.Text
                        strong
                        style={{ lineHeight: "1", fontSize: "20px" }}
                      >
                        <AiFillCarryOut />
                      </Typography.Text>
                      <Typography.Text
                        style={{ lineHeight: "1", fontSize: "14px" }}
                      >
                        data
                      </Typography.Text>
                    </div>
                  }
                  bordered
                  dataSource={datas}
                  renderItem={(item) => <Filter title={item} size={"1.7rem"} />}
                />

                <List
                  style={{ marginBottom: "1rem", border: "none" }}
                  size="small"
                  header={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.3rem",
                        alignItems: "center",
                      }}
                    >
                      <Typography.Text
                        strong
                        style={{ lineHeight: "1", fontSize: "20px" }}
                      >
                        <AiFillCarryOut />
                      </Typography.Text>
                      <Typography.Text
                        style={{ lineHeight: "1", fontSize: "14px" }}
                      >
                        data
                      </Typography.Text>
                    </div>
                  }
                  bordered
                  dataSource={datas}
                  renderItem={(item) => <Filter title={item} size={"1.7rem"} />}
                />

                <List
                  style={{ marginBottom: "1rem", border: "none" }}
                  size="small"
                  header={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.3rem",
                        alignItems: "center",
                      }}
                    >
                      <Typography.Text
                        strong
                        style={{ lineHeight: "1", fontSize: "20px" }}
                      >
                        <AiFillCarryOut />
                      </Typography.Text>
                      <Typography.Text
                        style={{ lineHeight: "1", fontSize: "14px" }}
                      >
                        data
                      </Typography.Text>
                    </div>
                  }
                  bordered
                  dataSource={datas}
                  renderItem={(item) => <Filter title={item} size={"1.7rem"} />}
                />
              </Form.Item>

              <Form.Item>
                <p type="primary">Job Post:1 month ago</p>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout> */}
   
      <Navbar/>
      <Career_list/>
     

    </>
  );
};

export default Career;
