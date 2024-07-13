import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CandidateRow from "./column";
import { candidateListAsync } from "../../../store/slices/Admin/candidateSlice";
import CandidateModal from "./CandidateModal.jsx";

const CandidatePage = () => {
  const dispatch = useDispatch();
  const candidateList = useSelector((state) => state.candidateSlice.data);

  useEffect(() => {
    dispatch(candidateListAsync());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleOpenModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCandidate(null);
    setIsModalOpen(false);
  };


  return (
    <>
      <main id="content" role="main" className="main">
        <div className="content container-fluid py-1 px-1">
          <div className="">
            <div className="card-header card-header-content-sm-between px-3 py-1 border-bottom">
              <div className="mb-2 mb-sm-0"></div>
              <div className="d-grid d-sm-flex justify-content-sm-end align-items-sm-center gap-2">
                <div id="datatableCounterInfo" style={{ display: "none" }}>
                  <div className="d-flex align-items-center">
                    <span className="fs-6 me-3">
                      <span id="datatableCounter">0</span>
                      Selected
                    </span>
                    <a className="btn btn-outline-danger btn-xs" href="javascript:;">
                      <i className="tio-delete-outlined" /> Delete
                    </a>
                  </div>
                </div>
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-white btn-xs dropdown-toggle w-100"
                    id="usersExportDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi-download me-2" /> Export
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-sm-end"
                    aria-labelledby="usersExportDropdown"
                  >
                    <span className="dropdown-header">Options</span>
                    <a id="export-copy" className="dropdown-item" href="javascript:;">
                      <img
                        className="avatar avatar-xss avatar-4x3 me-2"
                        src="http://192.168.1.161/change_pp/assets/svg/illustrations/copy-icon.svg"
                        alt=""
                      />
                      Copy
                    </a>
                    <a id="export-print" className="dropdown-item" href="javascript:;">
                      <img
                        className="avatar avatar-xss avatar-4x3 me-2"
                        src="http://192.168.1.161/change_pp/assets/svg/illustrations/print-icon.svg"
                        alt=""
                      />
                      Print
                    </a>
                    <div className="dropdown-divider" />
                    <span className="dropdown-header">Download options</span>
                    <a id="export-excel" className="dropdown-item" href="javascript:;">
                      <img
                        className="avatar avatar-xss avatar-4x3 me-2"
                        src="http://192.168.1.161/change_pp/assets/svg/brands/excel-icon.svg"
                        alt=""
                      />
                      Excel
                    </a>
                    <a id="export-csv" className="dropdown-item" href="javascript:;">
                      <img
                        className="avatar avatar-xss avatar-4x3 me-2"
                        src="http://192.168.1.161/change_pp/assets/svg/components/placeholder-csv-format.svg"
                        alt=""
                      />
                      .CSV
                    </a>
                    <a id="export-pdf" className="dropdown-item" href="javascript:;">
                      <img
                        className="avatar avatar-xss avatar-4x3 me-2"
                        src="http://192.168.1.161/change_pp/assets/svg/brands/pdf-icon.svg"
                        alt=""
                      />
                      PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive datatable-custom">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Experience Years</th>
                    <th>Experience Level</th>
                    <th>Current CTC</th>
                    <th>Expected CTC</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Application Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateList?.candidate?.map((candidate, index) => (
                    <CandidateRow key={index} candidate={candidate} onOpenModal={handleOpenModal} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal fade" id="viewProfileModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Candidate Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  />
                </div>
                <div className="modal-body">
                  {selectedCandidate && (
                    <>
                      <div className="row mb-6">
                        <div className="col-md-12 mb-3 mb-md-0">
                          <a className="btn btn-white btn-sm" href={selectedCandidate.cvLink}>
                            <i className="bi-file-earmark-arrow-down-fill me-1" /> Resume (CV)
                          </a>
                          <a className="btn btn-white btn-sm" href="#">
                            <i className="bi-file-earmark-arrow-down-fill me-1" /> Candidate Info
                          </a>
                        </div>
                      </div>
                      <div className="alert text-bg-dark text-center text-cap">Candidate Information</div>
                      <div className="table-responsive">
                        <table className="table table-wrap table-align-middle w-100">
                          <tbody>
                            <tr>
                              <th>Name:</th>
                              <td>{selectedCandidate.name}</td>
                            </tr>
                            <tr>
                              <th>Whatsapp Number:</th>
                              <td>{selectedCandidate.phone}</td>
                            </tr>
                            <tr>
                              <th>Mobile Number:</th>
                              <td>{selectedCandidate.phone}</td>
                            </tr>
                            <tr>
                              <th>Email:</th>
                              <td>{selectedCandidate.email}</td>
                            </tr>
                            <tr>
                              <th>Address Area:</th>
                              <td>{selectedCandidate.location}</td>
                            </tr>
                            <tr>
                              <th>City:</th>
                              <td>{selectedCandidate.location}</td>
                            </tr>
                            <tr>
                              <th>
                                </th>
<td>{selectedCandidate.state}</td>
</tr>
<tr>
<th>Country:</th>
<td>{selectedCandidate.country}</td>
</tr>
<tr>
<th>Place of Birth:</th>
<td>{selectedCandidate.placeOfBirth}</td>
</tr>
<tr>
<th>Position:</th>
<td>{selectedCandidate.position}</td>
</tr>
<tr>
<th>Primary Skill:</th>
<td>{selectedCandidate.primarySkill}</td>
</tr>
<tr>
<th>Other Skill:</th>
<td>{selectedCandidate.otherSkill}</td>
</tr>
<tr>
<th>Higher Qualification:</th>
<td>{selectedCandidate.higherQualification}</td>
</tr>
<tr>
<th>Other Qualification:</th>
<td>{selectedCandidate.otherQualification}</td>
</tr>
<tr>
<th>Designation / Positions Worked:</th>
<td>{selectedCandidate.designation}</td>
</tr>
<tr>
<th>Current Job Status:</th>
<td>{selectedCandidate.currentJobStatus}</td>
</tr>
<tr>
<th>Relevant Work Experience:</th>
<td>{selectedCandidate.relevantWorkExperience}</td>
</tr>
<tr>
<th>Total Experience:</th>
<td>{selectedCandidate.totalExperience}</td>
</tr>
<tr>
<th>Current CTC (In Lacs):</th>
<td>{selectedCandidate.currentCTC}</td>
</tr>
<tr>
<th>Expected CTC (In Lacs):</th>
<td>{selectedCandidate.expectedCTC}</td>
</tr>
<tr>
<th>What CTC below which you will not agree to work?</th>
<td>{selectedCandidate.minAcceptableCTC}</td>
</tr>
<tr>
<th>Notice Period:</th>
<td>{selectedCandidate.noticePeriod}</td>
</tr>
<tr>
<th>Reference:</th>
<td>{selectedCandidate.reference}</td>
</tr>
<tr>
<th>Candidate Brief:</th>
<td>{selectedCandidate.brief}</td>
</tr>
</tbody>
</table>
</div>
<div>
<hr className="my-5" />
<div className="alert text-bg-dark text-center text-cap">Software Test Engineer Skills</div>
<table className="table table-wrap table-align-middle">
<thead className="thead-light">
<tr>
<th>Primary Skills</th>
<th className="text-center">Beginner</th>
<th className="text-center">Intermediate</th>
<th className="text-center">Advanced</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bugzilla</td>
<td className="text-center" />
<td className="text-center">•</td>
<td className="text-center" />
</tr>
<tr>
<td>HP-LoadRunner</td>
<td className="text-center" />
<td className="text-center">•</td>
<td className="text-center" />
</tr>
<tr>
<td>Debugging-Codes</td>
<td className="text-center" />
<td className="text-center">•</td>
<td className="text-center" />
</tr>
<tr>
<td>Experience-with-Windows-and-Linux</td>
<td className="text-center" />
<td className="text-center">•</td>
<td className="text-center" />
</tr>
</tbody>
<thead className="thead-light">
<tr>
<th>Secondary Skills</th>
<th className="text-center">Beginner</th>
<th className="text-center">Intermediate</th>
<th className="text-center">Advanced</th>
</tr>
</thead>
<tbody>
<tr>
<td>Software-Troubleshooting</td>
<td className="text-center" />
<td className="text-center">•</td>
<td className="text-center" />
</tr>
<tr>
<td>Collate-data-and-compile-test-reports</td>
<td className="text-center" />
<td className="text-center">•</td>
<td className="text-center" />
</tr>
</tbody>
</table>
</div>
</>
)}
</div>
</div>
</div>
</div>
</div>
</main>
{isModalOpen && selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={handleCloseModal}
        />
      )}
</>
);
};


export default CandidatePage;