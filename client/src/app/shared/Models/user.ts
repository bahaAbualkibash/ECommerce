export interface IUser {
  email: string;
  username: string;
  role: string;
  token: string;
}

export enum RoleTypes{
  SuperiorRule= "Admin",
  MainRule= "User",
}
