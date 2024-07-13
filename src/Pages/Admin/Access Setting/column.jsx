// Column.jsx
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectUserAdmin, userAdminAsync, userAdminTypesAsync } from '../../../store/slices/Admin/userAdminSlice';
import { accessLevelAsync, selectAccess } from '../../../store/slices/Admin/accessSlice';
import { AdminLeftSideBarLinks } from '../../../../constant';


const Column = forwardRef((props, ref) => {
  Column.displayName = 'Column';
  const dispatch = useDispatch();
  const { user } = useSelector(selectUserAdmin);
  const access = useSelector(selectAccess);
  const userType = useSelector((state) => state.userAdmin.userType);
  const department = useSelector((state) => state.userAdmin.department);
  
  const { register, handleSubmit, setValue, getValues } = useForm();

  // State to track changes in access
  const [viewAccess, setViewAccess] = useState({});
  const [editAccess, setEditAccess] = useState({});

  useEffect(() => {
    dispatch(userAdminAsync({userType, department}));
  }, [dispatch,userType,department]);


  useEffect(() => {
    if (user) {
      user.forEach(item => {
        AdminLeftSideBarLinks.forEach(link => {
          setValue(`view_access_${item._id}_${link.SR}`, item.view_access.includes(link.SR));
          setValue(`edit_access_${item._id}_${link.SR}`, item.edit_access.includes(link.SR));
        });
      });
    }
  }, [user, setValue]);
  

  const handleViewAccessChange = (userId, pageId, isChecked, view_access) => {
    setViewAccess(prev => {
      const currentViewAccess = prev[userId] || [];
      const previousValue = view_access;

      const updatedViewAccess = 
        isChecked 
        ? [...new Set([...currentViewAccess, pageId, ...previousValue])] 
        : currentViewAccess.filter(id => id !== pageId);
      return {
        ...prev,
        [userId]: updatedViewAccess
      };
    });
  };

  const handleEditAccessChange = (userId, pageId, isChecked, edit_access) => {
    setEditAccess(prev => {
      const currentEditAccess = prev[userId] || [];
      const previousValue = edit_access || [];
  
      let updatedEditAccess;
  
      if (isChecked) {
        updatedEditAccess = [...new Set([...currentEditAccess, pageId, ...previousValue])]; 
      } else {
        updatedEditAccess = currentEditAccess
          .filter(id => id !== pageId)
          .filter(id => previousValue.includes(id));
      }
  
      return {
        ...prev,
        [userId]: updatedEditAccess
      };
    });
  };

  const handleSubmitForm = (data) => {                                                      
    dispatch(accessLevelAsync({ editAccess, viewAccess }));
    dispatch(userAdminAsync());
  };

  // Expose the form submit function to parent components
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit(handleSubmitForm)();
    }
  }));

  return (
    <div className="card">
      <div className="table-responsive datatable-custom">
        <form className="access_level_form">
          <div id="datatable_wrapper" className="dataTables_wrapper no-footer">
            <div className="dataTables_length" id="datatable_length">
              <label>
                Show{' '}
                <select
                  name="datatable_length"
                  aria-controls="datatable"
                  className=""
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>{' '}
                entries
              </label>
            </div>
            <div id="datatable_filter" className="dataTables_filter">
              <label>
                Search:
                <input
                  type="search"
                  className=""
                  placeholder=""
                  aria-controls="datatable"
                />
              </label>
            </div>
            <table
              id="datatable"
              className="table table-sm table-thead-bordered table-nowrap table-align-middle card-table table-hover dataTable no-footer"
              data-hs-datatables-options='{
                "columnDefs": [{
                  "targets": [],
                  "orderable": false
                }],
                "order": [],
                "pageLength": -1,
                "isResponsive": true
              }'
              role="grid"
              aria-describedby="datatable_info"
              style={{ width: 2946 }}
            >
              <thead className="thead-light">
                <tr role="row">
                  <th style={{ width: 27 }}>#</th>
                  <th style={{ width: 105 }}>Page Name</th>
                  {user && user.map((item, index) => (
                    <th className="text-center" colSpan={2} rowSpan={1} key={index}>
                      {item.user_fname}
                    </th>
                  ))}
                </tr>
                <tr role="row">
                  <th colSpan={2} rowSpan={1} />
                  {user && user.map((item, index) => (
                    <React.Fragment key={index}>
                      <th className="text-center" style={{ width: 51 }}>View</th>
                      <th className="text-center" style={{ width: 47 }}>Edit</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AdminLeftSideBarLinks.map((item, index) => (
                  <tr role="row" key={index} className="even">
                    <td>{item.SR}</td>
                    <td>{item.label}</td>
                    {user && user.map((userItem, idx) => (
                      <React.Fragment key={idx}>
                        <td className="text-center">
                          <div className="form-check form-check-inline me-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              {...register(`view_access_${userItem._id}_${item.SR}`)}
                              onChange={(e) => handleViewAccessChange(userItem._id, item.SR, e.target.checked, userItem.view_access)}
                              defaultChecked={getValues(`view_access_${userItem._id}_${item.SR}`)}
                            />
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="form-check form-check-inline me-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              {...register(`edit_access_${userItem._id}_${item.SR}`)}
                              onChange={(e) => handleEditAccessChange(userItem._id, item.SR, e.target.checked, userItem.edit_access)}
                              defaultChecked={getValues(`edit_access_${userItem._id}_${item.SR}`)}
                            />
                          </div>
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Column;
