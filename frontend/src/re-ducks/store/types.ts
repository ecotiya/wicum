import { UsersAction } from '../users/types';

export interface InitialStateModel {
  users: {
    isSignedIn: boolean;
    role:  string;
    uid: string;
    username: string;
  }
}

export type Action =
  | UsersAction;
