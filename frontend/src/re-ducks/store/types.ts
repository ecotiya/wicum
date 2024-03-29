import { UsersAction } from '../users/types';

export interface InitialStateModel {
  users: {
    isSignedIn: boolean;
    isAdmin: boolean;
    uid: string;
    name: string;
    email: string;
    image: string
    avatarUrl: string
  }
}

export type Action =
  | UsersAction;
