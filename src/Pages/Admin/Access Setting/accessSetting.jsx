import { useEffect, useRef, useState } from "react";
import Column from "./column";
import { setDepartment, setUserType, userAdminTypesAsync } from "../../../store/slices/Admin/userAdminSlice";
import { useDispatch, useSelector } from "react-redux";

const AccessSetting = () => {
  const [selectedRole, setSelectedRole] = useState('user');
  const userType = useSelector((state) => state.userAdmin.userType);
  const department = useSelector((state) => state.userAdmin.department);
  console.log(userType)

  const columnRef = useRef();
  const dispatch = useDispatch();

  const handleRoleChange = (event) => {
    console.log(event.target.value);
    setSelectedRole(event.target.value);
  };

  const onHandleChangeDept = (event) => {
    console.log(event.target.value);
    dispatch(setDepartment(event.target.value));
  };

  const onHandleChange = (event) => {
    console.log(event.target.value);
    dispatch(setUserType(event.target.value));
  };

  const handleSubmit = () => {
      if(columnRef.current){
        columnRef.current.submitForm();
      }
  };

  useEffect(() => {
    dispatch(userAdminTypesAsync({ userType,  department}))
  }, [dispatch]);

  const {type} = useSelector((state) => state.userAdmin);
  console.log(type)
  return (
    <main id="content" role="main" className="main">
      <div className="content container-fluid">
        <div className="row justify-content-lg-center">
          <div className="col-lg-12">
            <form className="access_level_filter">
              <div className="row mb-3">
                <div className="col">
                  <div
                    className="tom-select-custom"
                    data-hs-validation-validate-class=""
                  >
                    <select
                      className="js-selects form-select"
                      name="role"
                      autoComplete="off"
                      required=""
                      value={selectedRole}
                      onChange={handleRoleChange}
                      data-hs-tom-select-options='{
                        "allowEmptyOption": true,
                        "searchInDropdown": false,
                        "placeholder": "Select Role",
                        "hideSearch": true
                      }'
                    >
                      <option value="role">Role</option>
                      <option value="user">User</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>
                </div>
                {selectedRole === 'user' && (
                  <>
              
                    <div  className="col role-user">
                      <div
                        className="tom-select-custom"
                        data-hs-validation-validate-class=""
                      >
                        <select
                          className="js-selects form-select"
                          name="user_type"
                          autoComplete="off"
                          onChange={onHandleChange}
                          required=""
                          data-hs-tom-select-options='{
                            "allowEmptyOption": true,
                            "searchInDropdown": false,
                            "placeholder": "Select user type",
                            "hideSearch": true
                          }'
                        >
                              { type?.user?.map((item, index) => (

                          <option key={index} value={item}>{item}</option>
))}

                        </select>
                      </div>
                    </div>
                    <div className="col role-user">
                      <div
                        className="tom-select-custom"
                        data-hs-validation-validate-class=""
                      >
                        <select
                          className="js-selects form-select"
                          name="department"
                          autoComplete="off"
                          required=""
                          onChange={onHandleChangeDept}
                          data-hs-tom-select-options='{
                            "allowEmptyOption": true,
                            "searchInDropdown": false,
                            "placeholder": "Select Department",
                            "hideSearch": true
                          }'
                        >
                          { type?.dept?.map((item, index) => (

<option key={index} value={item}>{item}</option>
))}

                        </select>
                      </div>
                    </div>
                  </>
                )}
                {selectedRole === 'role' && (
                  <div className="col role-customer">
                    <div
                      className="tom-select-custom"
                      data-hs-validation-validate-class=""
                    >
                      <select
                        className="js-selects form-select"
                        name="customer_type"
                        autoComplete="off"
                        required=""
                        data-hs-tom-select-options='{
                          "allowEmptyOption": true,
                          "searchInDropdown": false,
                          "placeholder": "Select Customer type",
                          "hideSearch": true
                        }'
                      >
                        <option value="">Customer Type</option>
                        <option value="VIP">VIP</option>
                        <option value="PO">PO</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Prospects">Prospects</option>
                        <option value="Subscribers">Subscribers</option>
                        <option value="Guest">Guest</option>
                        <option value="DNC">DNC</option>
                      </select>
                    </div>
                  </div>
                )}
                 {selectedRole === 'customer' && (
                  <div className="col role-customer">
                    <div
                      className="tom-select-custom"
                      data-hs-validation-validate-class=""
                    >
                      <select
                        className="js-selects form-select"
                        name="customer_type"
                        autoComplete="off"
                        required=""
                        data-hs-tom-select-options='{
                          "allowEmptyOption": true,
                          "searchInDropdown": false,
                          "placeholder": "Select Customer type",
                          "hideSearch": true
                        }'
                      >
                        <option value="">Customer Type</option>
                        <option value="VIP">VIP</option>
                        <option value="PO">PO</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Prospects">Prospects</option>
                        <option value="Subscribers">Subscribers</option>
                        <option value="Guest">Guest</option>
                        <option value="DNC">DNC</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </form>
            <Column  ref={columnRef} />
          </div>

          <div className="d-flex justify-content-end">
            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn btn-primary btn-sm access_level_save"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccessSetting;
