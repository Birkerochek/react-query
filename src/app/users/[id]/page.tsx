import { usersApi } from '../api';
import UsersClient from './UsersClient';

interface UserPageProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { id} = await params;
  
  const user = await usersApi.getUserById(id);


  return (
    <UsersClient userFromServer={user}/>
  );
}
