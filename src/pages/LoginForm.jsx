import React,{useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../components/InputFields'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../validations/userSchema'
import { loginUser } from '../services/userService'
import { useAuth } from '../context/AuthContext'
const LoginForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user, login} = useAuth();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    useEffect(() => {
        if(user) {
            if(user.isAdmin) {
                navigate('/superadmin-dashboard');
            }else {
                navigate('/');
            }
        }
    }, [user, navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const {message, token, user} = await loginUser(data);
            toast.success(message);

            //save token and user in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('uuser', JSON.stringify(user));

            //update user in context
            login(user);

            reset();

            // conditional navigation based on admin flag
            if(user.isAdmin) {
                navigate('/superadmin-dashboard');
            }else {
                navigate('/');
            }
        } catch (error) {
            const errorMessage = typeof error === 'string' ? error : error.message
            toast.error(errorMessage);
        }finally {
            setLoading(false);
        };
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 disabled:bg-[#ccc]  disabled:cursor-not-allowed"
        >
          {loading ? 'LogingIn...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
       Don't have an account?{' '}
        <span
          onClick={() => navigate('/register')}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Create account here
        </span>
      </p>
    </div>
  </div>
  )
}

export default LoginForm