import React from 'react';
import { Link } from 'react-router-dom';
import { mockPackages } from '../lib/mockData';
import {
  Users, Shield, Heart, CheckCircle, ArrowRight, Phone, Star, Sparkles, Award
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* HERO SECTION - Modern Flexbox Layout */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500">
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/3 right-16 w-24 h-24 bg-rose-200/30 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/5 w-20 h-20 bg-pink-200/25 rounded-full blur-lg animate-pulse delay-700"></div>
          <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-rose-300/20 rounded-full blur-xl animate-bounce delay-1000"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-2xl border border-white/30">
                <Heart className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-rose-300 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 leading-tight tracking-tight">
            <span className="block text-white">
              Tư Vấn Sức Khỏe
            </span>
            <span className="block text-rose-200 animate-pulse">
              Tâm Lý Tình Dục
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-rose-100 mb-10 md:mb-12 max-w-5xl mx-auto leading-relaxed font-light px-4">
            Đội ngũ <span className="font-bold text-rose-200">chuyên gia hàng đầu</span> với
            <span className="font-bold text-pink-200"> 10+ năm kinh nghiệm</span> sẵn sàng
            tư vấn <span className="font-bold text-rose-300">riêng tư 1-1</span>
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 text-white/90 max-w-4xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center group cursor-pointer">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-rose-300 rounded-full mr-0 sm:mr-3 mb-2 sm:mb-0 animate-pulse group-hover:scale-125 transition-transform"></div>
              <span className="font-semibold text-sm md:text-base lg:text-lg text-center sm:text-left">Trực tuyến 24/7</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center group cursor-pointer">
              <Shield className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-0 sm:mr-3 mb-2 sm:mb-0 text-rose-200 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm md:text-base lg:text-lg text-center sm:text-left">Bảo mật 100%</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center group cursor-pointer">
              <Users className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-0 sm:mr-3 mb-2 sm:mb-0 text-pink-200 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm md:text-base lg:text-lg text-center sm:text-left">1000+ khách hàng</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center group cursor-pointer">
              <Award className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-0 sm:mr-3 mb-2 sm:mb-0 text-rose-200 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm md:text-base lg:text-lg text-center sm:text-left">Chứng chỉ quốc tế</span>
            </div>
          </div>
        </div>
      </section>



      {/* FEATURES SECTION - Flexible Card Layout */}
      <section className="py-16 md:py-20 lg:py-24 xl:py-32 bg-rose-50 flex justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20 lg:mb-24 xl:mb-28">
            <div className="inline-flex items-center bg-rose-100 text-rose-700 px-4 md:px-6 py-2 md:py-3 rounded-full text-sm font-bold mb-4 md:mb-6">
              <Star className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Tại sao chọn TamSu Health?
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 text-center">
              <span className="block">Trải Nghiệm</span>
              <span className="block text-pink-400">Đỉnh Cao</span>
            </h2>
            <div className="flex justify-center">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl leading-relaxed text-center px-4">
                Chúng tôi cam kết mang đến dịch vụ tư vấn chất lượng cao nhất với sự riêng tư tuyệt đối
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 place-items-center">
                {[
                  {
                    icon: Shield,
                    title: "Bảo Mật Tuyệt Đối",
                    desc: "Hệ thống mã hóa end-to-end, không lưu trữ thông tin cá nhân. Bạn hoàn toàn ẩn danh và được bảo vệ.",
                    gradient: "from-rose-400 to-pink-400",
                    bg: "from-rose-50 to-pink-50"
                  },
                  {
                    icon: Users,
                    title: "Chuyên Gia Hàng Đầu",
                    desc: "Đội ngũ bác sĩ tâm lý, chuyên gia tình dục học với 10+ năm kinh nghiệm thực tế tại Việt Nam.",
                    gradient: "from-pink-400 to-rose-400",
                    bg: "from-pink-50 to-rose-50"
                  },
                  {
                    icon: Heart,
                    title: "Tư Vấn Tận Tâm",
                    desc: "Phương pháp tư vấn cá nhân hóa, lắng nghe chân thành và đồng hành trong hành trình chữa lành.",
                    gradient: "from-rose-500 to-pink-500",
                    bg: "from-rose-50 to-pink-50"
                  }
                ].map((feature, index) => (
                  <div key={index} className="group w-full max-w-sm">
                    <div className={`bg-gradient-to-br ${feature.bg} p-6 md:p-8 rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 backdrop-blur-sm text-center h-full flex flex-col justify-between w-full`}>
                      <div>
                        <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 mx-auto`}>
                          <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 text-center">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-center text-sm md:text-base">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer Divider */}
      <div className="h-12 md:h-16 lg:h-20 bg-gradient-to-b from-gray-50 to-white"></div>

      {/* PACKAGES SECTION - Premium Cards */}
      <section className="py-16 md:py-20 lg:py-24 xl:py-32 bg-white flex justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20 lg:mb-24 xl:mb-28">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 md:px-6 py-2 md:py-3 rounded-full text-sm font-bold mb-4 md:mb-6">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Gói dịch vụ premium
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 text-center">
              <span className="block">Chọn Gói</span>
              <span className="block text-pink-400 mt-2 ">Phù Hợp</span>
            </h2>
            <div className="flex justify-center">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl leading-relaxed text-center px-4">
                Các gói tư vấn được thiết kế riêng biệt cho từng nhu cầu cụ thể với giá cả minh bạch
              </p>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-7xl">
              <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 place-items-center justify-items-center">
                {mockPackages.map((pkg) => {
                  const isPremium = pkg.type === 'advanced';
                  return (
                    <div key={pkg.id} className="relative w-full max-w-lg group">
                      {/* Card */}
                      <div className={`bg-white rounded-3xl p-6 md:p-8 lg:p-10 border-2 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3 h-full flex flex-col ${isPremium
                        ? 'border-purple-200 shadow-purple-100/60 shadow-xl'
                        : 'border-blue-200 shadow-lg hover:shadow-blue-100/60'
                        }`}>

                        {/* Package Header */}
                        <div className="text-center mb-6 md:mb-8">
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-3 md:mb-4">{pkg.name}</h3>
                          <span className={`inline-block px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold ${isPremium
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                            : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700'
                            }`}>
                            {isPremium ? '💎 Gói Premium' : '🎯 Gói Cơ Bản'}
                          </span>
                        </div>

                        {/* Pricing */}
                        <div className={`text-center mb-6 md:mb-8 p-6 md:p-8 rounded-2xl ${isPremium
                          ? 'bg-gradient-to-br from-purple-50 to-pink-50'
                          : 'bg-gradient-to-br from-blue-50 to-cyan-50'
                          }`}>
                          <div className={`text-4xl md:text-5xl lg:text-6xl font-black mb-2 ${isPremium ? 'text-purple-700' : 'text-blue-700'
                            }`}>
                            {pkg.price.toLocaleString('vi-VN')}đ
                          </div>
                          <div className="text-gray-500 font-medium mb-3 md:mb-4 text-sm md:text-base">Thanh toán một lần</div>
                          <div className={`inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full text-white font-bold text-base md:text-lg shadow-lg ${isPremium
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                            }`}>
                            ⏱️ {pkg.duration} phút tư vấn chuyên sâu
                          </div>
                        </div>

                        <p className="text-gray-600 text-center mb-6 md:mb-8 text-base md:text-lg leading-relaxed">{pkg.description}</p>

                        {/* Features */}
                        <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow">
                          {pkg.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                              <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0 ${isPremium ? 'bg-purple-100' : 'bg-blue-100'
                                }`}>
                                <CheckCircle className={`w-3 h-3 md:w-4 md:h-4 ${isPremium ? 'text-purple-600' : 'text-blue-600'
                                  }`} />
                              </div>
                              <span className="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 md:gap-4 mt-auto">
                          <Link
                            to={`/package/${pkg.id}`}
                            className="flex-1 text-center py-3 md:py-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 font-semibold text-base md:text-lg"
                          >
                            Chi tiết
                          </Link>
                          <Link
                            to={`/package/${pkg.id}/purchase`}
                            className={`flex-1 text-center py-3 md:py-4 rounded-xl text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base md:text-lg ${isPremium
                              ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600'
                              : 'bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500'
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
      <div className="h-16 md:h-20 lg:h-24 bg-gradient-to-b from-white to-rose-300"></div>

      {/* CTA SECTION - Final Call to Action */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-300 via-pink-300 to-rose-400">
          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-200/20 to-pink-200/20 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-rose-300/15 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-rose-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-800 py-16 md:py-20">
          {/* Badge */}
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center bg-white/30 backdrop-blur-lg px-4 md:px-6 py-3 md:py-4 rounded-full text-gray-700 text-sm font-bold border border-white/40">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
              Sẵn sàng thay đổi cuộc sống của bạn?
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 leading-tight">
            <span className="block text-white">Đừng Để Ngày Mai</span>
            <span className="block text-rose-200">
              Trở Thành Hôm Qua
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 mb-12 md:mb-16 max-w-5xl mx-auto leading-relaxed px-4">
            Hành trình <span className="font-bold text-rose-600">chữa lành</span> và
            <span className="font-bold text-pink-600"> khám phá bản thân</span> bắt đầu từ
            quyết định <span className="font-bold text-rose-700">hôm nay</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-16 md:mb-20 max-w-4xl mx-auto px-4">
            <Link
              to="/packages"
              className="group flex items-center justify-center px-8 md:px-12 lg:px-16 py-4 md:py-5 lg:py-6 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 text-white rounded-2xl font-black text-lg md:text-xl lg:text-2xl shadow-2xl hover:shadow-rose-400/50 hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-3 md:mr-4 animate-pulse" />
              Bắt Đầu Hành Trình Ngay!
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ml-3 md:ml-4 group-hover:translate-x-3 transition-transform" />
            </Link>

            <button className="group flex items-center justify-center px-8 md:px-12 lg:px-16 py-4 md:py-5 lg:py-6 bg-white/30 backdrop-blur-lg border-2 border-white/50 text-gray-800 rounded-2xl font-bold text-lg md:text-xl lg:text-2xl hover:bg-white/40 hover:border-white/60 transition-all duration-300">
              <Phone className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-3 md:mr-4 group-hover:animate-pulse" />
              Hotline: 1900-TAMSU
            </button>
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
            {[
              { value: "1000+", label: "Khách hàng hài lòng", color: "text-rose-700" },
              { value: "24/7", label: "Hỗ trợ không ngừng", color: "text-pink-700" },
              { value: "10+", label: "Năm kinh nghiệm", color: "text-rose-800" },
              { value: "100%", label: "Bảo mật thông tin", color: "text-pink-800" }
            ].map((stat, index) => (
              <div key={index} className="group flex flex-col items-center">
                <div className={`text-3xl sm:text-4xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-700 text-sm md:text-base lg:text-lg text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
