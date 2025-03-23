export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export type UpdateUserType = {
  id: string;
  name?: string;
  username?: string;
  email?: string;
}

export type CreateUserType = {
  name: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}