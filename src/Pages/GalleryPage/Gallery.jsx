import  { useEffect } from 'react';
import BasicExample from '../../components/ImageCard/cardImageComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImagesAsync, imageIsLoading } from '../../store/slices/imageSlice';
import LoadingSpinner from '../../components/Loader/LoadingSpinner';
import FormExample from './navbar';
import FilterGallery from './FilterGallery';
import DialogBox from '../../components/dialogBox/DialogBox';
import {  Empty } from 'antd';

const Gallery = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.imageSlice.images);
  const isLoading = useSelector(imageIsLoading);

  useEffect(() => {
    dispatch(fetchImagesAsync(
      {searchTerm: "", searchCategory: ""}
    ));
  }, [dispatch]);

  return (
    <>
      <FormExample />
      <FilterGallery />
      <DialogBox />
      <div className='main' style={{  flex: 1, margin: "1rem", padding: "1rem" }}>
    {/* Left-aligned section */}
    <div style={{ flex: 1 }}>
        {isLoading ? (
          <div  style={{display:
            "flex", alignItems: "center", flexDirection:"column", justifyContent: "center", margin: "18rem", padding: "1rem"
          }}>
          <LoadingSpinner />
          </div>
        ) : images.length === 0 ? (
      
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
        {!isLoading && images.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
                {images.map((item, index) => (
                        <BasicExample key={index} id={item.gallery_id} imageUrl={"https://change-networks.com/" + item.img} title={item.product_code} />
                ))}
            </div>
        )}
    </div>
</div>
    </>
  )
}

export default Gallery;
