import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, AlertCircle, Mail } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

interface RegisterFormData {
  username: string;
  email: string;
  fullName: string;
  birthday: string;
  gender: 'Male' | 'Female';
  password: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const { register: registerUser } = useAuth();

  // Get the page user was trying to access before being redirected to login
  const from = (location.state as any)?.from?.pathname || '/';

  // Completely isolate Register page from global styles
  useEffect(() => {
    // Store original styles
    const originalBodyStyle = document.body.getAttribute('style') || '';
    const originalHtmlStyle = document.documentElement.getAttribute('style') || '';

    // Reset and override ALL global styles for body and html
    document.body.setAttribute('style', `
      margin: 0 !important;
      padding: 0 !important;
      background: none !important;
      background-image: none !important;
      background-color: transparent !important;
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      overflow: hidden !important;
      width: 100vw !important;
      height: 100vh !important;
    `);

    document.documentElement.setAttribute('style', `
      margin: 0 !important;
      padding: 0 !important;
      background: none !important;
      background-image: none !important;
      background-color: transparent !important;
      overflow: hidden !important;
      width: 100vw !important;
      height: 100vh !important;
    `);

    // Cleanup when component unmounts
    return () => {
      if (originalBodyStyle) {
        document.body.setAttribute('style', originalBodyStyle);
      } else {
        document.body.removeAttribute('style');
      }

      if (originalHtmlStyle) {
        document.documentElement.setAttribute('style', originalHtmlStyle);
      } else {
        document.documentElement.removeAttribute('style');
      }
    };
  }, []);

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    setApiError('');
    setSuccess('');

    try {
      const result = await registerUser(data);

      if (result.success) {
        setSuccess('Đăng ký thành công! Chuyển hướng đến trang chủ...');
        setTimeout(() => {
          navigate(from);
        }, 2000);
      } else {
        setApiError(result.error || 'Đăng ký thất bại, vui lòng thử lại');
      }
    } catch (err) {
      setApiError('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Add keyframe animation for spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div
        className="register-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          zIndex: 9999,
          background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(147, 197, 253) 50%, rgb(191, 219, 254) 100%)',
          overflow: 'hidden',
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          boxSizing: 'border-box'
        }}
      >
        {/* Stars */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          {[...Array(50)].map((_, i: number) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                backgroundColor: 'white',
                borderRadius: '50%',
                opacity: 0.6,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Large gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '128px',
            width: '192px',
            height: '192px',
            background: 'linear-gradient(135deg, rgb(191, 219, 254) 0%, rgb(59, 130, 246) 100%)',
            borderRadius: '50%',
            opacity: 0.8,
            filter: 'blur(48px)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '128px',
            right: '80px',
            width: '256px',
            height: '256px',
            background: 'linear-gradient(135deg, rgb(147, 197, 253) 0%, rgb(191, 219, 254) 100%)',
            borderRadius: '50%',
            opacity: 0.6,
            filter: 'blur(64px)',
            pointerEvents: 'none'
          }}
        />

        {/* Mountains silhouette */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '256px',
            pointerEvents: 'none'
          }}
        >
          <svg viewBox="0 0 1200 300" style={{ width: '100%', height: '100%', fill: 'black', opacity: 0.4 }}>
            <path d="M0,300 L0,200 L100,120 L200,180 L300,100 L400,160 L500,80 L600,140 L700,60 L800,120 L900,40 L1000,100 L1100,80 L1200,140 L1200,300 Z" />
          </svg>
        </div>

        {/* Additional mountain layer */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '192px',
            pointerEvents: 'none'
          }}
        >
          <svg viewBox="0 0 1200 200" style={{ width: '100%', height: '100%', fill: 'black', opacity: 0.6 }}>
            <path d="M0,200 L0,150 L150,100 L250,140 L350,80 L450,120 L550,60 L650,100 L750,40 L850,80 L950,20 L1050,60 L1200,80 L1200,200 Z" />
          </svg>
        </div>

        {/* Register Form */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '16px'
          }}
        >
          <div style={{ width: '100%', maxWidth: '448px' }}>
            {/* Glass morphism container */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                margin: 0,
                boxSizing: 'border-box'
              }}
            >
              <h1
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  marginBottom: '32px',
                  margin: '0 0 32px 0'
                }}
              >
                Đăng ký
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Error Message */}
                {apiError && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      borderRadius: '16px',
                      padding: '16px',
                      color: 'rgb(252, 165, 165)',
                      fontSize: '14px'
                    }}
                  >
                    <AlertCircle size={20} />
                    {apiError}
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'rgba(34, 197, 94, 0.2)',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      borderRadius: '16px',
                      padding: '16px',
                      color: 'rgb(134, 239, 172)',
                      fontSize: '14px'
                    }}
                  >
                    <AlertCircle size={20} />
                    {success}
                  </div>
                )}

                {/* Username field */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    {...register('username', {
                      required: 'Tên đăng nhập là bắt buộc',
                      minLength: {
                        value: 3,
                        message: 'Tên đăng nhập phải có ít nhất 3 ký tự'
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới'
                      }
                    })}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: errors.username ? '2px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '9999px',
                      padding: '18px 48px 18px 16px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      margin: 0,
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      if (!errors.username) {
                        e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.username) {
                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                      opacity: 0.7,
                      pointerEvents: 'none'
                    }}
                  >
                    <User size={20} />
                  </div>
                  {errors.username && (
                    <p style={{ color: 'rgb(252, 165, 165)', fontSize: '12px', margin: '4px 0 0 16px' }}>
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Full Name field */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    {...register('fullName', {
                      required: 'Họ và tên là bắt buộc',
                      minLength: {
                        value: 2,
                        message: 'Họ và tên phải có ít nhất 2 ký tự'
                      }
                    })}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: errors.fullName ? '2px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '9999px',
                      padding: '18px 48px 18px 16px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      margin: 0,
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      if (!errors.fullName) {
                        e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.fullName) {
                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                      opacity: 0.7,
                      pointerEvents: 'none'
                    }}
                  >
                    <User size={20} />
                  </div>
                  {errors.fullName && (
                    <p style={{ color: 'rgb(252, 165, 165)', fontSize: '12px', margin: '4px 0 0 16px' }}>
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                      required: 'Email là bắt buộc',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Email không hợp lệ'
                      }
                    })}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: errors.email ? '2px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '9999px',
                      padding: '18px 48px 18px 16px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      margin: 0,
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      if (!errors.email) {
                        e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.email) {
                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                      opacity: 0.7,
                      pointerEvents: 'none'
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  {errors.email && (
                    <p style={{ color: 'rgb(252, 165, 165)', fontSize: '12px', margin: '4px 0 0 16px' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Birthday field */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    {...register('birthday', {
                      required: 'Ngày sinh là bắt buộc',
                      validate: {
                        notFuture: (value) => {
                          const today = new Date();
                          const inputDate = new Date(value);
                          return inputDate <= today || 'Ngày sinh không thể là ngày trong tương lai';
                        },
                        minimumAge: (value) => {
                          const today = new Date();
                          const inputDate = new Date(value);
                          const age = today.getFullYear() - inputDate.getFullYear();
                          return age >= 13 || 'Bạn phải ít nhất 13 tuổi';
                        }
                      }
                    })}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: errors.birthday ? '2px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '9999px',
                      padding: '18px 16px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      margin: 0,
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      if (!errors.birthday) {
                        e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.birthday) {
                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {errors.birthday && (
                    <p style={{ color: 'rgb(252, 165, 165)', fontSize: '12px', margin: '4px 0 0 16px' }}>
                      {errors.birthday.message}
                    </p>
                  )}
                </div>

                {/* Gender field */}
                <div style={{ position: 'relative' }}>
                  <select
                    {...register('gender', {
                      required: 'Giới tính là bắt buộc'
                    })}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: errors.gender ? '2px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '9999px',
                      padding: '18px 16px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      margin: 0,
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      if (!errors.gender) {
                        e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.gender) {
                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    <option value="" style={{ color: 'black' }}>Chọn giới tính</option>
                    <option value="Male" style={{ color: 'black' }}>Nam</option>
                    <option value="Female" style={{ color: 'black' }}>Nữ</option>
                  </select>
                  {errors.gender && (
                    <p style={{ color: 'rgb(252, 165, 165)', fontSize: '12px', margin: '4px 0 0 16px' }}>
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                {/* Password field */}
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    {...register('password', {
                      required: 'Mật khẩu là bắt buộc',
                      minLength: {
                        value: 6,
                        message: 'Mật khẩu phải có ít nhất 6 ký tự'
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
                      }
                    })}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: errors.password ? '2px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '9999px',
                      padding: '18px 80px 18px 16px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      margin: 0,
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      if (!errors.password) {
                        e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.password) {
                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '48px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                      opacity: 0.7,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      transition: 'opacity 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <div
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                      opacity: 0.7,
                      pointerEvents: 'none'
                    }}
                  >
                    <Lock size={20} />
                  </div>
                  {errors.password && (
                    <p style={{ color: 'rgb(252, 165, 165)', fontSize: '12px', margin: '4px 0 0 16px' }}>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Register button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    background: isSubmitting ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: '#1f2937',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    transform: 'scale(1)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    margin: 0,
                    opacity: isSubmitting ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '8px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid #1f2937',
                          borderTop: '2px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}
                      />
                      Đang đăng ký...
                    </>
                  ) : (
                    'Đăng ký'
                  )}
                </button>

                {/* Login link */}
                <p
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    margin: 0,
                    fontSize: '16px'
                  }}
                >
                  Bạn đã có tài khoản?{' '}
                  <Link
                    to="/login"
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      transition: 'opacity 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                      e.currentTarget.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    Đăng nhập
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Cursor (mouse pointer) */}
        <div
          style={{
            position: 'absolute',
            bottom: '128px',
            right: '192px',
            width: '24px',
            height: '24px',
            color: 'white',
            opacity: 0.8,
            pointerEvents: 'none'
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
            <path d="M7.5 14.25L2.25 9l5.25-5.25v3.5H21v3.5H7.5v3.5z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Register;