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

// サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}
