import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import PackageDetailPage from './pages/PackageDetailPage';
import PurchasePage from './pages/PurchasePage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
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
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Routes with layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="packages" element={<HomePage />} />
            <Route path="package/:packageId" element={<PackageDetailPage />} />

            {/* Blog routes */}
            <Route path="blog" element={<BlogListPage />} />
            <Route path="blog/:id" element={<BlogDetailPage />} />

            {/* Protected routes */}
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="purchase-history"
              element={
                <ProtectedRoute>
                  <PurchaseHistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="blog/create"
              element={
                <ProtectedRoute>
                  <CreateBlogPage />
                </ProtectedRoute>
              }
            />
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
