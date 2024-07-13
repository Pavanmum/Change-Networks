import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../../components/ConfirmModal/modal';
import "./jobAdmin.css";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteJobAsync } from '../../../store/slices/Admin/jobSlice';
import { fetchAllJobDescriptionAsync } from '../../../store/slices/careerSlice';
import { toast } from 'react-toastify';

const JobTable = ({ jobs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);
  const { error, status } = useSelector((state) => state.jobSlice);
  const dispatch = useDispatch();

  const openModal = (id) => {
    setCurrentJobId(id);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (currentJobId) {
      dispatch(DeleteJobAsync(currentJobId));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentJobId(null);
  };

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Job Deleted Successfully");
      dispatch(fetchAllJobDescriptionAsync());
      closeModal();
    }
    if (status === "failed") {
      toast.error(error);
      console.log(error);
    }
  }, [status, error, dispatch]);

  return (
    <div className="table-responsive datatable-custom">
      <table id="datatable" className="w-100 table table-sm table-nowrap table-align-middle table-hover card-table">
        <thead>
          <tr>
            <th>Sr.#</th>
            <th className="table-column-ps-0">Job Type</th>
            <th className="text-center">Country</th>
            <th className="text-center">Experience</th>
            <th className="text-center">Publish</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((job, index) => (
            <tr key={job._id}>
              <td>{index + 1}</td>
              <td className="table-column-ps-0 py-0">{job.job_category}</td>
              <td className="text-center py-0">{job.job_country}</td>
              <td className="text-center py-0">{job.job_experience_years}</td>
              <td className="text-center py-0">
                <span className={`badge rounded-pill ${job.job_publish_status === "1" ? 'bg-success' : 'bg-danger'}`}>
                  {job.job_publish_status === "1" ? 'Publish' : 'Unpublish'}
                </span>
              </td>
              <td className="text-center py-0">
                <div className="btn-group">
                  <Link to={`/change/add_job/${job._id}`} state={{ job }} className="btn btn-sm" title="Edit">
                    <i className="bi-pencil" />
                  </Link>
                  <Link to={`/change/job/add_job/?copy=${job._id}`} className="btn btn-sm" title="Copy">
                    <i className="bi bi-files" />
                  </Link>
                  <button
                    data-id={job._id}
                    className="btn btn-sm pointer job-delete"
                    title="Delete"
                    onClick={() => openModal(job._id)}  // Passing job ID to openModal
                  >
                    <i className="bi-trash" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        heading={"Delete Data"}
        body={"Are you sure, you want to delete!"}
        handleClose={closeModal}
        handleConfirm={handleConfirm}
        show={isModalOpen}
      />
    </div>
  );
};

JobTable.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      job_category: PropTypes.string.isRequired,
      job_country: PropTypes.string.isRequired,
      job_experience_years: PropTypes.string.isRequired,
      job_publish_status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default JobTable;
