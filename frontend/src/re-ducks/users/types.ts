import { Action } from 'redux';
export interface UsersAction extends Action {
  type: string;
  payload: UserState;
}

// ユーザー
export interface UserState {
  isSignedIn: boolean;
  role:  string;
  userid: string;
  username: string;
  email: string;
}

// ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
  isAdmin: boolean
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}
