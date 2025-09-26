import type { User, ConsultationPackage, Feedback } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'demo_user',
    email: 'demo@gmail.com',
    phone: '0123456789',
    password: 'demo123',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    username: 'testuser',
    email: 'test@gmail.com',
    phone: '0987654321',
    password: 'test123',
    createdAt: '2024-02-01T14:30:00Z',
  }
];

export const mockPackages: ConsultationPackage[] = [
  {
    id: 'basic',
    name: 'Gói Tư Vấn Cơ Bản',
    price: 35000,
    duration: 10,
    type: 'basic',
    description: 'Giải đáp nhanh những thắc mắc cơ bản về sức khỏe sinh sản & tình dục an toàn.',
    features: [
      'Tư vấn trực tuyến 1–1 với chuyên viên trong 10 phút',
      'Hỗ trợ xử lý các vấn đề phổ biến',
      'Biện pháp tránh thai cơ bản',
      'Dấu hiệu sức khỏe thường gặp',
      'Tình huống tâm lý đơn giản',
      'Bảo mật tuyệt đối, hỏi thoải mái'
    ]
  },
  {
    id: 'advanced',
    name: 'Gói Tư Vấn Nâng Cao',
    price: 75000,
    duration: 20,
    type: 'advanced',
    description: 'Kiến thức sâu hơn – Giải pháp toàn diện với bác sĩ và chuyên gia tâm lý.',
    features: [
      'Tư vấn trực tuyến 1–1 với bác sĩ và chuyên gia tâm lý trong 20 phút',
      'Các bệnh lý phụ khoa, nam khoa hoặc tình dục thường gặp',
      'Các vấn đề tâm lý liên quan đến tình dục, tình cảm, mối quan hệ',
      'Định hướng hành vi an toàn và phòng ngừa rủi ro lâu dài',
      'Cá nhân hóa theo từng trường hợp',
      'Kế hoạch chăm sóc và bảo vệ sức khỏe phù hợp',
      'Cam kết bảo mật tuyệt đối'
    ]
  }
];

export const mockFeedbacks: Feedback[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Anh Minh',
    packageId: 'basic',
    rating: 5,
    comment: 'Tư vấn viên rất tận tình và chuyên nghiệp. Giải đáp được thắc mắc của mình một cách rõ ràng.',
    createdAt: '2024-03-01T09:15:00Z',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Chị Lan',
    packageId: 'basic',
    rating: 4,
    comment: 'Dịch vụ tốt, thời gian tư vấn phù hợp với nhu cầu cơ bản. Sẽ sử dụng lại.',
    createdAt: '2024-03-05T14:30:00Z',
  },
  {
    id: '3',
    userId: '1',
    userName: 'Anh Tuấn',
    packageId: 'advanced',
    rating: 5,
    comment: 'Gói nâng cao thật sự đáng giá. Bác sĩ tư vấn rất chi tiết và đưa ra lời khuyên cụ thể.',
    createdAt: '2024-03-10T16:45:00Z',
  },
  {
    id: '4',
    userId: '2',
    userName: 'Chị Hương',
    packageId: 'advanced',
    rating: 5,
    comment: 'Cảm ơn team đã hỗ trợ tôi rất nhiều. Tư vấn chuyên sâu và bảo mật thông tin tuyệt đối.',
    createdAt: '2024-03-15T11:20:00Z',
  },
  {
    id: '5',
    userId: '1',
    userName: 'Em Quỳnh',
    packageId: 'basic',
    rating: 4,
    comment: 'Dịch vụ ổn, tư vấn viên dễ thương. Thời gian 10 phút hơi ngắn nhưng đủ cho nhu cầu cơ bản.',
    createdAt: '2024-03-20T13:10:00Z',
  }
];

// Zalo link generator
export const generateZaloLink = (packageId: string, _userId: string) => {
  const message = encodeURIComponent(
    `Xin chào, tôi vừa thanh toán thành công gói tư vấn ${packageId === 'basic' ? 'Cơ Bản' : 'Nâng Cao'}. Vui lòng hỗ trợ tôi!`
  );
  return `https://zalo.me/0123456789?text=${message}`;
};