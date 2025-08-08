"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { editUser, fetchUsers, fetchUserById } from "@/features/user/userSlice";
import { useUserForm } from "@/features/user/hooks/useUserForm";
import UserForm from "@/features/user/components/UserForm";
import { handleFormSubmit } from "@/utils/handleFormSubmit";

export default function UserEditPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.list);
  const currentUser = users.find((u: any) => u.id === Number(id));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    countries,
    states,
    reset,
    setError,
  } = useUserForm(currentUser);

  useEffect(() => {
    if (!currentUser) {
      // Either list is empty OR currentUser doesn't have full details
      dispatch(fetchUserById(Number(id)));
    }
  }, [currentUser, dispatch, id]);

  const onSubmit = (data: any) =>
    handleFormSubmit({
      action: editUser,
      payload: { id: Number(id), data },
      dispatch,
      setError,
      onSuccess: () => {
        reset();
        // Optional redirect
      },
    });

  return (
    <div>
      <h2>Edit User</h2>
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
