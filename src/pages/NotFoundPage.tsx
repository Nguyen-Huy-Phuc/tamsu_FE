import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Heart } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-60 h-60 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-32 h-32 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-20 blur-xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card text-center backdrop-blur-sm bg-white/70 border border-white/20">
          {/* 404 Number with gradient */}
          <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">
            404
          </div>
          
          {/* Icon with glassmorphism effect */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100/50 to-purple-100/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Search className="w-12 h-12 text-blue-600 animate-bounce" />
          </div>
          
          {/* Title with gradient */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Không tìm thấy trang
          </h1>
          
          {/* Description */}
          <p className="text-gray-600/80 mb-8 text-lg leading-relaxed">
            Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
          </p>
          
          {/* Action buttons with modern styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 btn-primary group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Về trang chủ</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 rounded-xl hover:bg-white/90 hover:border-gray-300/50 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Quay lại</span>
            </button>
          </div>
          
          {/* Support info with modern styling */}
          <div className="pt-6 border-t border-gray-200/30">
            <p className="text-sm text-gray-500/80 flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-pink-500" />
              Nếu bạn tin rằng đây là lỗi, vui lòng liên hệ với chúng tôi qua{' '}
              <a 
                href="mailto:support@tamsu.health" 
                className="text-blue-600 hover:text-blue-500 font-medium underline decoration-2 underline-offset-2 hover:decoration-blue-400 transition-colors duration-300"
              >
                support@tamsu.health
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;