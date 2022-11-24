import { createReducer, on } from '@ngrx/store';
import { userGlobalStored } from 'src/app/Models/userGlobalStored';
import { addUserToGlobalStorageAfterLogin } from '../accion/user.accion';

const userStorage = JSON.parse(localStorage.getItem('user')!);
export const initialState: userGlobalStored = userStorage
  ? userStorage
  : {
      id: '',
      username: '',
      roles: [],
      teams: {
        id: '',
        name: '',
      },
    };

export const userLoginReducer = createReducer(
  initialState,
  on(addUserToGlobalStorageAfterLogin, (state, { user }) => ({
    id: user.id,
    username: user.username,
    roles: user.roles,
    teams: user.teams,
  }))
);
