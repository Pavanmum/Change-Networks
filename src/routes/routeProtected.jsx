
import PropTypes from 'prop-types';
import Protected from '../helper/protectedRoute';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = Cookies.get('accessToken');
  console.log(token)

  return (
    <Protected token={token} {...rest}>
      <Element />
    </Protected>
  );
};


export default ProtectedRoute;
