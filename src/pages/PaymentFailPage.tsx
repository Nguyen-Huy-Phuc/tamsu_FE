import React, { useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { XCircle, RefreshCw, Home, CreditCard, HelpCircle } from 'lucide-react';

const PaymentFailPage: React.FC = () => {
    const { packageId } = useParams<{ packageId: string }>();
    const { user } = useAuth();
    const [searchParams] = useSearchParams();

    // Lấy thông tin lỗi từ URL params nếu có
    const errorCode = searchParams.get('code');
    const errorMessage = searchParams.get('message');
    const orderCode = searchParams.get('orderCode');

    useEffect(() => {
        // Track failed purchase (analytics)
        console.log('Purchase failed:', {
            packageId,
            userId: user?.id,
            errorCode,
            errorMessage,
            orderCode
        });
    }, [packageId, user?.id, errorCode, errorMessage, orderCode]);

    const getErrorDisplay = () => {
        switch (errorCode) {
            case 'CANCELLED':
                return {
                    title: 'Thanh Toán Đã Bị Hủy',
                    message: 'Bạn đã hủy giao dịch thanh toán. Đơn hàng chưa được tạo.',
                    icon: '⏹️'
                };
            case 'EXPIRED':
                return {
                    title: 'Phiên Thanh Toán Hết Hạn',
                    message: 'Phiên thanh toán đã hết hạn. Vui lòng thử lại.',
                    icon: '⏰'
                };
            case 'INSUFFICIENT_FUNDS':
                return {
                    title: 'Số Dư Không Đủ',
                    message: 'Tài khoản của bạn không đủ số dư để thực hiện giao dịch.',
                    icon: '💳'
                };
            case 'NETWORK_ERROR':
                return {
                    title: 'Lỗi Kết Nối',
                    message: 'Có vấn đề với kết nối mạng. Vui lòng kiểm tra và thử lại.',
                    icon: '🌐'
                };
            default:
                return {
                    title: 'Thanh Toán Thất Bại',
                    message: errorMessage || 'Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại.',
                    icon: '❌'
                };
        }
    };

    const errorDisplay = getErrorDisplay();

    const retryPayment = () => {
        if (packageId) {
            // Quay lại trang package detail để thử thanh toán lại
            window.location.href = `/package/${packageId}`;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
            <div className="container px-4 w-full">
                <div className="max-w-2xl mx-auto">
                    {/* Error Header */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <XCircle className="w-12 h-12 text-red-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {errorDisplay.title}
                        </h1>
                        <p className="text-gray-600 text-lg">
                            {errorDisplay.message}
                        </p>
                        {orderCode && (
                            <p className="text-sm text-gray-500 mt-2">
                                Mã giao dịch: <span className="font-mono font-medium">{orderCode}</span>
                            </p>
                        )}
                    </div>

                    {/* Error Details Card */}
                    <div className="card mb-6">
                        <div className="flex items-start space-x-4">
                            <div className="text-4xl">{errorDisplay.icon}</div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    Tại sao thanh toán thất bại?
                                </h2>
                                <div className="space-y-2 text-gray-700">
                                    <p>• Thông tin thẻ không chính xác hoặc thẻ đã hết hạn</p>
                                    <p>• Tài khoản không đủ số dư</p>
                                    <p>• Giao dịch bị ngân hàng từ chối</p>
                                    <p>• Lỗi kết nối mạng trong quá trình thanh toán</p>
                                    <p>• Hủy giao dịch trong quá trình thanh toán</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Solutions Card */}
                    <div className="card mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                            Bạn có thể làm gì?
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Kiểm tra thông tin thanh toán</h3>
                                    <p className="text-gray-600 text-sm">
                                        Đảm bảo thông tin thẻ, số dư tài khoản và kết nối mạng ổn định
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Thử phương thức khác</h3>
                                    <p className="text-gray-600 text-sm">
                                        Sử dụng thẻ khác hoặc phương thức thanh toán khác
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Liên hệ hỗ trợ</h3>
                                    <p className="text-gray-600 text-sm">
                                        Gọi hotline 1900-xxxx nếu vấn đề vẫn tiếp tục xảy ra
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support Card */}
                    <div className="card mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Cần hỗ trợ?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <CreditCard className="w-5 h-5 text-blue-600" />
                                    <span className="font-semibold text-blue-800">Hỗ trợ thanh toán</span>
                                </div>
                                <p className="text-blue-700 text-sm mb-2">
                                    Gặp vấn đề với thanh toán?
                                </p>
                                <p className="font-bold text-blue-900">📞 1900-xxxx</p>
                                <p className="text-blue-600 text-sm">24/7 - Miễn phí</p>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <HelpCircle className="w-5 h-5 text-green-600" />
                                    <span className="font-semibold text-green-800">Hỗ trợ tư vấn</span>
                                </div>
                                <p className="text-green-700 text-sm mb-2">
                                    Cần tư vấn về gói dịch vụ?
                                </p>
                                <p className="font-bold text-green-900">💬 Chat Zalo</p>
                                <p className="text-green-600 text-sm">8:00 - 22:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={retryPayment}
                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-semibold"
                        >
                            <RefreshCw className="w-5 h-5 mr-2" />
                            Thử Thanh Toán Lại
                        </button>

                        <Link
                            to="/"
                            className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center font-semibold text-center"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Về Trang Chủ
                        </Link>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-8">
                        <p className="text-sm text-gray-500">
                            Nếu bạn gặp khó khăn, đội ngũ hỗ trợ của TamSu Health luôn sẵn sàng giúp đỡ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailPage;