import  { useState } from 'react';
import './index.css';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Modal } from 'antd';


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
const PhotoComponent = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ]);
    const [uploadVisible, setUploadVisible] = useState(false);
  
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    };
  
    const handleChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
      setUploadVisible(false);
    };
  
    const handleRemove = () => {
      setFileList([]);
      setUploadVisible(true);
    };

    const uploadButton = (
        <button
          style={{
            border: 0,
            background: 'none',
          }}
          type="button"
          onClick={() => setUploadVisible(true)}
        >
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </button>
      );
  return (
    <>
    <Upload
      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
      listType="picture-circle"
      fileList={fileList}
      onPreview={handlePreview}
      onChange={handleChange}
      onRemove={handleRemove}
      showUploadList={{
        showPreviewIcon: true,
        showRemoveIcon: true,
      }}
    >
      {fileList.length >= 1 ? null : uploadButton}
    </Upload>
    {previewImage && (
      <Image
        wrapperStyle={{
          display: 'none',
        }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage(''),
        }}
        src={previewImage}
      />
    )}
    {uploadVisible && (
      <Modal
        visible={uploadVisible}
        footer={null}
        onCancel={() => setUploadVisible(false)}
      >
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          showUploadList={false}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </Modal>
    )}
  </>
  )
}

export default PhotoComponent