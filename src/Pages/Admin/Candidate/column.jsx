import React from 'react';

const CandidateRow = ({ candidate, onOpenModal }) => {
  const {
    id,
    position,
    relevant_work_experience,
    experience_on_mern,
    current_ctc,
    expected_ctc,
    user_id: { first_name, last_name, email, mobile, country },
    createdAt,
    status,
    cvLink,
  } = candidate;

  return (
    <tr>
      <td className="table-column-pe-0 py-0">{id}</td>
      <td className="py-0">{`${first_name} ${last_name}`}</td>
      <td className="py-0">{position}</td>
      <td className="text-center py-0">{relevant_work_experience}</td>
      <td className="text-center py-0">{experience_on_mern}</td>
      <td className="text-center py-0">{current_ctc}</td>
      <td className="text-center py-0">{expected_ctc}</td>
      <td className="text-center py-0">{email}</td>
      <td className="text-center py-0">{mobile}</td>
      <td className="text-center py-0">{country}</td>
      <td className="text-center py-0">
        <span className="badge bg-success">{createdAt}</span>
      </td>
      <td className="text-center py-0">{status}</td>
      <td className="text-center py-0">
        <div className="btn-group">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={cvLink}
            className="btn btn-sm"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Download CV"
          >
            <i className="bi-download" />
          </a>
          <a
            className="btn btn-sm pointer candidate-info"
            data-id={id}
            onClick={() => onOpenModal(candidate)}
          >
            <i
              className="bi-eye"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="View Profile"
            />
          </a>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-icon btn-sm"
              id="statusDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="bi-three-dots-vertical"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Status"
              />
            </button>
            <div
              className="dropdown-menu dropdown-menu-end mt-1"
              aria-labelledby="statusDropdown"
            >
              <a
                className="dropdown-item pointer candidate-status-change"
                data-id={id}
                data-status={0}
              >
                <i className="bi-person-badge dropdown-item-icon" /> Applied
              </a>
              <a
                className="dropdown-item pointer candidate-status-change"
                data-id={id}
                data-status={1}
              >
                <i className="bi-clipboard-check dropdown-item-icon" /> Short
                Listed
              </a>
              <a
                className="dropdown-item pointer candidate-status-change"
                data-id={id}
                data-status={2}
              >
                <i className="bi-hourglass dropdown-item-icon" /> On Hold
              </a>
              <a
                className="dropdown-item pointer candidate-status-change"
                data-id={id}
                data-status={3}
              >
                <i className="bi-trash3 dropdown-item-icon" /> Rejected
              </a>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CandidateRow;
