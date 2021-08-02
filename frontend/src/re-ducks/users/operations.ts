import { signInAction, signOutAction } from "./index";
import { push } from 'connected-react-router';

export const signIn = () => {
  return async (dispatch:any) => {
    // ダミー処理
    dispatch(signInAction({
      isSignedIn: true,
      role: "LoginRole",
      userid: "LoginUserid",
      username: "LoginUser"
    }));

    dispatch(push("/"));
  }
}

export const signOut = () => {
  return async (dispatch:any) => {

    // Local Storageの初期化
    localStorage.clear()

    // Store Userの初期化
    dispatch(signOutAction());
    dispatch(push("/"));
  }
}
