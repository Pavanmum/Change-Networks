import  { useEffect } from 'react';
import "./Gallery.css";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, setSearchTerm } from '../../store/slices/imageSlice';
import { fetchImagesByCategoryAsync } from '../../store/slices/imageSlice';
import { fetchImagesAsync } from '../../store/slices/imageSlice';
import { useNavigate } from 'react-router-dom';
import { setSearchCategory } from '../../store/slices/imageSlice';

const FilterGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector(selectCategory);
  const  categorySearch= useSelector((state) => state.image);
  const searchCategory = useSelector((state) => state.image);
  const searchTerm = useSelector((state) => state.image);

  const handleClick = (query) => {
    dispatch(setSearchCategory({query}));
    dispatch(fetchImagesAsync({ searchCategory: query }))
    navigate(`/gallery/${query.toLowerCase()}`);

  };

    const handleMenuClick = async (query) => {
      console.log(query,"query");
     dispatch(setSearchTerm(query));
      dispatch(fetchImagesAsync({ searchTerm: query}));
      const modifiedQuery = query.replace(/\//g, '-');
    navigate(`/gallery/${modifiedQuery}`);
    
  };


  useEffect(() => {
      dispatch(fetchImagesByCategoryAsync({ categorySearch}));
      // dispatch(fetchImagesAsync({searchTerm, searchCategory}))

  }, [dispatch,categorySearch]);




 
// console.log(category);
// console.log(category.Routers);


  // const menuItems = category.length ? category.Routers.map((item) => ({


  //   label: isCategoryLoading ? <LoadingOutlined /> : item,
  //   key: item.id,
  //   icon: <UserOutlined />,
    

  // })) : [{ label: "No data found", disabled: true }];

  const renderMenu = (categoryList) => {
    const menuItems = categoryList?.length ? categoryList.map((item) => ({
      label: item,
      key: item.id,
      icon: <UserOutlined />,
    })) : [{ label: "No data found" }];

    
    return (
      <Menu style={{ maxHeight: 200, overflowY: 'auto' }}>
        {menuItems.map((menuItem) => (
          <Menu.Item key={menuItem.key} onClick={() => handleMenuClick(menuItem.label)}>
            {menuItem.label}
          </Menu.Item>
        ))}
      </Menu>
    );
  };
  
  return (
    <header className='header-middle-style'>
      <div className='container-xxl'>
        <div className='row' style={{ marginLeft: "3rem" }}>
          <Space wrap>
            <Button onClick={() => handleClick("mix")} placement="bottom" >
              All
            </Button>

            <Dropdown.Button overlay={renderMenu(category.Switches)} onClick={() => handleClick("Switches")} placement="bottom" icon={<DownOutlined />}>
              Switch
            </Dropdown.Button>
            <Dropdown.Button overlay={renderMenu(category.Wireless)} onClick={() => handleClick("Wireless")} placement="bottom" icon={<DownOutlined />}>
              Wireless
            </Dropdown.Button>
            <Dropdown.Button overlay={renderMenu(category.Routers)} onClick={() => handleClick("Routers")} placement="bottom" icon={<DownOutlined />}>
              Routers
            </Dropdown.Button>
            <Dropdown.Button overlay={renderMenu(category.Firewalls)} onClick={() => handleClick("Firewalls")} placement="bottom" icon={<DownOutlined />}>
              Firewalls
            </Dropdown.Button>
            <Dropdown.Button overlay={renderMenu(category.IPPhones)} onClick={() => handleClick("IPPhones")} placement="bottom" icon={<DownOutlined />} >
              IP Phones
            </Dropdown.Button>
            <Dropdown.Button overlay={renderMenu(category.Others)} onClick={() => handleClick("Others")} placement="bottom" icon={<DownOutlined />}>
              Others
            </Dropdown.Button>
            <Button onClick={() => handleClick("COMMANDO")} placement="bottom">COMMANDO</Button>
          </Space>
        </div>
      </div>
    </header>
  );
  }
  
  export default FilterGallery;