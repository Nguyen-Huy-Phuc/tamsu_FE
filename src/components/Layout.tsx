import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserProfileDropdown from './UserProfileDropdown';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100">
      {/* Clean Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo_tamsu.png"
              alt="TamSu Logo"
              className="w-20 h-20 object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-pink-400 font-medium text-base transition-colors duration-200 px-3 py-2 rounded-full hover:bg-pink-50"
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="text-gray-600 hover:text-pink-400 font-medium text-base transition-colors duration-200 px-3 py-2 rounded-full hover:bg-pink-50"
            >
              Blog
            </Link>
            <Link
              to="/consultation"
              className="text-gray-600 hover:text-pink-400 font-medium text-base transition-colors duration-200 px-3 py-2 rounded-full hover:bg-pink-50"
            >
              Tư vấn
            </Link>
            <Link
              to="/products"
              className="text-gray-600 hover:text-pink-400 font-medium text-base transition-colors duration-200 px-3 py-2 rounded-full hover:bg-pink-50"
            >
              Sản Phẩm
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Social Icons */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>

            {/* User Actions */}
            {isAuthenticated ? (
              <UserProfileDropdown />
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white font-medium text-sm rounded-full transition-colors duration-200"
              >
                Đăng nhập
              </Link>
            )}

            {/* Mobile menu button */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className="w-5 h-0.5 bg-gray-600 rounded-full"></span>
                <span className="w-5 h-0.5 bg-gray-600 rounded-full"></span>
                <span className="w-5 h-0.5 bg-gray-600 rounded-full"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="animate-fadeIn">
        <Outlet />
      </main>      {/* Modern Footer */}
      <footer className="relative pt-10 bg-white text-gray-800">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <img
                  src="/logo_tamsu.png"
                  alt="TamSu Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nền tảng tư vấn sức khỏe tâm lý và tình dục trực tuyến uy tín, bảo mật và chuyên nghiệp.
                Chúng tôi cam kết mang đến dịch vụ chất lượng cao với sự riêng tư tuyệt đối.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                Liên hệ
              </h4>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <span>Hotline: 1900-xxxx</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    📧
                  </div>
                  <span>support@tamsu.health</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                    🕐
                  </div>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Cam kết
              </h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  <span>Bảo mật thông tin tuyệt đối</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Đội ngũ chuyên gia giàu kinh nghiệm</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
                  <span>Tư vấn chuyên nghiệp 24/7</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                  <span>Không lưu trữ dữ liệu cá nhân</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-500">
              &copy; 2025 TamSu Health. Tất cả quyền được bảo lưu.
              <span className="mx-2">•</span>
              Thiết kế với ❤️ tại Việt Nam
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}; export default Layout;