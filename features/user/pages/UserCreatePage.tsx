// features/user/pages/UserCreatePage.tsx
'use client'

import { useAppDispatch } from '@/redux/hooks'
import { addUser } from '@/features/user/userSlice'
import { useUserForm } from '@/features/user/hooks/useUserForm'
import UserForm from '@/features/user/components/UserForm'

export default function UserCreatePage() {
  const dispatch = useAppDispatch()
  const { form, setForm, countries, states, resetForm } = useUserForm()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await dispatch(addUser(form))
    resetForm()
    // Optionally redirect
  }

  return (
    <div>
      <h2>Create User</h2>
      <UserForm
        form={form}
        setForm={setForm}
        countries={countries}
        states={states}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />
    </div>
  )
}
