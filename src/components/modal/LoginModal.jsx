import { Form, Modal } from 'antd';
import FormComponent from '../FormComponent/FormComponent';

const LoginModal = ({isModalOpens,handleCancel}) => {
    console.log(isModalOpens)
  return (
    <Modal title="Basic Modal" open={isModalOpens} onCancel={handleCancel} footer={null}>
        <div style={{display:"flex",justifyContent:"center",    margin: "3rem 0 0 0"  }}>
        <FormComponent/>
        </div>
      </Modal>
  )
}

export default LoginModal