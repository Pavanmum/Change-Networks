import { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccessMessage, resetEmailAndOtp, sendOtpAsync, setEmail, setEmailError, setModalOpen, setOtpVerification, setShowPassword, verifyOtpAsync } from '../../store/slices/careerSlice';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const FormComponent = () => {
  const { showPassword,status,error } = useSelector((state) => state.careerSlice);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
// ! email, otped
  // ! const selectError = useSelector((state) => state.careerSlice.error);
  // ! const selectEmailError = useSelector((state) => state.careerSlice.EmailError);
  // ! const selectOnSuccess = useSelector((state) => state.careerSlice.sentEmail);
  // ! const selectIsLoading = useSelector((state) => state.careerSlice.isLoadingOtp);
  // ! const otpResponse = useSelector((state) => state.careerSlice.otpResponse);

  console.log(status)
  const onFinish = async (values) => {
    if (showPassword) {
    
        // dispatch(setOtpVerification(values.password));
        dispatch(verifyOtpAsync(values.password));

    } else {
        await dispatch(setEmail(values.user.email));
        await dispatch(sendOtpAsync(values.user.email));
        await dispatch(setShowPassword(true));
    }

  };

  const onFinishFailed = (errorInfo) => {
    const err = errorInfo.errorFields.map((item) => item.errors);
    toast.error(err[0][0] || 'Failed to verify OTP');
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };


  useEffect(() => {
    if (error) {
      toast.error(error.error || 'An error occurred');
    }

    if (status == 'success') {
      navigate('/profile');
      form.resetFields();
      dispatch(resetEmailAndOtp());
      dispatch(setEmailError(null));

    }
  }, [error , status]);

  return (
    <>
    <Form
      form={form}
      name="nest-messages"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
      >
      <Form.Item
        label="Email"
        name={['user', 'email']}
        rules={[
          {
            type: 'email',
            required: !showPassword,
          },
        ]}
        >
        <Input disabled={showPassword} />
      </Form.Item>

      {showPassword && (
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          >
          <Input.Password />
        </Form.Item>
      )}

      {showPassword && (
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      )}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
        >
        <Button type="primary" htmlType="submit">
          {showPassword ? 'Submit' : 'Next'}
        </Button>
      </Form.Item>
    </Form>
        </>
  );
};

export default FormComponent;
