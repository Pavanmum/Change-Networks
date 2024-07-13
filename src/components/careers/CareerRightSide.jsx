import  { useEffect, useRef } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FaBriefcase,FaRegClock } from "react-icons/fa6"
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobDescriptionByIdAsync, setId, setModalOpen, setShowPassword } from '../../store/slices/careerSlice';
import LoadingSpinner from '../Loader/LoadingSpinner';
import { formatDistanceToNow, parseISO } from 'date-fns';
import LoginModal from '../modal/LoginModal';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CareerRightSide = () => {

  //  ? Selector for getting the id and isLoadingSingle state from the store
  const {id,isLoadingSingle,isModalOpen,showPassword} = useSelector ((state) => state.careerSlice)
  
  console.log(isModalOpen)
  //  ? Selector for getting the id 
  const data = useSelector ((state) => state.careerSlice.data)
  const navigate = useNavigate();
  
  //  ? Selector for getting the singleData from the store
  const singleData = useSelector ((state) => state.careerSlice.singleData)
  

  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setModalOpen(false));
    dispatch(setShowPassword(false));

};


  const highlightsRef = useRef(null);
  const descriptionRef = useRef(null);
  const requirementsRef = useRef(null);
  const infoRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOnClick = () => {
    const token = Cookies.get('token');
    console.log(token);
  
    if (!token) {
      dispatch(setShowPassword(false));
      dispatch(setModalOpen(true));
    } else {
      navigate('/profile');
    }
  }

  const fetchDataWithDelay = () => {
    if (!id || id.trim() === "") {
      const defaultId = data.job[0]?._id;
      console.log(defaultId);
      dispatch(setId(defaultId));
      dispatch(fetchJobDescriptionByIdAsync(defaultId));
    } else {
      console.log(id);
      dispatch(fetchJobDescriptionByIdAsync(id));
    }
    
  };
 
  useEffect(() => {
    const timer = setTimeout(fetchDataWithDelay, 100); 
    return () => clearTimeout(timer);
  }, [dispatch, id, data]);
  return (
    <div className="srpJdContainer" ref={containerRef}>
    {isLoadingSingle ? (
      <div className="loaderContainer">
        <div className="loader"></div>
        <LoadingSpinner />
      </div>
    ) : (
      <div id="jdSection" className="dbJdSection" key={singleData.job?._id}>
        <div className="jdHeader">
          <div className="jdTitle">{singleData.job?.job_title}</div>
          <div className="d-flex">
            <div className="applyBtnCont">
              <button
                type="button"
                data-toggle="modal"
                data-target="#loginModal"
                id="btn-candidate-add-submit"
                className="btn btn-primary quick-apply"
                style={{}}
                onClick={handleOnClick}
              >
                Quick Apply
              </button>
            </div>
            <button type="button" className="close ml-4" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        <div className="jobDetailMenu">
          <ul className="d-flex m-0 p-0">
            <li className="selectedTab" onClick={() => scrollToSection(highlightsRef)}>
              Highlights
            </li>
            <li onClick={() => scrollToSection(descriptionRef)}>
                Job Description
            </li>
            <li onClick={() => scrollToSection(requirementsRef)}>
                Requirements
            </li>
            <li onClick={() => scrollToSection(infoRef)}>
                More Info
            </li>
          </ul>
        </div>
        <div className="jDBody">
          <div id="highlightsTab" ref={highlightsRef} className="jobHighlights tabBox">
            <div className="highlightContent">
              <div className="cardBody">
                <div className="bodyRow">
                  <div className="" style={{ alignItems: "center", "font": "normal normal normal 16px/19px Poppins" }}>
                    <CiLocationOn />
                  </div>
                  <div className="details">{singleData.job?.job_location} {singleData.job?.job_country}</div>
                </div>
                <div className="bodyRow">
                  <div className="" style={{ alignItems: "center", "font": "normal normal normal 16px/19px Poppins" }}>
                    <FaBriefcase />
                  </div>
                  <div className="details">{singleData.job?.no_of_job}</div>
                </div>
                <div className="bodyRow">
                  <div className="" style={{ alignItems: "center", "font": "normal normal normal 16px/19px Poppins" }}>
                    <FaRegClock />
                  </div>
                  <div className="details">{singleData.job?.job_time}</div>
                </div>
                <div className="bodyRow">
                  <div className="" style={{ alignItems: "center", "font": "normal normal normal 16px/19px Poppins" }}>
                    <LiaRupeeSignSolid />
                  </div>
                  <div className="details">{singleData.job?.salary}</div>
                </div>
              </div>
            </div>
          </div>
          <div id="descriptionTab" ref={descriptionRef} className="jobCard tabBox">
            <div className="jobDescription">
              <div className="jobDescheading">Job Description</div>
              <div className="jobDescInfo">
                <div className="jobDescriptionInfo" dangerouslySetInnerHTML={{ __html: singleData.job?.job_description }} />
              </div>
            </div>
          </div>
          <div id="requirementsTab" ref={requirementsRef} className="jobCard tabBox">
            <div className="jobDescription">
              <div className="jobDescheading">Requirements</div>
              <div className="jobDescInfo">
                <div className="jobDescriptionInfo" dangerouslySetInnerHTML={{ __html: singleData.job?.job_requirements }} />
              </div>
            </div>
          </div>
          <div id="infoTab" ref={infoRef} className="jobCard tabBox">
            <div className="jobDescription">
              <div className="jobDescheading">More Info</div>
              <div className="jobInfo">
                <div className="jobTitle">
                  <i className="fal fa-briefcase mr-2" />
                  <p className="jobTitleName">Job Type</p>
                </div>
                <div className="jobDesc">{singleData.job?.job_type}</div>
              </div>
              <div className="jobInfo">
                <div className="jobTitle">
                  <i className="fal fa-building mr-2" />
                  <p className="jobTitleName">Industry</p>
                </div>
                <div className="jobDesc">{singleData.job?.industry}</div>
              </div>
              <div className="jobInfo">
                <div className="jobTitle">
                  <i className="fal fa-network-wired mr-2" />
                  <p className="jobTitleName">Primary Skills</p>
                </div>
      <div className="jobDesc skillSet">
        <div className="skillDesc">{singleData.job?.primary_skills}</div>
      </div>
      </div>
      <div className="jobInfo">
      <div className="jobTitle">
        <i className="fal fa-user-cog mr-2" />
        <p className="jobTitleName">Secondary Skills</p>
      </div>
      <div className="jobDesc skillSet">
        <div className="skillDesc">{singleData.job?.secondary_skills}</div>
      </div>
      </div>
      <div className="jobInfo">
      <div className="jobTitle">
        <i className="fal fa-user-cog mr-2" />
        <p className="jobTitleName">Tags</p>
      </div>
      <div className="jobDesc skillSet">
        <div className="skillDesc">{singleData.job?.tags}</div>
      </div>
      </div>
      </div>
      </div>
      <div className="jobDetailFooter">
      <div className="jobIdInfo d-flex align-items-center">
      Job Post: <div className="ml-2"><i className="fal fa-clock" />{singleData?.job?.updated_at && formatDistanceToNow(parseISO(singleData?.job?.updated_at), { addSuffix: true })}</div>
      </div>
      </div>
      </div>
      </div>
    )}
    <LoginModal  isModalOpens={isModalOpen} handleOk={false} handleCancel={closeModal} />
      </div>
    )
}

export default CareerRightSide
