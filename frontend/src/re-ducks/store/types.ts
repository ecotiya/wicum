import { UsersAction } from '../users/types';

export interface InitialStateModel {
  users: {
    isSignedIn: boolean;
    role:  string;
    userid: string;
    username: string;
  }
}

export type Action =
  | UsersAction;
