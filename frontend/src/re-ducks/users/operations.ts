import Cookies from "js-cookie"
import { push } from 'connected-react-router';
import { signInAction, signOutAction } from "./index";
import { SignInParams, SignUpParams, UserData } from "./types";
import {isValidEmailFormat, isValidRequiredInput, isNonMemberPages, client, client_config} from "./utils";
import {RoutesPath} from '../../constants/commonConstants';

// ヘッダーロゴクリック制御処理
export const listenAuthHeaderLogoClick = () => {
  return async (dispatch:any) => {
    if (Cookies.get("_access_token")) {
      dispatch(push(RoutesPath.HOME));
    } else {
      dispatch(push(RoutesPath.SIGN_IN));
    }
  }
}

// ブラウザバック制御処理
export const listenAuthBrowserBack = (pathname:string) => {
  return async (dispatch:any) => {
    if (Cookies.get("_access_token") && isNonMemberPages(pathname)) {
      // 認証後に、認証前ページへ移動しようとした場合、強制的に認証後のディレクトリに移動させる。
      dispatch(push(RoutesPath.HOME));
    } else if (!Cookies.get("_access_token") && !isNonMemberPages(pathname)) {
      // 未認証の場合は、ログインページへ強制送還。
      dispatch(push(RoutesPath.SIGN_IN));
    }
  }
}

// 認証監視処理
export const listenAuthState = (pathname:string) => {
  return async (dispatch:any) => {
    if (Cookies.get("_access_token")) {
      // 認証済みの場合
      client.get('auth/sessions', {
        headers: {
          'access-token': Cookies.get("_access_token"),
          'client': Cookies.get("_client"),
          'uid': Cookies.get("_uid")
        }
      })
      .then((response) => {
        console.log("registration res", response);
        const userdata:UserData = response.data.data;

        dispatch(signInAction({
          isSignedIn: true,
          isAdmin: userdata.isAdmin,
          uid: userdata.uid,
          name: userdata.name,
          email: userdata.email,
          image: userdata.image,
        }));

      }).catch(error => {
          console.log("registration error", error)
      })

    } else {
      // 認証されていない場合
      if (!isNonMemberPages(pathname)) {
        dispatch(push(RoutesPath.SIGN_IN));
      }
    }
  }
}

// サインイン
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
        Cookies.set("_access_token", response.headers["accessToken"])
        Cookies.set("_client", response.headers["client"])
        Cookies.set("_uid", response.headers["uid"])
        const userdata:UserData = response.data.data;

        dispatch(signInAction({
          isSignedIn: true,
          isAdmin: userdata.isAdmin,
          uid: userdata.uid,
          name: userdata.name,
          email: userdata.email,
          image: userdata.image,
        }));

        dispatch(push(RoutesPath.HOME));
    }).catch(error => {
        // 失敗
        console.log("registration error", error)
        alert('サインイン処理に失敗しました。メールアドレス及びパスワードをご確認ください。')
    })
  }
}

// サインアップ
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
        Cookies.set("_access_token", response.headers["accessToken"])
        Cookies.set("_client", response.headers["client"])
        Cookies.set("_uid", response.headers["uid"])
        const userdata:UserData = response.data.data;

        dispatch(signInAction({
          isSignedIn: true,
          isAdmin: userdata.isAdmin,
          uid: userdata.uid,
          name: userdata.name,
          email: userdata.email,
          image: userdata.image,
        }));

        dispatch(push(RoutesPath.HOME));
    }).catch(error => {
        // 失敗
        console.log("registration error", error)
        alert('アカウント登録に失敗しました。もう1度お試しください。')
    })
  }
}

// サインアウト
export const signOut = () => {
  return async (dispatch:any) => {
    return client.delete("auth/sign_out", {
      headers: {
        'access-token': Cookies.get("_access_token"),
        'client': Cookies.get("_client"),
        'uid': Cookies.get("_uid")
      }
    })
    .then(response => {
        // 成功
        console.log("registration res", response);
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        dispatch(signOutAction());
        dispatch(push(RoutesPath.SIGN_IN));
    }).catch(error => {
        // 失敗
        console.log("registration error", error)
        alert('サインアウト処理に失敗しました。管理者にお問い合わせください。')
    })
  }
}
