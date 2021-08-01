// import React from 'react';
import { signIn, getUserId, getUserName } from '../../re-ducks/users/index';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>userId:{uid}</p>
      <p>userName:{username}</p>
      <button onClick={() => dispatch(signIn())}>SIGN IN</button>
    </div>
  );
};

export default Home;
