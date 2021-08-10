import { UserState } from './types';

// ActionTyoeを定義してexport
export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState:UserState) => {
  // オブジェクトリテラル(1.全体を{}で囲う 2.{]に:で区切ったkeyとvalueのペアを記述 3.キーと値のペアが複数ある場合は,で区切る。})をreturnする。
  return {
    // tyoeとpayloadを記述する。
    type: "SIGN_IN",
    payload: userState
  }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      isAdmin: false,
      uid: "",
      name: "",
      email: "",
      image: "",
    }
  }
};
