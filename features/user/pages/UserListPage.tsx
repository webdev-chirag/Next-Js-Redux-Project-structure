// features/user/pages/UserListPage.tsx
'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchUsers, removeUser } from '@/features/user/userSlice'

export default function UserListPage() {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.user.list)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div>
      <h2>All Users</h2>
      <Link href="/users/create">
        <button>Add New User</button>
      </Link>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.state?.name}, {user.country?.name}
            <Link href={`/users/${user.id}/edit`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => dispatch(removeUser(user.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
