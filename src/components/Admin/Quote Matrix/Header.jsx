import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteQuoteData } from "../../../store/api/Admin/quoteMartix";
import {
  setSelectedCheckBox,
  setSelectEditBox,
} from "../../../store/slices/Admin/quoteMatrixSlice";

const Header = ({setHandleReload}) => {
  const dispatch = useDispatch();
  const selectedbox = useSelector(
    (state) => state.quoteMatrixSlice.selectedCheckBox
  );
  const checkBoxData = useSelector(
    (state) => state.quoteMatrixSlice.selectedCheckBoxData
  );
  const handleEditButooon = () => {
    dispatch(setSelectEditBox(true));
    setTimeout(() => {
      dispatch(setSelectEditBox(false));
      dispatch(setSelectedCheckBox(false));
    }, 5000);
  };
  const handledeletepartner = async () => {
    const res = await deleteQuoteData(checkBoxData[0].quote_id);
    if (res) {
      toast.success("Data deleted successfully");
      setHandleReload(true)
      setTimeout(() => {
        dispatch(setSelectedCheckBox(false));
      }, 100);
    }
  };
  return (
    <div className="card-header card-header-content-sm-between px-3 py-1 border-bottom">
      <div className="mb-2 mb-sm-0"></div>

      <div className="d-grid d-sm-flex justify-content-sm-end align-items-sm-center gap-2">
        {selectedbox.length !== 0 && selectedbox ? (
          <div id="datatableCounterInfo">
            <div className="d-flex align-items-center">
              <Link
                to="/change/quote-tool"
                className="btn btn-outline-info btn-xs quote_edit_btn"
                onClick={() => handleEditButooon()}
              >
                <i className="tio-delete-outlined bi-pencil"></i>
              </Link>
              <a
                className="btn btn-outline-danger btn-xs quote_delete_btn"
                onClick={() => handledeletepartner()}
              >
                <i className="bi-trash"></i>
              </a>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="col-md">
          <Link to="/change/quote-tool" className="btn btn-white btn-xs w-100">
            <i className="bi-plus me-1"></i> Add Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
