import React from 'react';
import { signIn, signOut, getUserId, getUserName } from '../../re-ducks/users/index';
import { InitialStateModel } from '../../re-ducks/store/types'
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();
  const selector = useSelector((state: InitialStateModel) => state);
  const userid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>userId:{userid}</p>
      <p>userName:{username}</p>
    </div>
  );
};

export default Home;
