import React from 'react';
import { signIn, signOut, getUserId, getUserName, getEmail, isSignedInState, isAdminState } from '../../re-ducks/users/index';
import { InitialStateModel } from '../../re-ducks/store/types'
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: InitialStateModel) => state);
  const userid = getUserId(selector);
  const username = getUserName(selector);
  const email = getEmail(selector);
  const isSignedIn = isSignedInState(selector);
  const isAdmin = isAdminState(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>userId:{userid}</p>
      <p>userName:{username}</p>
      <p>email:{email}</p>
      <p>isSignedIn:{isSignedIn}</p>
      <p>isAdmin:{isAdmin}</p>
      <button onClick={() => dispatch(signOut())}>サインアウト</button>
    </div>
  );
};

export default Home;
