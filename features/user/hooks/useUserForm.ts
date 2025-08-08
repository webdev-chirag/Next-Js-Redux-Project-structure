// features/user/hooks/useUserForm.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCountries, fetchStates } from '@/features/location/locationSlice';
import { RootState } from '@/redux/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userSchema } from '@/validation/userSchema';

export type UserFormValues = yup.InferType<typeof userSchema>;

export const useUserForm = (initialData: Partial<UserFormValues> | null = null) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state: RootState) => state.location.countries);
  const states = useAppSelector((state: RootState) => state.location.states);

  // ✅ 2. Setup react-hook-form with Yup validation
  const formMethods = useForm<UserFormValues>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      country_id: '',
      state_id: '',
      ...initialData,
    },
  });

  const { watch, reset, setError } = formMethods;

  // ✅ 3. Fetch countries on mount
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  // ✅ 4. Fetch states when country changes
  useEffect(() => {
    const countryId = watch('country_id');
    if (countryId) {
      dispatch(fetchStates(Number(countryId)));
    }
  }, [watch('country_id')]);

  // ✅ 5. Reset form if initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData]);

  return {
    ...formMethods, // includes register, handleSubmit, formState, etc.
    countries,
    states,
    setError,
  };
};
