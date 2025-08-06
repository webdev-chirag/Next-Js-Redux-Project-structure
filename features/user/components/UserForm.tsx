// features/user/components/UserForm.tsx
import React from 'react'

export default function UserForm({
  form,
  setForm,
  countries,
  states,
  handleSubmit,
  resetForm,
}: any) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <select
        value={form.country_id}
        onChange={(e) =>
          setForm({ ...form, country_id: e.target.value, state_id: '' })
        }
      >
        <option value="">Select Country</option>
        {countries.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        value={form.state_id}
        onChange={(e) => setForm({ ...form, state_id: e.target.value })}
      >
        <option value="">Select State</option>
        {states.map((s: any) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <button type="submit">{form.id ? 'Update' : 'Add'}</button>
      {form.id && <button onClick={resetForm}>Cancel</button>}
    </form>
  )
}
