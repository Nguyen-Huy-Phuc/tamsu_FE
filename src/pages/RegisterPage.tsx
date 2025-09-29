import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, AlertCircle, Mail, Phone } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface RegisterFormData {
  username: string;
  email: string;
  phone: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      setError('Username là bắt buộc');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email là bắt buộc');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Email không hợp lệ');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Số điện thoại là bắt buộc');
      return false;
    }
    if (!/^\d{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      setError('Số điện thoại không hợp lệ');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password là bắt buộc');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password phải có ít nhất 6 ký tự');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate registration API call
      const success = await new Promise<boolean>((resolve) => {
        setTimeout(() => {
          // Simulate success for demo
          resolve(true);
        }, 1500);
      });

      if (success) {
        setSuccess('Đăng ký thành công! Chuyển hướng đến trang đăng nhập...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Đăng ký thất bại, vui lòng thử lại');
      }
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
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
          background: 'linear-gradient(135deg, rgb(244, 63, 94) 0%, rgb(251, 113, 133) 50%, rgb(252, 165, 165) 100%)',
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
            background: 'linear-gradient(135deg, rgb(253, 164, 175) 0%, rgb(244, 114, 182) 100%)',
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
            background: 'linear-gradient(135deg, rgb(252, 165, 165) 0%, rgb(253, 164, 175) 100%)',
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
                Register
              </h1>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Error Message */}
                {error && (
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
                    {error}
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
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
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
                      e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
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
                </div>

                {/* Email field */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
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
                      e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
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
                </div>

                {/* Phone field */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
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
                      e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
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
                    <Phone size={20} />
                  </div>
                </div>

                {/* Password field */}
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
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
                      e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
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
                </div>

                {/* Register button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: loading ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: '#1f2937',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    transform: 'scale(1)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    margin: 0,
                    opacity: loading ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '8px'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  {loading ? (
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
                    'Register'
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
                  Already have an account?{' '}
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
                    Login
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