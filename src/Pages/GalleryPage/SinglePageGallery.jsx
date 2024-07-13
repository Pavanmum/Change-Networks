
import FormExample from './navbar';
import BasicExample from '../../components/ImageCard/cardImageComponent';
import LoadingSpinner from '../../components/Loader/LoadingSpinner';
import FilterGallery from './FilterGallery';
import { useDispatch, useSelector } from 'react-redux';
import { imageIsLoading } from '../../store/slices/imageSlice';
import { useEffect } from 'react';
import { fetchImagesAsync } from '../../store/slices/imageSlice';
import { useParams } from 'react-router-dom';
import { Empty } from 'antd';


const SinglePageGallery = () => {
    let {query} = useParams();
    // const query = paramater.charAt(0).toUpperCase() + paramater.slice(1);
    // console.log(query,"querys");
   

    let searchCategorys = '';
    let capitalizedQuery = '';

    if ( query === "firewalls"|| query === "routers"|| query === "switches"|| query === "wireless"|| query === "ipphones"|| query === "switches"|| query === "mix" ) {
      searchCategorys = query.charAt(0).toUpperCase() + query.slice(1);
  }
   else {
      capitalizedQuery = query
    }

    console.log(capitalizedQuery,"capitalizedQuery");
    console.log(searchCategorys,"searchCategorys");
  const dispatch = useDispatch();
  const image = useSelector((state) => state.imageSlice.images);
  console.log(image, "image")
  // const searchTerm = useSelector((state) => state.imageSlice);
  

  const isLoading = useSelector(imageIsLoading);
  useEffect(() => {
  dispatch(fetchImagesAsync({searchTerm : capitalizedQuery, searchCategory: searchCategorys}));
  }, [dispatch,capitalizedQuery,searchCategorys]);
  return (
    <>
    <FormExample />
    <FilterGallery />
    <div className='main' style={{  flex: 1, margin: "1rem", padding: "1rem" }}>
    {/* Left-aligned section */}
    <div style={{ flex: 1 }}>
        {isLoading ? (
          <div  style={{display:
            "flex", alignItems: "center", flexDirection:"column", justifyContent: "center", margin: "18rem", padding: "1rem"
          }}>
          <LoadingSpinner />
          </div>
        ) : image.length === 0 ? (
      
          <Empty  style={{display:
            "flex", alignItems: "center", flexDirection:"column", justifyContent: "center", margin: "14rem", padding: "1rem"
          }}
          description={
            <span>
              No image found
            </span>
          }/>

        ) : null}
        </div>

    {/* Center-aligned section */}
    <div style={{ flex: 2, display: "flex", justifyContent: "left" }}>
        {!isLoading && image.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
                {image.map((item, index) => (
                    <BasicExample key={index} id={item.gallery_id} imageUrl={"https://change-networks.com/" + item.img} title={item.product_code} />
                ))}
            </div>
        )}
    </div>
</div>

</>
  )
}

export default SinglePageGallery