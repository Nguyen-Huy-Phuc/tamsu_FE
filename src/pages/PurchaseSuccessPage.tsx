import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockPackages, generateZaloLink } from '../lib/mockData';
import { CheckCircle, MessageCircle, Clock, Phone, Copy } from 'lucide-react';

const PurchaseSuccessPage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const { user } = useAuth();
  
  const packageData = mockPackages.find(pkg => pkg.id === packageId);
  const zaloLink = packageData && user ? generateZaloLink(packageId!, user.id) : '';

  useEffect(() => {
    // Track successful purchase (analytics)
    console.log('Purchase successful:', { packageId, userId: user?.id });
  }, [packageId, user?.id]);

  if (!packageData) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy thông tin đơn hàng</h1>
        <Link to="/" className="btn-primary">Quay về trang chủ</Link>
      </div>
    );
  }

  const copyZaloLink = () => {
    if (zaloLink) {
      navigator.clipboard.writeText(zaloLink);
      alert('Đã copy link Zalo!');
    }
  };

  const orderId = `TH${Date.now().toString().slice(-8)}`;

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
      <div className="container px-4 w-full">
        <div className="max-w mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Thanh Toán Thành Công!
            </h1>
            <p className="text-gray-600">
              Cảm ơn bạn đã tin tưởng dịch vụ của TamSu Health
            </p>
          </div>

          {/* Order Details */}
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Chi tiết đơn hàng
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-medium text-gray-900">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gói dịch vụ:</span>
                <span className="font-medium text-gray-900">{packageData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời lượng tư vấn:</span>
                <span className="font-medium text-gray-900">{packageData.duration} phút</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tổng tiền:</span>
                <span className="font-bold text-green-600 text-lg">
                  {packageData.price.toLocaleString('vi-VN')}đ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Khách hàng:</span>
                <span className="font-medium text-gray-900">{user?.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian:</span>
                <span className="font-medium text-gray-900">
                  {new Date().toLocaleString('vi-VN')}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-primary-600" />
              Bước tiếp theo
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Liên hệ qua Zalo</h3>
                  <p className="text-gray-600 text-sm">
                    Click vào nút bên dưới để chuyển đến Zalo và bắt đầu cuộc tư vấn
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cung cấp mã đơn hàng</h3>
                  <p className="text-gray-600 text-sm">
                    Chia sẻ mã đơn hàng <span className="font-medium">{orderId}</span> với tư vấn viên
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Bắt đầu tư vấn</h3>
                  <p className="text-gray-600 text-sm">
                    Chuyên gia sẽ tư vấn cho bạn trong {packageData.duration} phút
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Zalo Contact */}
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Liên hệ tư vấn viên
            </h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Tư vấn qua Zalo</span>
              </div>
              <p className="text-green-700 text-sm mb-3">
                Click vào nút bên dưới để mở Zalo và bắt đầu cuộc trò chuyện với chuyên gia của chúng tôi.
              </p>
              
              <div className="flex space-x-3">
                <a
                  href={zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-colors"
                >
                  Mở Zalo Ngay
                </a>
                <button
                  onClick={copyZaloLink}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Copy link Zalo"
                >
                  <Copy className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Hotline hỗ trợ</span>
              </div>
              <p className="text-blue-700 text-sm mb-2">
                Gọi ngay nếu cần hỗ trợ khẩn cấp hoặc có thắc mắc về đơn hàng:
              </p>
              <p className="font-bold text-blue-900">📞 1900-xxxx</p>
              <p className="text-blue-600 text-sm">Hoạt động 24/7</p>
            </div>
          </div>

          {/* Important Notes */}
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Lưu ý quan trọng
            </h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span className="text-gray-700">
                  Cuộc tư vấn có thời lượng {packageData.duration} phút và hoàn toàn bảo mật
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span className="text-gray-700">
                  Chúng tôi không lưu trữ nội dung cuộc trò chuyện của bạn
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span className="text-gray-700">
                  Vui lòng chuẩn bị câu hỏi trước để tận dụng tối đa thời gian tư vấn
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-orange-600 mt-0.5" />
                <span className="text-gray-700">
                  Vui lòng liên hệ trong vòng 24 giờ để tránh hết hạn đơn hàng
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              to="/"
              className="flex-1 text-center btn-secondary"
            >
              Về Trang Chủ
            </Link>
            <Link
              to={`/package/${packageId}`}
              className="flex-1 text-center border border-primary-600 text-primary-600 py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Xem Lại Gói Dịch Vụ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;