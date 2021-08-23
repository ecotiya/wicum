// storeで管理しているstateを参照する関数集合体
import { createSelector } from 'reselect';
import { InitialStateModel } from '../store/types';

const usersSelector = (state:InitialStateModel) => state.users;

export const getUserId = createSelector (
  [usersSelector],
  state => state.uid
)

export const getUserName = createSelector (
  [usersSelector],
  state => state.name
)

export const getEmail = createSelector (
  [usersSelector],
  state => state.email
)

export const getImage = createSelector (
  [usersSelector],
  state => state.image
)

export const isSignedInState = createSelector (
  [usersSelector],
  state => state.isSignedIn
)

export const isAdminState = createSelector (
  [usersSelector],
  state => state.isAdmin
)
