import { initialStateModel } from './types';

const initialState:initialStateModel = {

  users: {
    isSignedIn: false,
    role:  "",
    uid: "",
    username: "guest"
  }
};

export default initialState;
