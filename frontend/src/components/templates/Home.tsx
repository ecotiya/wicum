import React from 'react';
import { signIn, signOut, getUserId, getUserName, getEmail, isSignedInState, isAdminState } from '../../re-ducks/users/index';
import { InitialStateModel } from '../../re-ducks/store/types'
import { useSelector } from 'react-redux';

const Home = () => {

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
    </div>
  );
};

export default Home;
