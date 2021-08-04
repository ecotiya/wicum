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

// export const signUp = (username:string, email:string, password:string, confirmPassword:string) => {
//   return async (dispatch:any) => {
//     // Validation(あとでutilsに移動)
//     if (username === "" || email === "" || password === "" || confirmPassword === "") {
//       alert("必須項目が未入力です。");
//       return false;
//     }
//
//     if (password !== confirmPassword) {
//       alert("パスワードが一致しません。もう1度お試しください。")
//       return false;
//     }
//
//     // 認証実施
//   }
// }
