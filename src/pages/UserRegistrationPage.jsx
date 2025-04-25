import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputField from '../components/InputFields';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../validations/userSchema';
import { registerUser } from '../services/userService';

const UserRegistrationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
   
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { message, user } = await registerUser(data);
      toast.success(message);
      localStorage.setItem('user', JSON.stringify(user));
      reset();
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : error.message;
      if (errorMessage.includes('email already in use')) {
        toast.error('Email is already registered. Please, try a different email');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            name="fullName"
            control={control}
            label="Full Name"
            error={errors.fullName?.message}
          />
          <InputField
            name="email"
            control={control}
            label="Email"
            error={errors.email?.message}
          />
          <InputField
            name="password"
            control={control}
            label="Password"
            type="password"
            error={errors.password?.message}
          />
          <button
            type="submit"
            disabled={loading || !isValid}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 disabled:bg-[#ccc] disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserRegistrationPage;
