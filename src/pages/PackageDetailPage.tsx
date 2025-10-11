import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchPackageById, submitReview, processPackageForUI, type PackageDetailResponse } from '../services/packageService';
import { createPayment } from '../services/paymentService';
import StarRating from '../components/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastContainer from '../components/ToastContainer';
import { useToast } from '../hooks/useToast';
import { CheckCircle, MessageSquare, User } from 'lucide-react';
import type { ConsultationPackage, ReviewSubmission } from '../types';

const PackageDetailPage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toasts, success, error, removeToast } = useToast();

  const [packageData, setPackageData] = useState<ConsultationPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const [newFeedback, setNewFeedback] = useState<ReviewSubmission>({
    rating: 5,
    comment: ''
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // Scroll to top when component mounts or packageId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [packageId]);

  useEffect(() => {
    if (!packageId) return;

    const loadPackage = async () => {
      try {
        setLoading(true);
        setLoadingError(null);
        const response: PackageDetailResponse = await fetchPackageById(packageId);

        // Process package for UI (add features and type)
        const processedPackage = processPackageForUI(response.data);
        setPackageData(processedPackage);
      } catch (err) {
        setLoadingError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    loadPackage();
  }, [packageId]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (loadingError) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 font-bold text-xl">!</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Có lỗi xảy ra</h3>
          <p className="text-gray-600 mb-6">{loadingError}</p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/"
              className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              Quay về trang chủ
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy gói dịch vụ</h1>
        <Link to="/" className="btn-primary">Quay về trang chủ</Link>
      </div>
    );
  }

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/package/${packageId}` } } });
      return;
    }

    if (!packageId) return;

    try {
      setProcessingPayment(true);
      const response = await createPayment(packageId);

      if (response.data.checkoutUrl) {
        success('Chuyển hướng đến trang thanh toán...');
        // Chuyển hướng đến trang thanh toán
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error('Không nhận được URL thanh toán');
      }
    } catch (err) {
      error(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo thanh toán');
    } finally {
      setProcessingPayment(false);
    }
  };

  const reviews = packageData.reviews || [];
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageId) return;

    try {
      setSubmittingReview(true);
      await submitReview(packageId, newFeedback);

      // Refresh package data to get new review
      const response: PackageDetailResponse = await fetchPackageById(packageId);
      const processedPackage = processPackageForUI(response.data);
      setPackageData(processedPackage);

      // Reset form
      setNewFeedback({ rating: 5, comment: '' });
      setShowFeedbackForm(false);

      // Show success message
      success('Cảm ơn bạn đã đánh giá!');
    } catch (err) {
      error(err instanceof Error ? err.message : 'Có lỗi xảy ra khi gửi đánh giá');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Trang chủ
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-900 font-medium">{packageData.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Package Information */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {packageData.name}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${packageData.type === 'basic' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                      {packageData.type === 'basic' ? 'Gói cơ bản' : 'Gói nâng cao'}
                    </span>
                    <div className="flex items-center space-x-1">
                      <StarRating rating={averageRating} size="md" />
                      <span className="text-sm text-gray-600 ml-2">
                        ({reviews.length} đánh giá)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {packageData.price.toLocaleString('vi-VN')}đ
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-6">
                {packageData.description}
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Tính năng của gói
                </h3>
                <div className="space-y-3">
                  {packageData.features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  )) || (
                      <p className="text-gray-600">Không có thông tin tính năng.</p>
                    )}
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Đánh giá từ khách hàng
                </h3>
                <button
                  onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                  className="btn-secondary"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Viết đánh giá
                </button>
              </div>

              {/* Feedback Form */}
              {showFeedbackForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-3">Đánh giá của bạn</h4>
                  <form onSubmit={submitFeedback}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số sao
                      </label>
                      <StarRating
                        rating={newFeedback.rating}
                        interactive
                        onRatingChange={(rating) => setNewFeedback(prev => ({ ...prev, rating }))}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Nhận xét
                      </label>
                      <textarea
                        id="comment"
                        rows={3}
                        className="input"
                        placeholder="Chia sẻ trải nghiệm của bạn..."
                        value={newFeedback.comment}
                        onChange={(e) => setNewFeedback(prev => ({ ...prev, comment: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={submittingReview}
                      >
                        {submittingReview ? 'Đang gửi...' : 'Gửi đánh giá'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowFeedbackForm(false)}
                        className="btn-secondary"
                        disabled={submittingReview}
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Feedback List */}
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">{review.user.fullName}</h4>
                            <StarRating rating={review.rating} size="sm" />
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Chưa có đánh giá nào cho gói này.</p>
                    <p className="text-sm text-gray-400">Hãy là người đầu tiên đánh giá!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="card sticky top-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {packageData.price.toLocaleString('vi-VN')}đ
                </div>
                <div className="text-gray-500 font-medium">
                  {packageData.duration}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Tư vấn 1-1 với chuyên gia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Bảo mật thông tin tuyệt đối</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Hỗ trợ qua Zalo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Không lưu trữ cuộc trò chuyện</span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={processingPayment}
                className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processingPayment
                  ? '⏳ Đang xử lý thanh toán...'
                  : isAuthenticated
                    ? '💳 Thanh toán ngay'
                    : 'Đăng nhập để mua'
                }
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Bằng việc mua gói, bạn đồng ý với{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-500">
                    Điều khoản dịch vụ
                  </a>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Hỗ trợ</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📞 Hotline: 1900-xxxx</p>
                  <p>📧 Email: support@tamsu.health</p>
                  <p>🕐 Hỗ trợ: 8:00 - 22:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};

export default PackageDetailPage;