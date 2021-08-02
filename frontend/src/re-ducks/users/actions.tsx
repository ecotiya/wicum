import { userState } from './types'

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState:userState) => {
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
