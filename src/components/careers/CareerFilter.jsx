// import React from 'react'

const CareerFilter = () => {
  return (
    <div className="top-filter">
    <div className="container-fluid">
      <ul className="filter-section">
        <li>
          <input
            type="checkbox"
            name="jobType"
            id="CheckAll"
            defaultValue="All"
            defaultChecked
          />
          <label className="filter-pill" htmlFor="CheckAll">
            All
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            name="jobType"
            id="CheckIT/Software"
            defaultValue="ITSoftware"
          />
          <label className="filter-pill" htmlFor="CheckIT/Software">
            IT/Software
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            name="jobType"
            id="CheckSales"
            defaultValue="Sales"
          />
          <label className="filter-pill" htmlFor="CheckSales">
            Sales
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            name="jobType"
            id="CheckHR"
            defaultValue="HR"
          />
          <label className="filter-pill" htmlFor="CheckHR">
            HR
          </label>
        </li>
      </ul>
    </div>
  </div>

  )
}

export default CareerFilter