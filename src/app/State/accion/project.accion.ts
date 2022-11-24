import { createAction, props } from '@ngrx/store';
import { ProjecetSelected } from 'src/app/Models/ProjectSelected';

export const SelectedProjectToGlobalStorage = createAction(
  '[project] change succesfull',
  props<{ project: ProjecetSelected }>()
);
