"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { UpdateUserPayload, User } from "../types/user";
import { usersApi } from "./api";
import CreateUser from "../CreateUser/CreateUser";
import Link from "next/link";

export default function Users() {
  const queryClient = useQueryClient();
  const [editUser, setEditUser] = useState<number | null>();
  const phoneRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const updateUserMutation = useMutation<User, Error, UpdateUserPayload>({
    mutationFn: usersApi.updateUser,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditUser(null); 
    },
  });
  function handleUpdateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editUser === null || editUser === undefined) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: UpdateUserPayload = {
      id: editUser,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };
    updateUserMutation.mutate(payload);
    form.reset();
  }

  const {
    isPending,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getUsers,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <Link href={`users/${user.id}`}>Перейти</Link>
          <button onClick={() => setEditUser(user.id)}>Изменить</button>
          {editUser === user.id && (
            <form onSubmit={handleUpdateUser}>
              <input type="text" name="name" placeholder="Имя" ref={nameRef} defaultValue={user.name} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                ref={emailRef}
              defaultValue={user.email}
              />
              <input
                type="text"
                name="phone"
                placeholder="Телефон"
                defaultValue={user.phone}
                ref={phoneRef}
              />
              <button type="submit">Сохранить</button>
            </form>
          )}
        </div>
      ))}
            <CreateUser />

    </div>
  );
}
