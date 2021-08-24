// Storeの初期状態を記述
// アプリに必要なstateを全て記述し、別のファイルで使用可能なようにexportしておく。
import { InitialStateModel } from './types';

export const initialState:InitialStateModel = {
  // 下記、カテゴリ毎にre-ducksのディレクトリを切る。
  users: {
    isSignedIn: false,
    isAdmin: false,
    uid: "",
    name: "guest",
    email: "",
    image: "",
    avatarUrl: "",
  }
};
