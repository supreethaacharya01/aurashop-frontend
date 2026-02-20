import { BrowserRouter,Routes, Route ,Navigate } from 'react-router-dom';
import './App.css';
import UserRoutes from './Module/User/UserRoutes/UserRoutes';
import AdminRouter from './Module/Admin/AdminRoutes/AdminRouter';
import AdminLogin from './Module/Admin/AdminComponents/AdminLogin';

function ProtectedAdmin({ children }) {
  const userToken = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");
  
  // Only allow if token exists AND role is 'admin'
  if (!userToken || userRole !== 'admin') {
    return <Navigate to="/AdminLogin" replace />;
  }
  
  return children;
}

function App() {
  return (
     <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route 
            path="/Admin/*" 
            element={
              <ProtectedAdmin>
                <AdminRouter />
              </ProtectedAdmin>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
