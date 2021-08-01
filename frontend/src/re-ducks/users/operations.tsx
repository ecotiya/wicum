import { signInAction } from "./index";
import { push } from 'connected-react-router';

export const signIn = () => {
  return async (dispatch:any) => {
    // ダミー処理
    dispatch(signInAction({
      isSignedIn: true,
      role: "LoginRole",
      uid: "LoginUid",
      username: "LoginUser"
    }));

    dispatch(push("/"));
  }
}
