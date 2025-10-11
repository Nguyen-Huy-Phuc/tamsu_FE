import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import PackageDetailPage from './pages/PackageDetailPage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import PaymentFailPage from './pages/PaymentFailPage';
import ProfilePage from './pages/ProfilePage';
import PurchaseHistoryPage from './pages/PurchaseHistoryPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CreateBlogPage from './pages/CreateBlogPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';
import Login from './pages/Login';

function App() {
  return (
    <div className="hide-scrollbar">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes - only login and register */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* All other routes require authentication */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="packages" element={<HomePage />} />
              <Route path="package/:packageId" element={<PackageDetailPage />} />

              {/* Blog routes */}
              <Route path="blog" element={<BlogListPage />} />
              <Route path="blog/:id" element={<BlogDetailPage />} />
              <Route path="blog/create" element={<CreateBlogPage />} />

              {/* User routes */}
              <Route path="profile" element={<ProfilePage />} />
              <Route path="purchase-history" element={<PurchaseHistoryPage />} />
              <Route path="purchase/success/:packageId" element={<PurchaseSuccessPage />} />
              <Route path="payment/fail" element={<PaymentFailPage />} />
              <Route path="payment/cancel" element={<PaymentFailPage />} />
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
