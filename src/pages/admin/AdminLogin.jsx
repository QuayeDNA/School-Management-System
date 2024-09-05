import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/contexts/AuthContext';
import { IoIosSync, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FaUser, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import { Dialog, Transition, DialogTitle, TransitionChild } from '@headlessui/react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!formData.username.trim()) tempErrors.username = 'Username is required';
    if (!formData.password) tempErrors.password = 'Password is required';
    if (formData.password.length < 6) tempErrors.password = 'Password must be at least 6 characters';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await login(formData.username, formData.password);
        navigate('/app/admin/dashboard');
      } catch (error) {
        setStatusMessage({ type: 'error', message: 'Invalid username or password' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim()) {
      setStatusMessage({ type: 'error', message: 'Please enter your email address' });
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      const newPassword = prompt('Enter your new password:');
      if (newPassword) {
        await resetPassword(forgotPasswordEmail, newPassword);
        setStatusMessage({ type: 'success', message: 'Password reset successfully' });
        setIsForgotPasswordOpen(false);
      } else {
        setStatusMessage({ type: 'error', message: 'Password reset cancelled' });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', message: 'Failed to reset password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-teal-700 to-green-600  p-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-600 to-teal-700"></div>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>
        {statusMessage.message && (
          <div className={`rounded-md p-4 ${statusMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{statusMessage.message}</p>
              </div>
            </div>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-900" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <IoMdEyeOff className="h-5 w-5" /> : <IoMdEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
              >
                Forgot your password?
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              {loading ? (
                <span className="flex items-center">
                  <IoIosSync className="animate-spin h-5 w-5 mr-3" />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link to="/admin-signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Register here
                </Link>
              </p>
              </div>
          </div>
        </form>
      </div>

      {/* Forgot Password Dialog */}
      <Transition show={isForgotPasswordOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsForgotPasswordOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black opacity-60" />
            </TransitionChild>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Reset your password
                </DialogTitle>
                <form onSubmit={handleForgotPassword}>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Enter your email address and we&apos;ll send you instructions to reset your password.
                    </p>
                    <input
                      type="email"
                      className="mt-4 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Email address"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    >
                      Send reset instructions
                    </button>
                  </div>
                </form>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default LoginPage;