import React from 'react';
import { Link } from 'react-router-dom';
import { mockPackages } from '../lib/mockData';
import {
  Users, Shield, Heart, CheckCircle, ArrowRight, Phone, Star, Sparkles, Award,
  Clock, MessageCircle, CheckCircle2, Target
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* HERO SECTION - Modern Flexbox Layout */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/3 right-16 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/5 w-20 h-20 bg-pink-300/15 rounded-full blur-lg animate-pulse delay-700"></div>
          <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-blue-300/15 rounded-full blur-xl animate-bounce delay-1000"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-2xl border border-white/30">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
            <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Tư Vấn Sức Khỏe
            </span>
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-pulse">
              Tâm Lý Tình Dục
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 mb-12 max-w-5xl mx-auto leading-relaxed font-light">
            Đội ngũ <span className="font-bold text-yellow-300">chuyên gia hàng đầu</span> với 
            <span className="font-bold text-pink-300"> 10+ năm kinh nghiệm</span> sẵn sàng 
            tư vấn <span className="font-bold text-green-300">riêng tư 1-1</span>
          </p>
          
          {/* CTA Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 max-w-3xl mx-auto">
            <Link 
              to="/packages" 
              className="group flex items-center justify-center px-12 py-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black rounded-2xl font-black text-xl shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-6 h-6 mr-4 animate-spin" />
              Khám Phá Gói Dịch Vụ
              <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <button className="group flex items-center justify-center px-12 py-5 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-2xl font-bold text-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300">
              <Phone className="w-6 h-6 mr-4 group-hover:animate-pulse" />
              Tư Vấn Miễn Phí Ngay
            </button>
          </div> */}
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-white/90">
            <div className="flex items-center group cursor-pointer">
              <div className="w-4 h-4 bg-green-400 rounded-full mr-3 animate-pulse group-hover:scale-125 transition-transform"></div>
              <span className="font-semibold text-lg">Trực tuyến 24/7</span>
            </div>
            <div className="flex items-center group cursor-pointer">
              <Shield className="w-7 h-7 mr-3 text-blue-300 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">Bảo mật 100%</span>
            </div>
            <div className="flex items-center group cursor-pointer">
              <Users className="w-7 h-7 mr-3 text-pink-300 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">1000+ khách hàng</span>
            </div>
            <div className="flex items-center group cursor-pointer">
              <Award className="w-7 h-7 mr-3 text-yellow-300 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">Chứng chỉ quốc tế</span>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer Divider */}
      <div className="h-16 md:h-20 lg:h-24 bg-white"></div>

      {/* FEATURES SECTION - Flexible Card Layout */}
      <section className="py-20 md:py-24 lg:py-32 bg-gray-50 flex justify-center">
        <div className="w-full max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20 md:mb-24 lg:mb-28">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Star className="w-5 h-5 mr-2" />
              Tại sao chọn TamSu Health?
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 text-center">
              <span className="block">Trải Nghiệm</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Đỉnh Cao</span>
            </h2>
            <div className="flex justify-center">
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl leading-relaxed text-center">
                Chúng tôi cam kết mang đến dịch vụ tư vấn chất lượng cao nhất với sự riêng tư tuyệt đối
              </p>
            </div>

          </div>
          
          {/* Features Grid */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 place-items-center">
                {[
                  {
                    icon: Shield,
                    title: "Bảo Mật Tuyệt Đối",
                    desc: "Hệ thống mã hóa end-to-end, không lưu trữ thông tin cá nhân. Bạn hoàn toàn ẩn danh và được bảo vệ.",
                    gradient: "from-blue-500 to-cyan-500",
                    bg: "from-blue-50 to-cyan-50"
                  },
                  {
                    icon: Users,
                    title: "Chuyên Gia Hàng Đầu",
                    desc: "Đội ngũ bác sĩ tâm lý, chuyên gia tình dục học với 10+ năm kinh nghiệm thực tế tại Việt Nam.",
                    gradient: "from-purple-500 to-pink-500",
                    bg: "from-purple-50 to-pink-50"
                  },
                  {
                    icon: Heart,
                    title: "Tư Vấn Tận Tâm",
                    desc: "Phương pháp tư vấn cá nhân hóa, lắng nghe chân thành và đồng hành trong hành trình chữa lành.",
                    gradient: "from-pink-500 to-rose-500",
                    bg: "from-pink-50 to-rose-50"
                  }
                ].map((feature, index) => (
                  <div key={index} className="group w-full max-w-sm">
                    <div className={`bg-gradient-to-br ${feature.bg} p-8 rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 backdrop-blur-sm text-center h-full flex flex-col justify-between w-full`}>
                      <div>
                        <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 mx-auto`}>
                          <feature.icon className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4 text-center">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-center">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer Divider */}
      <div className="h-16 md:h-20 lg:h-24 bg-gradient-to-b from-gray-50 to-white"></div>

      {/* PACKAGES SECTION - Premium Cards */}
      <section className="py-20 md:py-24 lg:py-32 bg-white flex justify-center">
        <div className="w-full max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20 md:mb-24 lg:mb-28">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-5 h-5 mr-2" />
              Gói dịch vụ premium
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 text-center">
              <span className="block">Chọn Gói</span>
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Phù Hợp</span>
            </h2>
            <div className="flex justify-center">
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl leading-relaxed text-center">
                Các gói tư vấn được thiết kế riêng biệt cho từng nhu cầu cụ thể với giá cả minh bạch
              </p>
            </div>
          </div>
          
          {/* Packages Grid */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-6xl">
              <div className="grid md:grid-cols-2 gap-10 lg:gap-12 place-items-center justify-items-center">
                {mockPackages.map((pkg) => {
                  const isPremium = pkg.type === 'advanced';
                  return (
                    <div key={pkg.id} className="relative w-full max-w-lg group">
                      {/* Popular Badge */}
                      {/* {isPremium && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                            ⭐ Phổ biến nhất
                          </div>
                        </div>
                      )} */}
                      
                      {/* Card */}
                      <div className={`bg-white rounded-3xl p-10 border-2 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3 h-full flex flex-col ${
                        isPremium 
                          ? 'border-purple-200 shadow-purple-100/60 shadow-xl' 
                          : 'border-blue-200 shadow-lg hover:shadow-blue-100/60'
                      }`}>
                        
                        {/* Package Header */}
                        <div className="text-center mb-8">
                          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{pkg.name}</h3>
                          <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                            isPremium 
                              ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' 
                              : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700'
                          }`}>
                            {isPremium ? '💎 Gói Premium' : '🎯 Gói Cơ Bản'}
                          </span>
                        </div>
                        
                        {/* Pricing */}
                        <div className={`text-center mb-8 p-8 rounded-2xl ${
                          isPremium 
                            ? 'bg-gradient-to-br from-purple-50 to-pink-50' 
                            : 'bg-gradient-to-br from-blue-50 to-cyan-50'
                        }`}>
                          <div className={`text-5xl md:text-6xl font-black mb-2 ${
                            isPremium ? 'text-purple-700' : 'text-blue-700'
                          }`}>
                            {pkg.price.toLocaleString('vi-VN')}đ
                          </div>
                          <div className="text-gray-500 font-medium mb-4">Thanh toán một lần</div>
                          <div className={`inline-flex items-center px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg ${
                            isPremium 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                          }`}>
                            ⏱️ {pkg.duration} phút tư vấn chuyên sâu
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-center mb-8 text-lg leading-relaxed">{pkg.description}</p>
                        
                        {/* Features */}
                        <div className="space-y-4 mb-10 flex-grow">
                          {pkg.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
                                isPremium ? 'bg-purple-100' : 'bg-blue-100'
                              }`}>
                                <CheckCircle className={`w-4 h-4 ${
                                  isPremium ? 'text-purple-600' : 'text-blue-600'
                                }`} />
                              </div>
                              <span className="text-gray-700 font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-auto">
                          <Link 
                            to={`/package/${pkg.id}`}
                            className="flex-1 text-center py-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 font-semibold text-lg"
                          >
                            Chi tiết
                          </Link>
                          <Link 
                            to={`/package/${pkg.id}/purchase`}
                            className={`flex-1 text-center py-4 rounded-xl text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-lg ${
                              isPremium
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                            }`}
                          >
                            🚀 Mua ngay
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer Divider */}
      <div className="h-20 md:h-24 lg:h-28 bg-gradient-to-b from-white to-indigo-900"></div>

      {/* CTA SECTION - Final Call to Action */}
      <section className="relative min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white py-20">
          {/* Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-lg px-6 py-4 rounded-full text-white/90 text-sm font-bold border border-white/20">
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              Sẵn sàng thay đổi cuộc sống của bạn?
            </div>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="block">Đừng Để Ngày Mai</span>
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Trở Thành Hôm Qua
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-3xl text-blue-100 mb-16 max-w-5xl mx-auto leading-relaxed">
            Hành trình <span className="font-bold text-yellow-300">chữa lành</span> và 
            <span className="font-bold text-pink-300"> khám phá bản thân</span> bắt đầu từ 
            quyết định <span className="font-bold text-green-300">hôm nay</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 max-w-4xl mx-auto">
            <Link 
              to="/packages" 
              className="group flex items-center justify-center px-16 py-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black rounded-2xl font-black text-2xl shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-7 h-7 mr-4 animate-pulse" />
              Bắt Đầu Hành Trình Ngay!
              <ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-3 transition-transform" />
            </Link>
            
            <button className="group flex items-center justify-center px-16 py-6 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-2xl font-bold text-2xl hover:bg-white/20 hover:border-white/50 transition-all duration-300">
              <Phone className="w-7 h-7 mr-4 group-hover:animate-pulse" />
              Hotline: 1900-TAMSU
            </button>
          </div>
          
          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "1000+", label: "Khách hàng hài lòng", color: "text-yellow-300" },
              { value: "24/7", label: "Hỗ trợ không ngừng", color: "text-green-300" },
              { value: "10+", label: "Năm kinh nghiệm", color: "text-pink-300" },
              { value: "100%", label: "Bảo mật thông tin", color: "text-blue-300" }
            ].map((stat, index) => (
              <div key={index} className="group flex flex-col items-center">
                <div className={`text-4xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-white/80 text-lg text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
