import { InitialStateModel } from './types';

const initialState:InitialStateModel = {

  users: {
    isSignedIn: false,
    role:  "",
    userid: "",
    username: "guest"
  }
};

export default initialState;
