import { createSelector } from '@ngrx/store';
import { ProjecetSelected } from 'src/app/Models/ProjectSelected';
import { AppState } from '../app.state';

export const selectUserFeature = (state: AppState) => state.project;

export const selectProject = createSelector(
  selectUserFeature,
  (state: ProjecetSelected) => state
);
