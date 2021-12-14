export interface Signup {
  email: string;
  password: string;
}

export interface SignupModel {
  id: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface UserModel {
  id: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
  token: string;
}
