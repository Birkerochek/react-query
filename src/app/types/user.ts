

export interface UserProp{
  userFromServer: User
}
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string; 
  phrase?: string;
}
export interface UpdateUserPayload {
  id: number;
  name: string;
  email: string;
  phone: string;
}



export type CreateUserPayload = Omit<User, 'id'>;
