import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Sparkles } from 'lucide-react';
import UserProfileDropdown from './UserProfileDropdown';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header with glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-white/30 shadow-lg">
        <div className="container mx-auto px-6 flex items-center justify-between py-5">
          {/* Modern Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-glow">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">TamSu Health</h1>
              <p className="text-sm text-gray-500 font-medium">Chăm sóc sức khỏe tâm lý</p>
            </div>
          </Link>          {/* Modern Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {/* Navigation links commented out for now */}
            {/* 
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-all duration-300 relative group px-3 py-2"
            >
              Trang chủ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link 
              to="/packages" 
              className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-all duration-300 relative group px-3 py-2"
            >
              Gói dịch vụ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            */}
            
            {/* Hotline Card - Separated */}
            {/* 
            <div className="ml-6 flex items-center space-x-3 px-5 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-xs text-green-600 font-medium">Hotline 24/7</span>
                <div className="text-sm font-bold text-green-800">1900-TAMSU</div>
              </div>
            </div>
            */}
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
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 hover:from-pink-600 hover:via-purple-600 hover:to-blue-700 text-white font-semibold text-base rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
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
      <footer className="relative mt-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10"></div>
        <div className="relative container py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-glow">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold gradient-text">TamSu Health</h3>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Nền tảng tư vấn sức khỏe tâm lý và tình dục trực tuyến uy tín, bảo mật và chuyên nghiệp. 
                Chúng tôi cam kết mang đến dịch vụ chất lượng cao với sự riêng tư tuyệt đối.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Liên hệ
              </h4>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <span>Hotline: 1900-xxxx</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    📧
                  </div>
                  <span>support@tamsu.health</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    🕐
                  </div>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Cam kết
              </h4>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Bảo mật thông tin tuyệt đối</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Đội ngũ chuyên gia giàu kinh nghiệm</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Tư vấn chuyên nghiệp 24/7</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Không lưu trữ dữ liệu cá nhân</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              &copy; 2024 TamSu Health. Tất cả quyền được bảo lưu.
              <span className="mx-2">•</span>
              Thiết kế với ❤️ tại Việt Nam
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}; export default Layout;