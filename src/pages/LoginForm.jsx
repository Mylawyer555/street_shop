import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../components/InputFields'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../validations/userSchema'
import { loginUser } from '../services/userService'


const LoginForm = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    })

    
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm