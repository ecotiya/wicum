import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { InitialStateModel } from '../../re-ducks/store/types'
import { isSignedInState, listenAuthState, listenAuthBrowserBack } from '../../re-ducks/users/index';

type Props = {
  children?: React.ReactNode;
};

const Auth = ({children}:any) => {
  const dispatch = useDispatch();
  const selector = useSelector((state:InitialStateModel) => state);
  const isSignedIn = isSignedInState(selector);
  const nowLocation = useLocation();
  const [ locationKeys, setLocationKeys ] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  },[dispatch, isSignedIn]);

  useEffect(() => {
    return history.listen(location => {
      if (history.action === 'PUSH') {
        setLocationKeys([ location.key ])
      }

      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([ _, ...keys ]) => keys)
          // Handle forward event
          dispatch(listenAuthBrowserBack(location.pathname));

        } else {
          setLocationKeys((keys) => [ location.key, ...keys ])
          // Handle back event
          dispatch(listenAuthBrowserBack(location.pathname));

        }
      }
    })
  }, [ locationKeys, ])

  return  children;
}

export default Auth;
