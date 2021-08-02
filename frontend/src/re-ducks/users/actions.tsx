import { UserState } from './types';

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState:UserState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username
    }
  }
};
