import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth'; // Update with your actual path

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth(); // Assuming useAuth provides the authentication state

console.log(isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
