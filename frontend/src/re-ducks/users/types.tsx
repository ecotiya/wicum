import { Action } from 'redux';
export interface UsersAction extends Action {
  type: string;
  payload: UserState;
}

export interface UserState {
  isSignedIn: boolean;
  role:  string;
  uid: string;
  username: string;
}
