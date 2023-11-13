import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/PageNotFound";
import Register from "./pages/Auth/Reigster";
import Login from "./pages/Auth/Login";
import { AuthProvider } from "./context/auth";
import Dashboard from "./pages/Dashboard/User/Dashboard";
// import PrivateRoute from "./components/Routes/Private";
import PrivateRoutes from './Utils/privateRoute'
import ForgotPassword from "./pages/Auth/ForgotPassword";
// import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/Admindashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Policy from "./pages/Admin/Policy";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/Admindashboard" element={<AdminDashboard />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
          </Route>
            <Route path="*" element={<Pagenotfound />} />
            <Route path="/forgot-ßpassword" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
