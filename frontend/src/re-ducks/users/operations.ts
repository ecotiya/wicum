import { signInAction, signOutAction } from "./index";
import { SignUpParams } from "./types";
import { push } from 'connected-react-router';
import {isValidEmailFormat, isValidRequiredInput} from "./utils";
import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";
import Cookies from "js-cookie"

export const signIn = () => {
  return async (dispatch:any) => {
    // ダミー処理
    dispatch(signInAction({
      isSignedIn: true,
      role: "LoginRole",
      userid: "LoginUserid",
      username: "LoginUser",
      email: "",
    }));

    dispatch(push("/"));
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
        return false
    }

    if(!isValidEmailFormat(email)) {
        alert('メールアドレスの形式が不正です。もう1度お試しください。')
        return false
    }
    if (password !== confirmPassword) {
        alert('パスワードが一致しません。もう1度お試しください。')
        return false
    }
    if (password.length < 6) {
        alert('パスワードは6文字以上で入力してください。')
        return false
    }

    const params: SignUpParams = {
      name: username,
      email: email,
      password: password,
      passwordConfirmation: confirmPassword
    }

    const client = applyCaseMiddleware(axios.create({
      baseURL: "http://localhost:3000/api/v1"}))

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      ignoreHeaders: true
    };

    // return client.post("auth/sign_in", params)
    return client.post("auth", params, config)
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

        dispatch(push("/signupsuccess"));
    }).catch(error => {
        // 失敗
        console.log("registration error", error)
        alert('アカウント登録に失敗しました。もう1度お試しください。')
    })
  }
}
