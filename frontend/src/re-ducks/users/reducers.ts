import * as Actions from './actions';
import { UsersAction } from './types';
import initialState from '../store/initialState';

// 第1引数:state…現在のstoreの状態を受け取るが、なければ初期値としてinitialState.usersの値を受け取る。
// 第2引数:actionsでreturnしたオブジェクトリテラル。
export const UsersReducer = (state = initialState.users, action:UsersAction) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        // 「...」はスプレット構文、オブジェクトの中身を展開してreturnしている。
        // そのため、stateの中身やaction.payloadで定義した中身をいちいち記述しなくてよくなる。
        // 展開したオブジェクトリテラル(stateとaction.paylaod)に同一フィールド名が含まれる場合、後に書いた方(action.payload)に値が上書きされる。
        // stateには存在するが、action.payloadには存在しない項目があり、stateをコメントアウトとしてreturnすると、その項目は出力されない。
        ...state,
        ...action.payload
      };
    case Actions.SIGN_OUT:
     return {
       ...action.payload
     };
    default:
      return state;
  }
}
