import { createSelector } from 'reselect';
import { InitialStateModel } from '../store/types';

const usersSelector = (state:InitialStateModel) => state.users;

export const getUserId = createSelector (
  [usersSelector],
  state => state.userid
)

export const getUserName = createSelector (
  [usersSelector],
  state => state.username
)

export const getSignedIn = createSelector (
  [usersSelector],
  state => state.isSignedIn
)
