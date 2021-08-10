import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InitialStateModel } from './re-ducks/store/types'
import { isSignedInState, listenAuthState } from './re-ducks/users/index';

type Props = {
  children?: React.ReactNode;
};

const Auth = ({children}:any) => {
  const dispatch = useDispatch();
  const selector = useSelector((state:InitialStateModel) => state);
  const isSignedIn = isSignedInState(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  },[]);

  if (!isSignedIn) {
    return <></>
  } else {
    return  children;
  }
}

export default Auth;
