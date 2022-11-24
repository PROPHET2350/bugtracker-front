import { createSelector } from '@ngrx/store';
import { userGlobalStored } from 'src/app/Models/userGlobalStored';
import { AppState } from '../app.state';

export const selectUserFeature = (state: AppState) => state.user;

export const selectUsersTeam = createSelector(
  selectUserFeature,
  (state: userGlobalStored) => state.teams
);
export const selectUsers = createSelector(
  selectUserFeature,
  (state: userGlobalStored) => state
);
