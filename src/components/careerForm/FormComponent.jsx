import "./FormComponent.css";
import { useState } from "react";
import Select from "react-select";
import "../../cn_assets/css/animate.min.css";
import "../../cn_assets/css/responsive.css";
import "../../cn_assets/css/pro.min.css";
import "../../cn_assets/css/line-awesome.min.css";
import "../../cn_assets/css/style.css";
// import '../../cn_assets/css/bootstrap.min.css'
import { UploadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Modal } from "antd";
import CareerApplyPageNav from "./CareerApplyPageNav";
import { useDispatch } from "react-redux";
import { careerSubmission } from "../../store/api/careerApi";
import TableComponent from "../tableComponent/TableComponent";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const FormComponent = () => {

  const optio = [
    ' 1',
    ' 2',
    ' 3',
    ' 4',
    ' 5',
  ];
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(optio);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredOptions(options.filter(option => 
      option.toLowerCase().includes(value.toLowerCase())
    ));
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setShowDropdown(false);
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([0]);
  const [selectedOption, setSelectedOption] = useState([0]);
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [formData, setFormData] = useState({
    resume_file: null,
    resume_text: "",
    first_name: "",
    last_name: "",
    email: "",
    whatsapp: "",
    mobile: "",
    country: "",
    state: "",
    address: "",
    place_of_birth: "",
    highest_qualification: "",
    other_qualification: "",
    designation_input: "",
    job_status: "",
    relevant_work_experience: "",
    total_experience_input: "",
    current_ctc: "",
    expected_ctc: "",
    notice_period: "",
    ctc_below: "",
    reference: "",
    candidate_brief: "",
    position: [],
    primary_skill: {
      ReactJS: "",
      NodeJS: "",
      ExpressJS: "",
      MongoDB: "",
      GIT: "",
      HTML: "",
      "CSS--Bootstrap": "",
      jQuery: "",
      JavaScript: "",
      "RESTful-API": "",
    },
    experience_on_mern: "",
    expert_technologies: "",
    project_links: "",
    secondary_skill: {
      NextJS: "",
      Tailwind: "",
      MySQL: "",
      GraphQL: "",
      "React-Native": "",
      Redux: "",
      "JSON-Web-Tokens-JWT": "",
    },
    other_skill: "",
  });

  const dipatch = useDispatch();
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setUploadVisible(false);
  };

  const handleRemove = () => {
    setFileList([]);
    setUploadVisible(true);
  };

  const handleChanged = (e) => {
    const { name, value, files } = e.target;
    const [skillType, skillName] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      [skillType]: {
        ...prevData[skillType],
        [skillName]: value,
      },
      [name]: files ? files[0] : value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const props = {
  
    beforeUpload(file) {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error("You can only upload PDF files!");
        return false;
      }
      const isSizeAccepted = file.size / 1024 / 1024 < 5; // Check if file size is less than 5MB
      if (!isSizeAccepted) {
        message.error("File must be smaller than 5MB!");
      }
      return isPDF && isSizeAccepted;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        setFormData((prevData) => ({
          ...prevData,
          resume_file: info.file.originFileObj,
        }));
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setFormData((prevData) => ({
          ...prevData,
          resume_file: info.file.originFileObj,
        }));
      } else if (info.file.status === "error") {
        setFormData((prevData) => ({
          ...prevData,
          resume_file: null,
        }));
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    const [category, skill] = name.split(".");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [category]: {
        ...prevFormData[category],
        [skill]: value,
      },
    }));
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
      onClick={() => setUploadVisible(true)}
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const options = [
    { value: "reactjs", label: "ReactJS", name: "position" },
    { value: "nodejs", label: "NodeJS", name: "position" },
    { value: "expressjs", label: "ExpressJS", name: "position" },
    { value: "mongodb", label: "MongoDB", name: "position" },
    { value: "git", label: "GIT", name: "position" },
    { value: "html", label: "HTML", name: "position" },
  ];

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      overflow: "visible",
      backgroundColor: "white", // Ensures the dropdown is not transparent
    }),
    control: (provided) => ({
      ...provided,
      overflow: "hidden",
    }),
    multiValue: (provided) => ({
      ...provided,
      overflow: "visible",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const handleChanges = (selected) => {
    setSelectedOptions(selected);

    // Initialize newData as an empty object
    let newData = {};

    // Iterate over each item in the selected array
    selected.forEach((item) => {
      const { name, value } = item;
      // Check if the property name already exists in newData
      if (newData[name]) {
        // If it exists, append the new value to the existing array
        newData[name].push(value);
      } else {
        // If it doesn't exist, create a new array with the value
        newData[name] = [value];
      }
    });

    console.log(newData);

    // Update formData with newData
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleChangeSecondarySkill = (selected) => {
    // const { name , value } = e.target;
    setSelectedOption(selected);
    console.log(selectedOption);
    const data = {};

    selected.map((item) => {
      const { name, value } = item;
      if (data[name]) {
        data[name].push(value);
      } else {
        data[name] = [value];
      }
    });
  };

  const [showTextarea, setShowTextarea] = useState(false);

  const handleToggleTextarea = () => {
    setShowTextarea(!showTextarea);
  };

  const handleCloseTextarea = () => {
    setShowTextarea(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    console.log(formData);
    dipatch(careerSubmission(formData));

    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });
  };

  const handleImage = (e) => {
    const files = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      resume_file: files,
    }));
  };

  return (
    <div>
      <CareerApplyPageNav />
      <section className="section-box mt-50">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 col-md-8 col-sm-12 col-12 mb-50">
              <div className="content-single">
                <div className="tab-content">
                  <div
                    className="tab-pane fade active show"
                    id="tab-my-profile"
                    role="tabpanel"
                  >
                    <form
                      id="applyform"
                      className="validate-form submit-form"
                      action
                      method="post"
                      name="form"
                      encType="multipart/form-data"
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="hidden"
                        name="candidate_id"
                        defaultValue={2198}
                      />
                      <h3 className="mt-0 mb-15">Profile Details</h3>
                      <div className="row form-contact">
                        <div className="col-lg-12 col-md-12">
                          <div className="mt-35 mb-40 box-info-profie">
                            <div className="image-profile">
                              <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-circle"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                onRemove={handleRemove}
                                showUploadList={{
                                  showPreviewIcon: true,
                                  showRemoveIcon: true,
                                }}
                              >
                                {fileList.length >= 1 ? null : uploadButton}
                              </Upload>
                              {previewImage && (
                                <Image
                                  wrapperStyle={{
                                    display: "none",
                                  }}
                                  preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) =>
                                      setPreviewOpen(visible),
                                    afterOpenChange: (visible) =>
                                      !visible && setPreviewImage(""),
                                  }}
                                  src={previewImage}
                                />
                              )}
                              {uploadVisible && (
                                <Modal
                                  visible={uploadVisible}
                                  footer={null}
                                  onCancel={() => setUploadVisible(false)}
                                >
                                  <Upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    showUploadList={false}
                                  >
                                    {fileList.length >= 1 ? null : uploadButton}
                                  </Upload>
                                </Modal>
                              )}
                            </div>

                            <span className="help-block form-error" />
                          </div>
                          <div className="format">
                            Upload Resume (*.doc, *.docx, *.pdf) 5 MB max
                          </div>
                          <div>
                          <div className="mb-3">
  <label htmlFor="formFile" className="form-label">Default file input example</label>
  <input className="form-control" type="file" id="formFile" onChange={handleImage} />
</div>

                            <div className="col-sm-4 copyPasteBtn">
                              Or
                              <span
                                className="btn btn-sm font-weight-bold text-primary showTextBox"
                                onClick={handleToggleTextarea}
                              >
                                Copy and paste resume
                              </span>
                            </div>
                            {showTextarea && (
                              <div className="col-sm-12 cvCopyPaste mt-30">
                                <label className="field-label">
                                  Copy and paste resume
                                </label>
                                <textarea
                                  name="resume_text"
                                  placeholder=""
                                  maxLength={10000}
                                  rows={4}
                                  className="common-textarea"
                                  aria-required="true"
                                  aria-invalid="false"
                                  defaultValue=""
                                />
                                <a
                                  href="javascript:void(0)"
                                  className="float-right pt-2"
                                  onClick={handleCloseTextarea}
                                >
                                  Close
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-floating mb-3">
                                <input
                                  type="name"
                                  name="first_name"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="name"
                                  value={formData.first_name}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  First Name
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                                <span></span>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-floating mb-3">
                                <input
                                  type="last_name"
                                  name="last_name"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="name@example.com"
                                  value={formData.last_name}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  Last Name
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="name@example.com"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  Email address
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                         
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="mobile #"
                                  name="mobile"
                                  value={formData.mobile}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  Mobile #
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-floating mb-3">
                                <input
                                  type="country"
                                  name="country"
                                  value={formData.country}
                                  onChange={handleChanged}
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="country"
                                />
                                <label htmlFor="floatingInput">
                                  Country
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-floating mb-3">
                                <input
                                  type="state"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="state"
                                  name="state"
                                  value={formData.state}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  State
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-floating">
                                <textarea
                                  style={{
                                    height: "calc(0.5em * 5 + 0.5rem + 2px)",
                                  }}
                                  className="form-control"
                                  placeholder="Leave a comment here"
                                  id="floatingTextarea"
                                  name="address"
                                  value={formData.address}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingTextarea">
                                  Address
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="birth place"
                                  name="place_of_birth"
                                  value={formData.place_of_birth}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  Place of Birth
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="highest qualification"
                                  name="highest_qualification"
                                  value={formData.highest_qualification}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  Highest Qualification
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-floating mb-3">
                                <input
                                  type="other_qualification"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="other qualification"
                                  name="other_qualification"
                                  value={formData.other_qualification}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  Other Qualification/Education with
                                  Percentage/Grade{" "}
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group required floating-diff">
                                <label className="font-sm color-text-mutted mb-10">
                                  Designation / Positions Worked
                                </label>
                                <div className="combobox">
      <input
        type="text"
        value={inputValue}
        placeholder="Select or type..."
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        onChange={handleInputChange}
      />
      {showDropdown && (
        <div className="dropdown">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
                                <span className="help-block">
                                  Manually Type Ex. Web Developer, Sales Manager
                                </span>
                                <span className="help-block form-error" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div
                                className="form-group required form-checkbok"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "15px",
                                }}
                              >
                                <label className="font-sm color-text-mutted mb-10">
                                  Current Job Status{" "}
                                </label>
                                <div
                                  className="d-flex1 "
                                  style={{ display: "flex", gap: "5px" }}
                                >
                                  <input
                                    type="radio"
                                    className
                                    id="job_status1"
                                    name="job_status"
                                    onChange={handleRadioChange}
                                    value="Working"
                                  />
                                  <label className htmlFor="job_status1">
                                    Working
                                  </label>
                                  <input
                                    type="radio"
                                    className
                                    id="job_statu2"
                                    name="job_status"
                                    value="Not Working"
                                    onChange={handleRadioChange}
                                  />
                                  <label className htmlFor="job_status2">
                                    Not Working
                                  </label>
                                  <input
                                    type="radio"
                                    className
                                    id="job_status3"
                                    name="job_status"
                                    value="On Notice Period"
                                    onChange={handleRadioChange}
                                  />
                                  <label className htmlFor="job_status3">
                                    {" "}
                                    On Notice Period
                                  </label>
                                </div>
                                <span className="help-block form-error" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="name@example.com"
                                  value={formData.relevant_work_experience}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  Relevant Work Experience
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group required floating-diff">
                                <label className="font-sm color-text-mutted mb-10">
                                  Your Total Experience
                                </label>
                                <select
                                  id="mishrmscandidatemaster-experience_id"
                                  className="form-control select2_drop"
                                  name="total_experience_input"
                                  aria-required="true"
                                  value={formData.total_experience_input}
                                  onChange={handleChanged}
                                >
                                  <option>Your Total Experience</option>
                                  <option value="Fresher">Fresher</option>
                                  <option value="1-2 years">1-2 years</option>
                                  <option value="2-3 years">2-3 years</option>
                                  <option value="3-4 years">3-4 years</option>
                                  <option value="4-5 years">4-5 years</option>
                                  <option value="5-6 years">5-6 years</option>
                                  <option value="6-7 years">6-7 years</option>
                                  <option value="7-8 years">7-8 years</option>
                                  <option value="8-9 years">8-9 years</option>
                                  <option value="9-10 years">9-10 years</option>
                                  <option value="10-12 years">
                                    10-12 years
                                  </option>
                                  <option value="12-15 years">
                                    12-15 years
                                  </option>
                                  <option value="15-20 years">
                                    15-20 years
                                  </option>
                                </select>
                                <span className="help-block form-error" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-floating mb-3">
                                <input
                                  type="current_ctc"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="current_ctc"
                                  name="current_ctc"
                                  value={formData.current_ctc}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  Current CTC (In Lacs)?
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-floating mb-3">
                                <input
                                  type="expected_ctc"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="expected_ctc"
                                  name="expected_ctc"
                                  value={formData.expected_ctc}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  Expected CTC (In Lacs)?
                                  <span
                                    className="required-asterisk"
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-floating mb-3">
                                <input
                                  type="notice_period"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="noitce period"
                                  name="notice_period"
                                  value={formData.notice_period}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  Notice Period?
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="name@example.com"
                                  value={formData.ctc_below}
                                  onChange={handleChanged}
                                />
                                <label htmlFor="floatingInput">
                                  What CTC below which you will not agree to
                                  work? (Annually)
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="refrence"
                                  name="reference"
                                  value={formData.reference}
                                />
                                <label htmlFor="floatingInput">Reference</label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group floating-diff">
                                <label className="font-sm color-text-mutted mb-10">
                                  Reference
                                </label>
                                <select
                                  id="mishrmscandidatemaster-source_id"
                                  className="form-control m-select2 source-dropdown1 select2_drop"
                                  name="reference"
                                  aria-required="true"
                                  tabIndex={-1}
                                  aria-hidden="true"
                                  value={formData.reference}
                                  onChange={handleChanged}
                                >
                                  <option value>Select Reference</option>
                                  <optgroup label="Job Portals">
                                    <option value="Indeed">Indeed</option>
                                    <option value="Monster">Monster</option>
                                    <option value="Naukri">Naukri</option>
                                    <option value="Timesjob">Timesjob</option>
                                  </optgroup>
                                  <optgroup label="Reference">
                                    <option value="Candidate Reference">
                                      Candidate Reference
                                    </option>
                                    <option value="Colleges">Colleges</option>
                                    <option value="Employee Reference">
                                      Employee Reference
                                    </option>
                                    <option value="Training Institute">
                                      Training Institute
                                    </option>
                                  </optgroup>
                                  <optgroup label="Social Media">
                                    <option value="Facebook">Facebook</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="Telegram">Telegram</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                  </optgroup>
                                  <optgroup label="Other">
                                    <option value="Other">Other</option>
                                  </optgroup>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-floating">
                            <textarea
                              style={{
                                height: "calc(1.5em * 5 + 1.5rem + 2px)",
                              }}
                              className="form-control"
                              placeholder="Leave a comment here"
                              id="floatingTextarea"
                              name="candidate_brief"
                              value={formData.candidate_brief}
                              onChange={handleChanged}
                            />
                            <label htmlFor="floatingTextarea">
                              Candidate Brief
                            </label>
                          </div>
                          <div className="row submit-details">
                            <div className="col-md-12 col-sm-12 submit-details__right1">
                              <h3>MERN Stack Developer</h3>
                              <p className="statusMsg"></p>
                              <input
                                type="hidden"
                                className="form-control"
                                name="desig"
                                id="inputDesignation"
                                defaultValue="MERN Stack Developer"
                              />
                              <div className="submit-form">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group floating-diff required">
                                      <label
                                        className="form-label"
                                        htmlFor="position_input"
                                      >
                                        Positions
                                      </label>
                                      <div className="container mt-5 custom-dropdown-container">
                                        <Select
                                          isMulti
                                          value={selectedOptions}
                                          onChange={handleChanges}
                                          options={options}
                                          className="basic-multi-select custom-dropdown"
                                          classNamePrefix="select"
                                          placeholder="Select Positions"
                                          styles={customStyles}
                                          name="position"
                                        />
                                      </div>
                                      <span className="help-block form-error"></span>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="container mt-5 custom-dropdown-container">
                                      <Select
                                        isMulti
                                        value={selectedOption}
                                        onChange={handleChangeSecondarySkill}
                                        options={options}
                                        className="basic-multi-select custom-dropdown"
                                        classNamePrefix="select"
                                        placeholder="Select Skills"
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="col-md-12 other-skill-option"
                                    style={{ display: "none" }}
                                  >
                                    <div className="form-group mb-0">
                                      <label className="form-label">
                                        Other Skill
                                      </label>
                                      <select
                                        className="form-control w-100a dropSelect"
                                        name="other_skill[]"
                                        multiple="multiple"
                                        data-title="Other Skill"
                                        data-placeholder="Other Skill"
                                      ></select>
                                      <span className="help-block form-error"></span>
                                    </div>
                                    <span className="file-message">
                                      Try entering a value that isn't listed in
                                      the dropdown - you'll be able to add it as
                                      a new option!
                                    </span>
                                    <br />
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-floating mb-3">
                                      <input
                                        type="number"
                                        name="experience_on_mern"
                                        value={formData.experience_on_mern}
                                        onChange={handleChanged}
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="experience_on_mern"
                                      />
                                      <label
                                        htmlFor="floatingInput"
                                        style={{ overflow: "none" }}
                                      >
                                        How many years of experience do you have
                                        working on MERN Technologies?
                                        <span
                                          className="required-asterisk"
                                          style={{ color: "red" }}
                                        >
                                          *
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-floating mb-3">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        name="expert_technologies"
                                        value={formData.expert_technologies}
                                        onChange={handleChanged}
                                        placeholder="expert_technologies"
                                      />
                                      <label
                                        htmlFor="floatingInput"
                                        style={{ overflow: "none" }}
                                      >
                                        What technologies are you expert on?
                                        <span
                                          className="required-asterisk"
                                          style={{ color: "red" }}
                                        >
                                          *
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-floating mb-3">
                                      <input
                                        type="text"
                                        name="project_links"
                                        value={formData.project_links}
                                        onChange={handleChanged}
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                      />
                                      <label
                                        htmlFor="floatingInput"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Send website links of your projects for
                                        reference
                                        <span
                                          className="required-asterisk"
                                          style={{ color: "red" }}
                                        >
                                          *
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <table className="table table-responsive table-striped skill-table">
        <thead style={{ background: '#b0dffb' }}>
          <tr>
            <th scope="row" style={{ textAlign: 'left', width: 200 }}>
              Primary Skills
            </th>
            <th scope="row" style={{ textAlign: 'center' }}>
              Advance
            </th>
            <th scope="row" style={{ textAlign: 'center' }}>
              Good
            </th>
            <th scope="row" style={{ textAlign: 'center' }}>
              Basic
            </th>
            <th scope="row" style={{ textAlign: 'center' }}>
              Average
            </th>
            <th scope="row" style={{ textAlign: 'center' }}>
              No
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(formData.primary_skill).map((skill) => (
            <tr key={skill}>
              <td>{skill.replace('--', '/')}</td>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="radio"
                  name={`primary_skill.${skill}`}
                  value="advance"
                  checked={formData.primary_skill[skill] === 'advance'}
                  onChange={handleSkillChange}
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="radio"
                  name={`primary_skill.${skill}`}
                  value="good"
                  checked={formData.primary_skill[skill] === 'good'}
                  onChange={handleSkillChange}
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="radio"
                  name={`primary_skill.${skill}`}
                  value="basic"
                  checked={formData.primary_skill[skill] === 'basic'}
                  onChange={handleSkillChange}
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="radio"
                  name={`primary_skill.${skill}`}
                  value="average"
                  checked={formData.primary_skill[skill] === 'average'}
                  onChange={handleSkillChange}
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="radio"
                  name={`primary_skill.${skill}`}
                  value="no"
                  checked={formData.primary_skill[skill] === 'no'}
                  onChange={handleSkillChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="table table-responsive table-striped skill-table">
        <thead style={{ background: '#fdd' }}>
          <tr>
            <th scope="row" style={{ textAlign: 'left', width: 200 }}>
              Secondary Skills
            </th>
            <th  scope="row" style={{ textAlign: 'center' }}>
              Advance
            </th>
            <th scope="row" style={{ textAlign: 'center' }}>
              Good
            </th>
            <th scope="row" style={{ textAlign: 'center' }}>
              Basic
            </th>
            <th scope="row" style={{ textAlign: 'center' }}>
              Average
            </th>
            <th scope="row" style={{ textAlign: 'center' }}>
              No
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(formData.secondary_skill).map((skill) => (
            <tr key={skill}>
              <td>{skill.replace('--', '/')}</td>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="radio"
                  name={`secondary_skill.${skill}`}
                  value="advance"
                  checked={formData.secondary_skill[skill] === 'advance'}
                  onChange={handleSkillChange}
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="radio"
                  name={`secondary_skill.${skill}`}
                  value="good"
                  checked={formData.secondary_skill[skill] === 'good'}
                  onChange={handleSkillChange}
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="radio"
                  name={`secondary_skill.${skill}`}
                  value="basic"
                  checked={formData.secondary_skill[skill] === 'basic'}
                  onChange={handleSkillChange}
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="radio"
                  name={`secondary_skill.${skill}`}
                  value="average"
                  checked={formData.secondary_skill[skill] === 'average'}
                  onChange={handleSkillChange}
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="radio"
                  name={`secondary_skill.${skill}`}
                  value="no"
                  checked={formData.secondary_skill[skill] === 'no'}
                  onChange={handleSkillChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
                          </div>
                          <div className="box-button mt-15">
                            <button
                              id="btn-candidate-add-submit"
                              type="submit"
                              className="btn btn-secondary"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tab-my-jobs"
                    role="tabpanel"
                  >
                    <h3 className="mt-0">
                      Applied Jobs{" "}
                      <span className="switch_viewType">
                        <i className="fal fa-th-list listview" />
                        <i className="fal fa-th-large gridview" />
                      </span>
                    </h3>
                    <div className="row display-list">
                      <div
                        className="col-xl-12 col-12"
                        style={{ height: "50vh" }}
                      >
                        <p>Not found any applied jobs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TableComponent />
    </div>
  );
};

export default FormComponent;
