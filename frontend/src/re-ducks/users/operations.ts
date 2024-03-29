import Cookies from "js-cookie"
import { push } from 'connected-react-router';
import { signInAction, signOutAction } from "./index";
import { SignInParams, SignUpParams, UserData, AvatarParams, UserInfoUpdateParams } from "./types";
import {isValidEmailFormat, isValidRequiredInput, isNonMemberPages, client, unauth_client_config, logined_client_config, picture_send_client_config} from "./utils";
import {ReactRoutesPath, RailsRoutesPath, CookieKeys} from '../../constants/commonConstants';

// ヘッダーロゴクリック制御処理
export const listenAuthHeaderLogoClick = () => {
  return async (dispatch:any) => {
    if (Cookies.get(CookieKeys.ACCESS_TOKEN)) {
      dispatch(push(ReactRoutesPath.HOME));
    } else {
      dispatch(push(ReactRoutesPath.SIGN_IN));
    }
  }
}

// ブラウザバック制御処理
export const listenAuthBrowserBack = (pathname:string) => {
  return async (dispatch:any) => {
    if (Cookies.get(CookieKeys.ACCESS_TOKEN) && isNonMemberPages(pathname)) {
      // 認証後に、認証前ページへ移動しようとした場合、強制的に認証後のディレクトリに移動させる。
      dispatch(push(ReactRoutesPath.HOME));
    } else if (!Cookies.get(CookieKeys.ACCESS_TOKEN) && !isNonMemberPages(pathname)) {
      // 未認証の場合は、ログインページへ強制送還。
      dispatch(push(ReactRoutesPath.SIGN_IN));
    }
  }
}

// 認証監視処理
export const listenAuthState = (pathname:string) => {
  return async (dispatch:any) => {
    if (Cookies.get(CookieKeys.ACCESS_TOKEN)) {
      // 認証済みの場合
      client.get(RailsRoutesPath.SESSION, logined_client_config)
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
          avatarUrl: userdata.avatarUrl,
        }));

      }).catch(error => {
          console.log("registration error", error)
      })

    } else {
      // 認証されていない場合
      if (!isNonMemberPages(pathname)) {
        dispatch(push(ReactRoutesPath.SIGN_IN));
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

    return client.post(RailsRoutesPath.SIGN_IN, params, unauth_client_config)
    .then(response => {
        // 成功
        console.log("registration res", response)
        Cookies.set(CookieKeys.ACCESS_TOKEN, response.headers["accessToken"])
        Cookies.set(CookieKeys.CLIENT, response.headers["client"])
        Cookies.set(CookieKeys.UID, response.headers["uid"])
        const userdata:UserData = response.data.data;

        dispatch(signInAction({
          isSignedIn: true,
          isAdmin: userdata.isAdmin,
          uid: userdata.uid,
          name: userdata.name,
          email: userdata.email,
          image: userdata.image,
          avatarUrl: userdata.avatarUrl,
        }));

        dispatch(push(ReactRoutesPath.HOME));
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

    return client.post(RailsRoutesPath.SIGN_UP, params, unauth_client_config)
    .then(response => {
        // 成功
        console.log("registration res", response)
        Cookies.set(CookieKeys.ACCESS_TOKEN, response.headers["accessToken"])
        Cookies.set(CookieKeys.CLIENT, response.headers["client"])
        Cookies.set(CookieKeys.UID, response.headers["uid"])
        const userdata:UserData = response.data.data;

        dispatch(signInAction({
          isSignedIn: true,
          isAdmin: userdata.isAdmin,
          uid: userdata.uid,
          name: userdata.name,
          email: userdata.email,
          image: userdata.image,
          avatarUrl: userdata.avatarUrl,
        }));

        dispatch(push(ReactRoutesPath.HOME));
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
    return client.delete(RailsRoutesPath.SIGN_OUT, logined_client_config)
    .then(response => {
        // 成功
        console.log("registration res", response);
        Cookies.remove(CookieKeys.ACCESS_TOKEN);
        Cookies.remove(CookieKeys.CLIENT);
        Cookies.remove(CookieKeys.UID);

        dispatch(signOutAction());
        dispatch(push(ReactRoutesPath.SIGN_IN));
    }).catch(error => {
        // 失敗
        console.log("registration error", error)
        alert('サインアウト処理に失敗しました。管理者にお問い合わせください。')
    })
  }
}

// ユーザ画像更新
export const userAvatarUpdate = (avatar:FormData) => {
  return async (dispatch:any) => {
    // 画像に関するバリデーションやサイズチェックはRails側で実施。
    return client.put(RailsRoutesPath.USER_INFO_UPDATE, avatar, picture_send_client_config)
    .then(response => {
        // 成功
        console.log("registration res", response)
        Cookies.set(CookieKeys.ACCESS_TOKEN, response.headers["accessToken"])
        Cookies.set(CookieKeys.CLIENT, response.headers["client"])
        Cookies.set(CookieKeys.UID, response.headers["uid"])
        const userdata:UserData = response.data.data;

        dispatch(signInAction({
          isSignedIn: true,
          isAdmin: userdata.isAdmin,
          uid: userdata.uid,
          name: userdata.name,
          email: userdata.email,
          image: userdata.image,
          avatarUrl: userdata.avatarUrl,
        }));

        confirm('ユーザ画像を更新しました。')
    }).catch(error => {
        // 失敗
        console.log("registration error", error)
        alert('ユーザ画像の更新に失敗しました。')
    })
  }
}

// ユーザ情報更新
export const userInfoUpdate = (username:string, email:string) => {
  return async (dispatch:any) => {
    // Validations
    if(!isValidRequiredInput(username, email)) {
        alert('必須項目が未入力です。');
        return false;
    }

    if(!isValidEmailFormat(email)) {
        alert('メールアドレスの形式が不正です。もう1度お試しください。');
        return false;
    }

    const params: UserInfoUpdateParams = {
      name: username,
      email: email
    }

    return client.put(RailsRoutesPath.USER_INFO_UPDATE, params, logined_client_config)
    .then(response => {
        // 成功
        console.log("registration res", response)
        Cookies.set(CookieKeys.ACCESS_TOKEN, response.headers["accessToken"])
        Cookies.set(CookieKeys.CLIENT, response.headers["client"])
        Cookies.set(CookieKeys.UID, response.headers["uid"])
        const userdata:UserData = response.data.data;

        dispatch(signInAction({
          isSignedIn: true,
          isAdmin: userdata.isAdmin,
          uid: userdata.uid,
          name: userdata.name,
          email: userdata.email,
          image: userdata.image,
          avatarUrl: userdata.avatarUrl,
        }));

        confirm('ユーザ情報を更新しました。')
    }).catch(error => {
        // 失敗
        console.log("registration error", error)
        alert('ユーザ情報の更新に失敗しました。')
    })
  }
}
