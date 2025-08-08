// features/user/components/UserForm.tsx
import React from 'react';

type UserFormProps = {
  register: any;
  errors: any;
  countries: any[];
  states: any[];
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  isSubmitting: boolean;
};

export default function UserForm({
  register,
  errors,
  countries,
  states,
  onSubmit,
  isSubmitting,
}: UserFormProps) {
  return (
    <form onSubmit={onSubmit}>
      {/* Name */}
      <input
        {...register('name')}
        placeholder="Name"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      {/* Email */}
      <input
        {...register('email')}
        placeholder="Email"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      {/* Country */}
      <select {...register('country_id')}>
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.country_id && (
        <p className="text-red-500 text-sm">{errors.country_id.message}</p>
      )}

      {/* State */}
      <select {...register('state_id')}>
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      {errors.state_id && (
        <p className="text-red-500 text-sm">{errors.state_id.message}</p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
