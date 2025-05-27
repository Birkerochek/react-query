"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { usersApi } from "../users/api";
import {  UpdateUserPayload, User } from "../types/user";

export default function CreateUser() {
  const queryClient = useQueryClient();
  const phoneRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const createUserMutation = useMutation<User, Error, UpdateUserPayload>({
    mutationFn: usersApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: UpdateUserPayload = {
      id: Date.now(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };
    createUserMutation.mutate(payload);
    form.reset();
  }

  return (
    <div>
      <h1>Создать юзера</h1>
      <form onSubmit={handleSubmit}>
        <label>Телефон</label>
        <input
          type="text"
          name="phone"
          placeholder="Введите телефон"
          ref={phoneRef}
        />
        <label>Имя</label>
        <input
          type="text"
          name="name"
          placeholder="Введите имя"
          ref={nameRef}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Введите email"
          ref={emailRef}
        />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}
