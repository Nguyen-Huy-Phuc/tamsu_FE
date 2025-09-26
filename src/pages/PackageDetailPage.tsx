import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockPackages, mockFeedbacks } from '../lib/mockData';
import StarRating from '../components/StarRating';
import { Clock, CheckCircle, MessageSquare, User } from 'lucide-react';

const PackageDetailPage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [newFeedback, setNewFeedback] = useState({
    rating: 5,
    comment: ''
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const packageData = mockPackages.find(pkg => pkg.id === packageId);
  const packageFeedbacks = mockFeedbacks.filter(feedback => feedback.packageId === packageId);
  
  if (!packageData) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy gói dịch vụ</h1>
        <Link to="/" className="btn-primary">Quay về trang chủ</Link>
      </div>
    );
  }

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/package/${packageId}/purchase` } } });
    } else {
      navigate(`/package/${packageId}/purchase`);
    }
  };

  const averageRating = packageFeedbacks.length > 0 
    ? packageFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / packageFeedbacks.length 
    : 0;

  const submitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log('New feedback:', newFeedback);
    setNewFeedback({ rating: 5, comment: '' });
    setShowFeedbackForm(false);
    // Show success message
    alert('Cảm ơn bạn đã đánh giá!');
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
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      packageData.type === 'basic' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {packageData.type === 'basic' ? 'Gói cơ bản' : 'Gói nâng cao'}
                    </span>
                    <div className="flex items-center space-x-1">
                    <StarRating rating={averageRating} size="md" />
                    <span className="text-sm text-gray-600 ml-2">
                      ({packageFeedbacks.length} đánh giá)
                    </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {packageData.price.toLocaleString('vi-VN')}đ
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{packageData.duration} phút</span>
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
                  {packageData.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
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
                      <button type="submit" className="btn-primary">
                        Gửi đánh giá
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowFeedbackForm(false)}
                        className="btn-secondary"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Feedback List */}
              <div className="space-y-6">
                {packageFeedbacks.length > 0 ? (
                  packageFeedbacks.map((feedback) => (
                    <div key={feedback.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">{feedback.userName}</h4>
                            <StarRating rating={feedback.rating} size="sm" />
                            <span className="text-sm text-gray-500">
                              {new Date(feedback.createdAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <p className="text-gray-700">{feedback.comment}</p>
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
                <div className="flex items-center justify-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Tư vấn {packageData.duration} phút</span>
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
                className="w-full btn-primary text-lg py-3"
              >
                {isAuthenticated ? 'Mua Ngay' : 'Đăng nhập để mua'}
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
    </div>
  );
};

export default PackageDetailPage;