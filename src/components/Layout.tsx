import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Sparkles } from 'lucide-react';
import UserProfileDropdown from './UserProfileDropdown';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Modern Header with glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-white/30 shadow-lg">
        <div className="container mx-auto px-6 flex items-center justify-between py-5">
          {/* Modern Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-glow">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-300 to-pink-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">TamSu Health</h1>
              <p className="text-sm text-gray-500 font-medium">Chăm sóc sức khỏe tâm lý</p>
            </div>
          </Link>          {/* Modern Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <Link
              to="/"
              className="text-gray-700 hover:text-rose-600 font-semibold text-lg transition-all duration-300 relative group px-3 py-2"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-rose-600 font-semibold text-lg transition-all duration-300 relative group px-3 py-2"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </nav>          {/* Modern User Actions */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <UserProfileDropdown />
            ) : (
              <div className="flex items-center" style={{ gap: '10px' }}>
                {/* Sign in to console Button - Simple Style */}
                <Link
                  to="/login"
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold text-base transition-colors duration-200 rounded-lg hover:bg-gray-50"
                >
                  Sign in
                </Link>

                {/* Create account Button - Brand Color Style */}
                <Link
                  to="/register"
                  className="px-8 py-3 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 hover:from-rose-500 hover:via-pink-500 hover:to-rose-600 text-white font-semibold text-base rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>          {/* Mobile menu button */}
          <button className="lg:hidden p-3 rounded-2xl hover:bg-white/30 transition-colors shadow-md backdrop-blur-sm">
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1.5">
              <span className="w-6 h-0.5 bg-gray-700 rounded-full transform transition-all"></span>
              <span className="w-6 h-0.5 bg-gray-700 rounded-full transform transition-all"></span>
              <span className="w-6 h-0.5 bg-gray-700 rounded-full transform transition-all"></span>
            </div>
          </button>
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
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-glow">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold gradient-text">TamSu Health</h3>
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