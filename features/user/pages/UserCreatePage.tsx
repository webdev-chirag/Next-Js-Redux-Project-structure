// features/user/pages/UserCreatePage.tsx
"use client";

import { useAppDispatch } from "@/redux/hooks";
import { addUser } from "@/features/user/userSlice";
import { useUserForm } from "@/features/user/hooks/useUserForm";
import UserForm from "@/features/user/components/UserForm";
import { handleFormSubmit } from "@/utils/handleFormSubmit";

export default function UserCreatePage() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    countries,
    states,
    reset,
    setError,
  } = useUserForm();

  const onSubmit = (data: any) =>
    handleFormSubmit({
      action: addUser,
      payload: data,
      dispatch,
      setError,
      onSuccess: () => {
        reset();
        // Optional redirect
      },
    });

  return (
    <div>
      <h2>Create User</h2>
      <UserForm
        register={register}
        errors={errors}
        countries={countries}
        states={states}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
