import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import PackageDetailPage from './pages/PackageDetailPage';
import PurchasePage from './pages/PurchasePage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Routes with layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="packages" element={<HomePage />} />
            <Route path="package/:packageId" element={<PackageDetailPage />} />
            
            {/* Protected routes */}
            <Route 
              path="package/:packageId/purchase" 
              element={
                <ProtectedRoute>
                  <PurchasePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="purchase/success/:packageId" 
              element={
                <ProtectedRoute>
                  <PurchaseSuccessPage />
                </ProtectedRoute>
              } 
            />
          </Route>
          
          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
