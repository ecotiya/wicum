import { InitialStateModel } from './types';

const initialState:InitialStateModel = {

  users: {
    isSignedIn: false,
    role:  "",
    uid: "",
    username: "guest"
  }
};

export default initialState;
