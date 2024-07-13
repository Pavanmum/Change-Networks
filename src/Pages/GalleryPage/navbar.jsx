import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useCallback, useEffect } from 'react';
import useDebounce from '../../utils/helper';
import { fetchImagesAsync, setSearchTerm } from '../../store/slices/imageSlice';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/img/changed-logo.png';
import { Link } from 'react-router-dom';


function FormExample() {
  const searchTerm = useSelector((state) => state.image);

  const dispatch = useDispatch();
  const debouncedSearch = useCallback(
    useDebounce((query) => {
      console.log(query);
      dispatch(fetchImagesAsync({searchTerm: query}));
    }, 300),
    [dispatch, setSearchTerm]
  );


  const handleInputChange = (e) => {
    const query = e.target.value;
    debouncedSearch(query);
  };

 

  useEffect(() => {
    dispatch(fetchImagesAsync());
  }, [dispatch, searchTerm]);
  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <Form inline>
        <InputGroup>
        <Link to="/">
          <img 
          src={logo}
          style={{width: "50px", height: "50px",margin:"0.3rem", padding: "0.3rem"}}
          alt="" />
          </Link>
           
        </InputGroup>
      </Form>
      <div>
      <Col xs="auto">
            <Form.Control
              type="text"
              className='input-box-seraching'
              placeholder="Search"
              onChange={handleInputChange}
              style={{   width: "450px", height: "50px",margin:"0.3rem", padding: "0.5rem", borderRadius: "10px" ,fontSize: "1.2rem"}}
            />
          </Col>
      </div>
      <Form inline>
        <Row>      
          <Col xs="auto">
          <img 
          src={"https://change-networks.com/assets/img/stripe-logo.png"}
          style={{width: "70px", height: "50px",margin:"0.3rem", padding: "0.3rem"}}
           alt="" />
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default FormExample;




