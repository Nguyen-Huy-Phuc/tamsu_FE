import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrderByCode, generateZaloLink, formatTransactionStatus, type OrderDetails } from '../services/transactionService';
import { fetchPackageById, processPackageForUI } from '../services/packageService';
import LoadingSpinner from '../components/LoadingSpinner';
import { CheckCircle, MessageCircle, Clock, Phone, Copy } from 'lucide-react';
import type { ConsultationPackage } from '../types';

const PurchaseSuccessPage: React.FC = () => {
  console.log('🔧 PurchaseSuccessPage render');

  const { packageId } = useParams<{ packageId: string }>();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  console.log('🔧 packageId:', packageId);
  console.log('🔧 searchParams:', Object.fromEntries(searchParams));

  const [orderData, setOrderData] = useState<OrderDetails | null>(null);
  const [packageData, setPackageData] = useState<ConsultationPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy orderCode từ URL params một lần và không thay đổi
  const orderCodeFromUrl = searchParams.get('orderCode');
  const orderCode = useMemo(() => {
    const code = orderCodeFromUrl || `TH${Date.now().toString().slice(-8)}`;
    console.log('🔧 orderCode computed:', code);
    return code;
  }, [orderCodeFromUrl]);

  useEffect(() => {
    console.log('🔧 useEffect triggered with deps:', { packageId, orderCodeFromUrl });

    const loadOrderAndPackageData = async () => {
      try {
        console.log('🔧 Loading data...');
        setLoading(true);
        setError(null);

        // Nếu có orderCode từ URL, lấy thông tin order
        if (orderCodeFromUrl) {
          try {
            const orderResponse = await getOrderByCode(orderCode);
            setOrderData(orderResponse.data);
          } catch (err) {
            console.warn('Failed to load order data:', err);
          }
        }

        // Nếu có packageId, lấy thông tin package
        if (packageId) {
          try {
            const packageResponse = await fetchPackageById(packageId);
            const processedPackage = processPackageForUI(packageResponse.data);
            setPackageData(processedPackage);
          } catch (err) {
            console.warn('Failed to load package data:', err);
          }
        }

        // Track successful purchase (analytics)
        console.log('Purchase successful:', {
          packageId,
          userId: user?.id,
          orderCode
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải thông tin');
        console.error('Load order/package data error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOrderAndPackageData();
  }, [packageId, orderCodeFromUrl]); const copyZaloLink = () => {
    if (packageData && orderCode) {
      const zaloLink = generateZaloLink(orderCode, packageData.name);
      navigator.clipboard.writeText(zaloLink);
      alert('Đã copy link Zalo!');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
        <div className="container px-4 w-full">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 font-bold text-xl">!</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Có lỗi xảy ra</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link to="/" className="btn-primary">Quay về trang chủ</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!packageData && !orderData) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy thông tin đơn hàng</h1>
        <Link to="/" className="btn-primary">Quay về trang chủ</Link>
      </div>
    );
  }

  // Sử dụng data từ order hoặc package
  const displayPackageName = orderData?.packageName || packageData?.name || 'Gói tư vấn';
  const displayAmount = orderData?.amount || packageData?.price || 0;
  const displayDuration = packageData?.duration || '30 phút';
  const transactionStatus = orderData?.transaction ? formatTransactionStatus(orderData.transaction.status) : 'Đã thanh toán';

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
                <span className="text-gray-600">Gói dịch vụ:</span>
                <span className="font-medium text-gray-900">{displayPackageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời lượng tư vấn:</span>
                <span className="font-medium text-gray-900">{displayDuration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tổng tiền:</span>
                <span className="font-bold text-green-600 text-lg">
                  {displayAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Khách hàng:</span>
                <span className="font-medium text-gray-900">{user?.username || user?.email || 'Khách hàng'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trạng thái:</span>
                <span className="font-medium text-green-600">{transactionStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian:</span>
                <span className="font-medium text-gray-900">
                  {orderData?.createdAt ? new Date(orderData.createdAt).toLocaleString('vi-VN') : new Date().toLocaleString('vi-VN')}
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
                    Chia sẻ mã đơn hàng <span className="font-medium">{orderCode}</span> với tư vấn viên
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
                    Chuyên gia sẽ tư vấn cho bạn trong {displayDuration}
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
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const zaloLink = generateZaloLink(orderCode, displayPackageName);
                    window.open(zaloLink, '_blank');
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Mở Zalo
                </button>
                <button
                  onClick={copyZaloLink}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center text-sm"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
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
                  Cuộc tư vấn có thời lượng {displayDuration} và hoàn toàn bảo mật
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
              className="flex-1 text-center btn-secondary"
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