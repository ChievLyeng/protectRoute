import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const PrivateRoutes = () => {
  const { auth } = useAuth(); // Destructuring auth from the result of useAuth
  const isAuthenticated = auth && auth.user; // Assuming user property indicates authentication

  console.log("isAuthenticated :", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
