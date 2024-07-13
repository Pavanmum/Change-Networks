


const TableComponent = () => {
  const formData = {
    name: 'CHANGE Networks',
    whatsappNumber: '9087654321',
    mobileNumber: '9087654321',
    email: 'changenetworkx@gmail.com',
    addressArea: 'Seawoods',
    city: 'navi mumbai',
    state: 'Maharashtra',
    placeOfBirth: 'Sangli',
    position: 'IT Recruiter',
    primarySkill: 'Sourcing',
    otherSkill: '',
    higherQualification: 'BE IT',
    otherQualification: 'HSC 70%',
    positionsWorked: 'PHP Developer',
    currentJobStatus: 'Working',
    relevantWorkExperience: '2',
    totalExperience: '1-2 years',
    currentCTC: '2',
    expectedCTC: '3',
    ctcDisagree: '',
    noticePeriod: ''
  };

  const handleSendEmail = () => {
    
  };

  return (
    <div>
      <h1>IT Recruiter</h1>
      <table border="1">
        <tbody>
          <tr><td>Name:</td><td>{formData.name}</td></tr>
          <tr><td>Whatsapp Number:</td><td>{formData.whatsappNumber}</td></tr>
          <tr><td>Mobile Number:</td><td>{formData.mobileNumber}</td></tr>
          <tr><td>Email:</td><td>{formData.email}</td></tr>
          <tr><td>Address Area:</td><td>{formData.addressArea}</td></tr>
          <tr><td>City:</td><td>{formData.city}</td></tr>
          <tr><td>State:</td><td>{formData.state}</td></tr>
          <tr><td>Place of Birth:</td><td>{formData.placeOfBirth}</td></tr>
          <tr><td>Position:</td><td>{formData.position}</td></tr>
          <tr><td>Primary Skill:</td><td>{formData.primarySkill}</td></tr>
          <tr><td>Other Skill:</td><td>{formData.otherSkill}</td></tr>
          <tr><td>Higher Qualification:</td><td>{formData.higherQualification}</td></tr>
          <tr><td>Other Qualification:</td><td>{formData.otherQualification}</td></tr>
          <tr><td>Positions Worked:</td><td>{formData.positionsWorked}</td></tr>
          <tr><td>Current Job Status:</td><td>{formData.currentJobStatus}</td></tr>
          <tr><td>Relevant Work Experience:</td><td>{formData.relevantWorkExperience}</td></tr>
          <tr><td>Total Experience:</td><td>{formData.totalExperience}</td></tr>
          <tr><td>Current CTC (In Lacs):</td><td>{formData.currentCTC}</td></tr>
          <tr><td>Expected CTC (In Lacs):</td><td>{formData.expectedCTC}</td></tr>
          <tr><td>Notice Period:</td><td>{formData.noticePeriod}</td></tr>
        </tbody>
      </table>
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};

export default TableComponent;
