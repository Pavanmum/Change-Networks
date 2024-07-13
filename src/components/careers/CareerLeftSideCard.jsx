import { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaBriefcase,FaRegClock } from "react-icons/fa6"
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobDescriptionAsync, setId  } from "../../store/slices/careerSlice";

const CareerLeftSideCard = () => {

  const dispatch = useDispatch()
  const data = useSelector ((state) => state.careerSlice.data)
  const totalCount = useSelector ((state) => state.careerSlice.totalData)
  const id = useSelector ((state) => state.careerSlice.id)
  console.log(id)
  console.log(data.job)

  const handleClick = (id) => {
    console.log("clickeds",id)
    dispatch(setId(id))
  }
  

  useEffect(() => {
    dispatch(fetchAllJobDescriptionAsync())
    // dispatch(fetchJobDescriptionByIdAsync(id))
  }, [dispatch])


  return (
    <div className="srpCardContainer">
      <div className="srpResultCard">
        <div className="query-details-container">
          <div className="query-details">
            <p className="job-count">Showing <span className="jtCount">{totalCount}</span> results for <span className="jtText">All</span></p>
          </div>
        </div>
        {data?.job && data?.job?.map((job) => {
          return (
            <div className="cardBox itsoftware" 
            onClick={() => handleClick(job._id)}
            key={job._id}>
              <div className="srpResultCardContainer">
                <div className="cardContainer activeCard1" data-id={job._id}>
                  <div className="cardHead srpCardHeader">
                    <div className="infoSection infoSectionFullWidth">
                      <div className="jobTitle">{job.job_title}</div>
                    </div>
                  </div>
                  <div className="cardBody">
                    <div className="bodyRow">
                      <div className="" style={{
                        alignItems: "center",
                        "font": "normal normal normal 16px/19px Poppins",
                      }}>
                        <CiLocationOn />
                      </div>
                      <div className="details">{job.job_location} {job.job_country}</div>
                    </div>
                    <div className="bodyRow">
                      <div className="" style={{
                        alignItems: "center",
                        "font": "normal normal normal 16px/19px Poppins",
                      }}>
                        <FaBriefcase />
                      </div>
                      <div className="details">{job.no_of_job}</div>
                    </div>
                    <div className="bodyRow">
                      <div className="" style={{
                        alignItems: "center",
                        "font": "normal normal normal 16px/19px Poppins",
                      }}>
                        <FaRegClock />
                      </div>
                      <div className="details">{job.job_time}</div>
                    </div>
                    <div className="bodyRow">
                      <div className="" style={{
                        alignItems: "center",
                        "font": "normal normal normal 16px/19px Poppins",
                      }}>
                        <LiaRupeeSignSolid />
                      </div>
                      <div className="details">{job.salary}</div>
                    </div>
                  </div>
                  <div className="cardFooter d-sm-block d-lg-none d-md-none">
                    <span className="jobType d-none">ITSoftware</span>
                    <div className="applyBtnCont">
                      <button className="btn">Quick Apply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CareerLeftSideCard
