import { ActionReducerMap } from '@ngrx/store';
import { ProjecetSelected } from '../Models/ProjectSelected';
import { userGlobalStored } from '../Models/userGlobalStored';
import { userLoginReducer } from './Reducers/user.reducer';
import { projectSelectedReducer } from './Reducers/project.reducer';

export interface AppState {
  user: userGlobalStored;
  project: ProjecetSelected;
}

export const ROOT_REDUCER: ActionReducerMap<AppState> = {
  user: userLoginReducer,
  project: projectSelectedReducer,
};
