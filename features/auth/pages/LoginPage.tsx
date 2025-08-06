// features/auth/pages/LoginPage.tsx
'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '@/redux/hooks'
import { loginUser } from '../authSlice'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await dispatch(loginUser(data)).unwrap()
      toast.success('Login successful')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err?.message || 'Login failed')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}
