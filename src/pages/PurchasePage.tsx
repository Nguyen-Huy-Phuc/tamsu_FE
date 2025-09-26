import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockPackages } from '../lib/mockData';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clock, Shield, CheckCircle, CreditCard } from 'lucide-react';

const PurchasePage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('momo');

  const packageData = mockPackages.find(pkg => pkg.id === packageId);

  if (!packageData) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy gói dịch vụ</h1>
        <Link to="/" className="btn-primary">Quay về trang chủ</Link>
      </div>
    );
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to success page
    navigate(`/purchase/success/${packageId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">Trang chủ</Link>
              </li>
              <li>
                <span className="text-gray-400 mx-2">/</span>
                <Link to={`/package/${packageId}`} className="text-gray-500 hover:text-gray-700">
                  {packageData.name}
                </Link>
              </li>
              <li>
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-900 font-medium">Thanh toán</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Thanh Toán
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Thông tin thanh toán
              </h2>

              <form onSubmit={handlePayment}>
                {/* Customer Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Thông tin khách hàng
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên đăng nhập
                      </label>
                      <input
                        type="text"
                        value={user?.username || ''}
                        readOnly
                        className="input bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="input bg-gray-50"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        value={user?.phone || ''}
                        readOnly
                        className="input bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Phương thức thanh toán
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="momo"
                        name="payment-method"
                        type="radio"
                        value="momo"
                        checked={paymentMethod === 'momo'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="momo" className="ml-3 flex items-center">
                        <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                        <span className="text-gray-900 font-medium">Ví MoMo</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="vnpay"
                        name="payment-method"
                        type="radio"
                        value="vnpay"
                        checked={paymentMethod === 'vnpay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="vnpay" className="ml-3 flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
                          <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-900 font-medium">VNPay</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="banking"
                        name="payment-method"
                        type="radio"
                        value="banking"
                        checked={paymentMethod === 'banking'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="banking" className="ml-3 flex items-center">
                        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">ATM</span>
                        </div>
                        <span className="text-gray-900 font-medium">Thẻ ATM/Internet Banking</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                      Tôi đã đọc và đồng ý với{' '}
                      <a href="#" className="text-primary-600 hover:text-primary-500">
                        Điều khoản dịch vụ
                      </a>{' '}
                      và{' '}
                      <a href="#" className="text-primary-600 hover:text-primary-500">
                        Chính sách bảo mật
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner size="sm" color="white" />
                      <span className="ml-2">Đang xử lý thanh toán...</span>
                    </div>
                  ) : (
                    `Thanh toán ${packageData.price.toLocaleString('vi-VN')}đ`
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="card mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                      <div className="text-primary-600 font-bold text-sm">
                        {packageData.type === 'basic' ? 'CB' : 'NC'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{packageData.name}</h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{packageData.duration} phút tư vấn</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {packageData.price.toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {packageData.price.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <Shield className="w-5 h-5 inline mr-2" />
                  Cam kết bảo mật
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Thông tin thanh toán được mã hóa SSL</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Không lưu trữ thông tin thẻ</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Bảo mật tuyệt đối cuộc tư vấn</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Hỗ trợ 24/7</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Mọi thắc mắc về thanh toán, vui lòng liên hệ hotline: 
                    <span className="font-medium"> 1900-xxxx</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;