import React from 'react';

const CandidateModal = ({ candidate, onClose }) => {
    const skillsList = Object.entries(candidate.primary_skill).map(([skill, level]) => `${skill} `);


return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Candidate Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    <div className="row mb-6">
                        <div className="col-md-12 mb-3 mb-md-0">
                            <a className="btn btn-white btn-sm" href="#"><i className="bi-file-earmark-arrow-down-fill me-1" /> Resume (CV)</a>
                            <a className="btn btn-white btn-sm" href="#"><i className="bi-file-earmark-arrow-down-fill me-1" /> Candidate Info</a>
                        </div>
                    </div>
                    <div className="alert text-bg-dark text-center text-cap">Candidate Information</div>
                    <div className="table-responsive">
                        <table className="table table-wrap table-align-middle w-100">
                            <tbody>
                                <tr key={candidate._id}> 
                                    <th>Name:</th>
                                    <td>{`${candidate.user_id.first_name}  ${candidate.user_id.last_name}`}</td>
                                </tr>
                                <tr>
                                    <th>Whatsapp Number:</th>
                                    <td>{candidate.user_id.whatsapp}</td>
                                </tr>
                                <tr>
                                    <th>Mobile Number:</th>
                                    <td>{candidate.user_id.mobile}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{candidate.user_id.email}</td>
                                </tr>
                                <tr>
                                    <th>Address Area:</th>
                                    <td>{candidate.user_id.address}</td>
                                </tr>
                                <tr>
                                    <th>City:</th>
                                    <td>Mumbai</td>
                                </tr>
                                <tr>
                                    <th>State:</th>
                                    <td>Maharashtra</td>
                                </tr>
                                <tr>
                                    <th>Country:</th>
                                    <td>{candidate.user_id.country}</td>
                                </tr>
                                <tr>
                                    <th>Place of Birth:</th>
                                    <td>{candidate.user_id.place_of_birth}</td>
                                </tr>
                                <tr>
                                    <th>Position:</th>
                                    <td>{candidate.position}</td>
                                </tr>
                                <tr>
                                    <th>Primary Skill:</th>
                            {/* {Object.entries(candidate.primary_skill).map(([skill, level]) => (  */}
                        {/* // <tr key={skill}> */}
                        {/* //     <td>{skill}</td> */}
                            {/* <td>{level}</td> */}
                        {/* // </tr> */}
                    {/* ))  */}
                    {/* } */}
                    {skillsList}

                                </tr>
                                <tr>
                                    <th>Other Skill:</th>
                                    <td>{candidate.other_skill}</td>
                                    <td />
                                </tr>
                                <tr>
                                    <th>Higher Qualification:</th>
                                    <td>{candidate.highest_qualification}</td>
                                </tr>
                                <tr>
                                    <th>Other Qualification:</th>
                                    <td>{candidate.other_qualification}</td>
                                </tr>
                                <tr>
                                    <th>Designation / Positions Worked:</th>
                                    <td>{candidate.designation_input}</td>
                                </tr>
                                <tr>
                                    <th>Current Job Status:</th>
                                    <td>{candidate.job_status}</td>
                                </tr>
                                <tr>
                                    <th>Relevant Work Experience:</th>
                                    <td>{candidate.relevant_work_experience}</td>
                                </tr>
                                <tr>
                                    <th>Total Experience:</th>
                                    <td>{candidate.experience_on_mern}</td>
                                </tr>
                                <tr>
                                    <th>Current CTC (In Lacs):</th>
                                    <td>{candidate.current_ctc}</td>
                                </tr>
                                <tr>
                                    <th>Expected CTC (In Lacs):</th>
                                    <td>{candidate.expected_ctc}</td>
                                </tr>
                                <tr>
                                    <th>What CTC below which you will not agree to work?</th>
                                    <td>{candidate.ctc_below}</td>
                                </tr>
                                <tr>
                                    <th>Notice Period:</th>
                                    <td>{candidate.notice_period}</td>
                                </tr>
                                <tr>
                                    <th>Reference:</th>
                                    <td>{candidate.reference}</td>
                                </tr>
                                <tr>
                                    <th>Candidate Brief:</th>
                                    <td>{candidate.candidate_brief}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr className="my-5" />
                    <div className="alert text-bg-dark text-center text-cap">Software Test Engineer Skills</div>
                    <table className="table table-wrap table-align-middle">
                <div>
                    <thead className="thead-light">
                        <tr>
                            <th>Primary skill</th>
                            <th className="text-center">ADVANCE</th>
                            <th className="text-center">GOOD</th>
                            <th className="text-center">BASIC</th>
                            <th className="text-center">AVERAGE</th>
                            <th className="text-center">NO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(candidate.primary_skill).map(([skill, level]) => (
                            <tr key={level}>
                                
                                <td>{skill}</td>
                                <td className="text-center">{level === 'ADVANCE' ? '•' : null}</td>
                                <td className="text-center">{level === 'good' ? '•' : null}</td>
                                <td className="text-center">{level === 'basic' ? '•' : null}</td>
                                <td className="text-center">{level === 'AVERAGE' ? '•' : null}</td>
                                <td className="text-center">{level === 'NO' ? '•' : null}</td>
                            </tr>
                        ))}
                    </tbody>
                </div>
                <hr className='my-5'/>
                <div>
                    <thead className="thead-light">
                        <tr>
                            <th>Secondary skill</th>
                            <th className="text-center">ADVANCE</th>
                            <th className="text-center">GOOD</th>
                            <th className="text-center">BASIC</th>
                            <th className="text-center">AVERAGE</th>
                            <th className="text-center">NO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(candidate.secondary_skill).map(([skill, level]) => (
                            <tr key={level}>
                                
                                <td>{skill}</td>
                                <td className="text-center">{level === 'advance' ? '•' : null}</td>
                                <td className="text-center">{level === 'good' ? '•' : null}</td>
                                <td className="text-center">{level === 'basic' ? '•' : null}</td>
                                <td className="text-center">{level === 'average' ? '•' : null}</td>
                                <td className="text-center">{level === 'no' ? '•' : null}</td>
                            </tr>
                        ))}
                    </tbody>
                </div>
         
        </table>
                </div>
            </div>
        </div>
    </div>
);
};

export default CandidateModal;
