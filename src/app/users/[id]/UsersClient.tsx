"use client";
import { User, UserProp } from "@/app/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api";

export default function UsersClient({ userFromServer }: UserProp) {
  const queryClient = useQueryClient();
  const userId = userFromServer.id;
  const { data: user, isLoading } = useQuery<User, Error, User>({
    queryKey: ["user", userFromServer?.id],
    queryFn: () => usersApi.getUserById(userFromServer?.id),
    placeholderData: () => {
        return queryClient.
        getQueryData<User[]>(["users"])?.find((u) => u.id === userId)
    },
    enabled: !!userId,
  });

  if (isLoading) return <div>Загрузка...</div>;
  return (
    <div>
      {user && (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Телефон: {user.phone}</p>
          <p>Фраза: {user.phrase}</p>
        </div>
      )}
    </div>
  );
}
