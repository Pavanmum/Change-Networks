import { useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import "./editor.css";
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import {  UpdateJobAsync, clearJob } from "../../../store/slices/Admin/jobSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const EditJob = () => {

  const {status,error} = useSelector(state => state.jobSlice);


  const location = useLocation();
  const { job } = location.state || {}; // Access the job data
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const animatedComponents = makeAnimated();

  const [editorData, setEditorData] = useState(job?.job_description || "");
  const [editorDataRequirement, setEditorDataRequirement] = useState(job?.job_requirements || "");
  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedOptionsPrimary, setSelectedOptionsPrimary] = useState();
  const [selectedOptionsSecondary, setSelectedOptionsSecondary] = useState();
  const [selectedOptionsTags, setSelectedOptionsTags] = useState();
  const [customFields, setCustomFields] = useState([
    {
      field: "",
      button: "1",
    },
  ]);

  const options = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1px solid #ced4da', // Removes the default border
      boxShadow: 'none', // Removes the default box shadow
      height: 'auto',    // Adjusts the height as needed
      minHeight: '40px', // Set a minimum height if needed
    }),
    container: (provided) => ({
      ...provided,
      border: 'none',
    }),
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleChange = (options) => {
    setSelectedOptions(options);
    const value = options ? options.map((option) => option.value) : [""];
    setValue("job_position", value);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    setValue("job_description", data);
  };

  const habdlesEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorDataRequirement(data);
    setValue("job_requirements", data);
  };


  const handleAddField = () => {
    setCustomFields([...customFields, { value: "", button: "0" }]);
  };

  const handleRemoveField = (index) => {
    console.log(index);
    const newFields = customFields.filter((_, i) => i !== index);
    setCustomFields(newFields);
    setValue("job_custom_input", job?.job_custom_input);
  };

  const handleFieldChange = (index, event) => {
    const newFields = customFields.map((field, i) =>
      i === index ? { ...field, value: event.target.value } : field
    );
    setCustomFields(newFields);
  };



  const onSubmit = async (data) => {
    console.log("Form Data:",data, job._id);
    dipatch(UpdateJobAsync({data, id: job._id}));
  };
  useEffect(() => {
    if (job?.tags) {
      // const tagsArray = job.tags.split(","); // Split the string into an array
      const transformedTags = job.tags.map(tag => ({  label: tag }));
      // console.log(tagsArray);
      setSelectedOptionsTags(transformedTags);
      setValue("tags", job.tags); // Set the default value in the form

      // const primaryArray = job.tags.split(","); // Split the string into an array
      const transformedPrimaryArray = job.primary_skills.map(tag => ({ label: tag }));
      setSelectedOptionsPrimary(transformedPrimaryArray);
      setValue("primary_skills", job.primary_skills); // Set the default value in the form

      
      // const secondaryArray = job.tags.split(","); // Split the string into an array
      const transformedSecondaryArray = job.secondary_skills.map(tag => ({  label: tag }));
      setSelectedOptionsSecondary(transformedSecondaryArray);
      setValue("secondary_skills", job.secondary_skills); // Set the default value in the form

      // const positionArray = job.tags.split(","); // Split the string into an array
      const transformedPositionArray = job.job_position.map(tag => ({  label: tag }));
      setSelectedOptions(transformedPositionArray);
      setValue("job_position", job.job_position); // Set the default value in the form
    }

    if (job?.job_custom_input) {
      const transformedCustomFields = job.job_custom_input.map((input, index) => ({
        value: input,
        button: index === 0 ? "1" : "0",
      }));
      setCustomFields(transformedCustomFields);
    }


    if (status === "succeeded") {
      toast.success("successfully Updated the details");
      dipatch(clearJob());
      navigate("/change/job-list");
    }

    if(!error?.success){
      toast.error(error?.error);
      dipatch(clearJob());
    }



  }, [job, setValue,status,error]);


  return (
    <main id="content" role="main" className="main">
      <div className="content container-fluid">
        {/* Card */}
        <div className>
          {/* <form class="js-validate needs-validation" novalidate method="POST"> */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            name="job_detail"
            id="job_form"
            className="js-validate needs-validation"
            autoComplete="off"
            noValidate="novalidate"
            encType="multipart/form-data"
            method="post"
          >
            {/* <form action="http://192.168.1.161/change_pp/job/job_save" name="job_detail" id="job_form" 
  class="js-validate needs-validation" enctype="multipart/form-data" method="post" autocomplete="off" novalidate> */}
            <div id>
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Job Title <span className="text-danger">*</span>
                    </label>
                    {/* <input type="text" class="form-control" name="job_title" id="" placeholder="Job Title*" required> */}
                    <input
                      type="text"
                      name="job_title"
                      className="form-control p-2"
                      title="Job Title"
                      defaultValue={job?.job_title}
                      {...register("job_title", {
                        required: "Job title is required",
                      })}
                    />
                    {errors.job_title && (
                      <span className="invalid-feedback">
                        {errors.job_title.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Job Url
                    </label>
                    <input
                      type="text"
                      {...register("job_url")}
                      defaultValue={job?.job_url}
                      name="job_url"
                      className="form-control p-2"
                      title="Job Url"
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Job Category <span className="text-danger">*</span>
                    </label>
                    <div
                      className="tom-select-custom"
                      data-hs-validation-validate-class
                    >
                      <select
                        name="job_category"
                        className="js-select form-select"
                        title="Job Category"
                        data-validation="required"
                        defaultValue={job?.job_category}
                        required="required"
                        {...register("job_category", {
                          required: "Job category is required",
                        })}
                        data-hs-tom-select-options='{
                    "placeholder": "Select job category*"
                                    }'
                      >
                        <option value selected="selected">
                          Select Job Category
                        </option>
                        <option value="IT/Software">IT/Software</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                      </select>
                    </div>
                    {errors.job_category && (
                      <span className="invalid-feedback">
                        Field cannot be empty.
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Office hours <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="job_time"
                      className="form-control p-2"
                      title="Office hours"
                      defaultValue={job?.job_time}
                      data-validation="required"
                      {...register("job_time", {
                        required: "Office hours are required"
                      })}
                
                    />
                    {errors.job_time && (
                      <span className="invalid-feedback">
                        {errors.job_time.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Select Country <span className="text-danger">*</span>
                    </label>
                    <div
                      className="tom-select-custom"
                      data-hs-validation-validate-class
                    >
                      <select
                        name="job_country"
                        className="js-select form-select p-2"
                        title="Select Country*"
                        data-validation="required"
                        {...register("job_country")}
                        defaultValue={job?.job_country}
                        required="required"
                        data-hs-tom-select-options='{
                      "placeholder": "Select Country*"
                    }'
                      >
                        <option value selected="selected">
                          Select Country
                        </option>
                        <option value="India">India</option>
                        <option value="Dubai">Dubai</option>
                        <option value="China">China</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Job Location <span className="text-danger">*</span>
                    </label>
                    {/* <input type="text" class="form-control" name="job_location" id="" placeholder="Job Location*" required> */}
                    <input
                      type="text"
                      name="job_location"
                      className="form-control p-2"
                      defaultValue={job?.job_location}
                      {...register("job_location", {
                        required: "Job location is required",
                      })}
                      title="Job Location"
                      data-validation="required"
                      required="required"
                    />
                    {errors.job_location && (
                      <span className="invalid-feedback">
                        {errors.job_location.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Experience Years <span className="text-danger">*</span>
                    </label>
                    {/* <input type="text" class="form-control" name="job_experience_years" id="" placeholder="Experience Years*" required> */}
                    <input
                      type="text"
                      name="job_experience_years"
                      className="form-control p-2"
                      defaultValue={job?.job_experience_years}
                      title="Experience Years"
                      data-validation="required"
                      {...register("job_experience_years", {
                        required: "Experience is required",
                      })}
                    />
                    {errors.job_experience_years && (
                      <span className="invalid-feedback">
                        {errors.job_experience_years.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      No. of vacancy
                    </label>
                    {/* <input type="text" class="form-control" name="no_of_job" id="" placeholder="No. of vacancy"> */}
                    <input
                      type="text"
                      name="no_of_job"
                      className="form-control p-2"
                      defaultValue={job?.no_of_job}
                      {...register("no_of_job")}
                      title="No. of vacancy"
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Salary (Annually)
                    </label>
                    {/* <input type="text" class="form-control" name="salary" id="" placeholder="Salary (Annually)"> */}
                    <input
                      type="text"
                      name="salary"
                      defaultValue={job?.salary}
                      className="form-control p-2"
                      title="Salary"
                      {...register("salary")}
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Publish Status <span className="text-danger">*</span>
                    </label>
                    <div
                      className="tom-select-custom"
                      data-hs-validation-validate-class
                    >
                      {/* <select class="js-select form-select" name="job_country" autocomplete="off" required 
                    data-hs-tom-select-options='{
                      "placeholder": "Publish Status*"
                    }'>
                <option value=""></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select> */}
                      <select
                        name="job_publish_status"
                        className="js-select form-select p-2"
                        title="Publish Status"
                        data-validation="required"
                        defaultValue={job?.job_publish_status}
                        required="required"
                        {...register("job_publish_status", {
                          required: "Publish status is required",
                        })}
                        data-hs-tom-select-options='{
                      "placeholder": "Publish Status*"
                    }'
                      >
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </select>
                    </div>
                    {errors.job_publish_status && (
                      <span className="invalid-feedback">
                        {errors.job_publish_status.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Position <span className="text-danger">*</span>
                    </label>
                    <CreatableSelect
          id="job_position"
          name="job_position"
          isMulti
          {...register("job_position")}
          // options={options}  
          value={selectedOptions}
          defaultValue={job?.job_position}
          onChange={handleChange}
          components={animatedComponents}
          className="js-select form-select p-2 border-none"
          classNamePrefix="border-none"
          placeholder="Position"
          styles={customStyles}
        />
                  </div>
                </div>
                <div className="col-sm-4">
      <div className="mb-2"  >
        <label htmlFor="primary-skills" className="form-label">
          Primary Skills
        </label>
        <CreatableSelect
          id="primary-skills"
          name="primary_skills"
          isMulti
          {...register("primary_skills")}
          options={options}
          value={selectedOptionsPrimary}
          defaultValue={job?.primary_skills}
          onChange={(options) => {setSelectedOptionsPrimary(options)
            const value = options ? options.map((option) => option.value) : [""];
            setValue("primary_skills", value);
          }}
          components={animatedComponents}
          className="js-select form-select p-2 border-none"
          classNamePrefix="border-none"
          placeholder="Primary Skills"
          styles={customStyles}
        />
      </div>
    </div>

                <div className="col-sm-4">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Secondary Skills
                    </label>
                    <CreatableSelect
          id="secondary-skills"
          name="secondary_skills"
          isMulti
          options={options}
          {...register("secondary_skills")}
          value={selectedOptionsSecondary}
          defaultValue={job?.secondary_skills}
          onChange={(options) => {setSelectedOptionsSecondary(options)
            const value = options ? options.map((option) => option.value) : [""];
            setValue("secondary_skills", value);
          }}
          components={animatedComponents}
          className="js-select form-select p-2 border-none"
          classNamePrefix="border-none"
          placeholder="Secondary Skills"
          styles={customStyles}
        />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Job Type <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="job_type"
                      {...register("job_type", {
                        required: "Job type is required",
                      })}
                      defaultValue={job?.job_type}
                      className="form-control p-2"
                      title="Job Type"
                      data-validation="required"
                      required="required"
                    />
                    {errors.job_type && (
                      <span className="invalid-feedback">
                        {errors.job_type.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Industry <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="industry"
                      defaultValue={job?.industry}
                      {...register("industry", {
                        required: "Industry is required",
                      })}
                      className="form-control p-2"
                      title="Industry"
                      data-validation="required"
                      required="required"
                    />
                    {errors.industry && (
                      <span className="invalid-feedback">
                        {errors.industry.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Tags
                    </label>
                    <CreatableSelect
          id="tags"
          {...register("tags")}
          name="tags"
          isMulti
          // options={options}
          defaultValue={job?.tags}
          value={selectedOptionsTags}
          onChange={(options) => {setSelectedOptionsTags(options) 
            const value = options ? options.map((option) => option.value) : [""];
            setValue("tags", value);
          }

          }
          components={animatedComponents}
          className="js-select form-select p-2 border-none"
          classNamePrefix="border-none"
          placeholder="Tags"
          styles={customStyles}
        />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Schedule
                    </label>
                    {/* <textarea id="" name="schedule" class="form-control" placeholder="Schedule" rows="3"></textarea> */}
                    <textarea
                      name="schedule"
                      className="form-control p-2"
                      defaultValue={job?.schedule}
                      {...register("schedule")}
                      title="Schedule"
                      rows={3}

                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-4">
                    <label htmlFor className="form-label">
                      Note
                    </label>
                    {/* <textarea id="" name="note" class="form-control" placeholder="Note" rows="3"></textarea> */}
                    <textarea
                      name="note"
                      {...register("note")}
                      defaultValue={job?.note}
                      className="form-control p-2"
                      title="Note"
                      rows={3}
                     
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="mb-2">
                    <label htmlFor className="form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    {/* <textarea id="" name="job_description" class="form-control" placeholder="Description*" rows="5" required></textarea> */}
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorData}
                      onChange={handleEditorChange}
                      name="job_description"
                    />
                    <textarea
                      name="job_description"
                      id="job_description"
                      defaultValue={job?.job_description}
                      {...register("job_description",{
                        required: "Description is required",
                      })}
                      hidden
                    ></textarea>
                    {
                      errors.job_description && (
                        <span className="invalid-feedback">
                          {errors.job_description.message}
                        </span>
                      )

                    }
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="mb-4">
                    <label htmlFor className="form-label">
                      Requirements <span className="text-danger">*</span>
                    </label>
                    {/* <textarea id="" name="job_requirements" class="form-control" placeholder="Requirements*" rows="5" required></textarea> */}
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorDataRequirement}
                      onChange={habdlesEditorChange}
                    />
                    <textarea
                      name="job_requirements"
                      className="form-control ck_editor p-2"
                      title="Requirements"
                      data-validation="required"
                      defaultValue={job?.job_requirements}
                      {...register("job_requirements")}
                      hidden
                      required="required"
                     
                    />
                  </div>
                </div>
              </div>
              {/* old custom fields  */}
              <div className="js-add-field row mb-4">
                <div className="col-sm-12">
                   {customFields.map((field, index) => (
                  <div className="align-items-center d-flex flex-row gap-4" key={index}>
                  
                    <div className="w-100">
                    <span>{index+1}. Custom Fields</span>
                      <input
                        type="text"
                        className="form-control"
                        name={`job_custom_input[${index}]`}
                        {...register(`job_custom_input[${index}]`)}
                        value={field.value}
                        defaultValue={job?.job_custom_input}
                        onChange={(e) => handleFieldChange(index, e)}
                        placeholder="New Custom Field"
                      />
                      <span className="invalid-feedback">Field cannot be empty.</span>
                    </div>
                    <div className="w-30">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm mt-0"
                        onClick={() => handleRemoveField(index)}
                      >
                        <i className="bi-x-lg" />
                      </button>
                    </div>
                  </div>
                ))}
                  <div id="addCustomFieldsContainer"></div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mt-3"
                    onClick={handleAddField}
                  >
                    <i className="bi-plus" /> Add Custom Field
                  </button>
                </div>
              </div>
              {/* Add Phone Input Field */}
              <div id="addCustomFields" style={{ display: "none" }}>
                <div className="align-items-center d-flex flex-row gap-4 input-group-add-field">
                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      name="job_custom_input[]"
                      id
                      placeholder="New Custom Fields"
                    />
                  </div>
                  <div className="w-30">
                    <a
                      className="js-delete-field btn btn-danger btn-sm mt-0"
                      href="javascript:;"
                    >
                      <i className="bi-x-lg" />
                    </a>
                  </div>
                </div>
              </div>
              {/* End Add Phone Input Field */}
              {/* Footer */}
              <div className="d-flex align-items-center mt-5">
                <div className="ms-auto">
                  <button type="submit" className="btn btn-primary btn-sm">
                    Submit
                  </button>
                </div>
              </div>
              {/* End Footer */}
            </div>
          </form>
          {/* Success Message Body */}
          <div id="createProjectStepSuccessMessage" style={{ display: "none" }}>
            <div className="text-center">
              <img
                className="img-fluid mb-3"
                src="http://192.168.1.161/change_pp/assets/svg/illustrations/oc-hi-five.svg"
                alt
                data-hs-theme-appearance="default"
                style={{ maxWidth: "15rem" }}
              />
              <div className="mb-4">
                <h2>Successful!</h2>
                <p>Job successfully added.</p>
              </div>
            </div>
          </div>
          {/* Success Message Body End */}
        </div>
        {/* End Card */}
      </div>
    </main>
  );
};

export default EditJob;


