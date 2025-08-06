// features/user/pages/UserEditPage.tsx
'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { editUser, fetchUsers } from '@/features/user/userSlice'
import { useUserForm } from '@/features/user/hooks/useUserForm'
import UserForm from '@/features/user/components/UserForm'

export default function UserEditPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.user.list)
  const currentUser = users.find((u: any) => u.id === Number(id))

  const { form, setForm, countries, states, resetForm } = useUserForm(currentUser)

  useEffect(() => {
    if (!users.length) dispatch(fetchUsers())
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await dispatch(editUser({ id: form.id, data: form }))
    // Optional redirect after update
  }

  return (
    <div>
      <h2>Edit User</h2>
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
