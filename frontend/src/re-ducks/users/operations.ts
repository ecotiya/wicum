import { signInAction, signOutAction } from "./index";
import { SignInParams, SignUpParams } from "./types";
import { push } from 'connected-react-router';
import {isValidEmailFormat, isValidRequiredInput, client, client_config} from "./utils";
import Cookies from "js-cookie"

export const signIn = (email:string, password:string) => {
  return async (dispatch:any) => {
    // Validations
    if(!isValidRequiredInput(email, password)) {
        alert('必須項目が未入力です。');
        return false
    }

    if(!isValidEmailFormat(email)) {
        alert('メールアドレスの形式が不正です。もう1度お試しください。')
        return false
    }

    const params: SignInParams = {
      email: email,
      password: password
    }

    return client.post("auth/sign_in", params, client_config)
    .then(response => {
        // 成功
        console.log("registration res", response)
        Cookies.set("_access_token", response.headers["access-token"])
        Cookies.set("_client", response.headers["client"])
        Cookies.set("_uid", response.headers["uid"])

        dispatch(signInAction({
          isSignedIn: true,
          role: "",
          userid: response.headers["uid"],
          username: "loginTest",
          email: "loginEmail",
        }));

        // TEST用
        dispatch(push("/signupsuccess"));
    }).catch(error => {
        // 失敗
        console.log("registration error", error)
        alert('サインイン処理に失敗しました。管理者にお問い合わせください。')
    })
  }
}

export const signOut = () => {
  return async (dispatch:any) => {

    dispatch(signOutAction());
    dispatch(push("/"));
  }
}

export const signUp = (username:string, email:string, password:string, confirmPassword:string) => {
  return async (dispatch:any) => {
    // Validations
    if(!isValidRequiredInput(username, email, password, confirmPassword)) {
        alert('必須項目が未入力です。');
        return false;
    }

    if(!isValidEmailFormat(email)) {
        alert('メールアドレスの形式が不正です。もう1度お試しください。');
        return false;
    }
    if (password !== confirmPassword) {
        alert('パスワードが一致しません。もう1度お試しください。');
        return false;
    }
    if (password.length < 6) {
        alert('パスワードは6文字以上で入力してください。');
        return false;
    }

    const params: SignUpParams = {
      name: username,
      email: email,
      password: password,
      passwordConfirmation: confirmPassword
    }

    return client.post("auth", params, client_config)
    .then(response => {
        // 成功
        console.log("registration res", response)
        Cookies.set("_access_token", response.headers["access-token"])
        Cookies.set("_client", response.headers["client"])
        Cookies.set("_uid", response.headers["uid"])

        dispatch(signInAction({
          isSignedIn: true,
          role: "",
          userid: response.headers["uid"],
          username: username,
          email: email,
        }));

        // TEST用
        dispatch(push("/signupsuccess"));
    }).catch(error => {
        // 失敗
        console.log("registration error", error)
        alert('アカウント登録に失敗しました。もう1度お試しください。')
    })
  }
}
