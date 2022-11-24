import { createReducer, on } from '@ngrx/store';
import { ProjecetSelected } from 'src/app/Models/ProjectSelected';
import { SelectedProjectToGlobalStorage } from '../accion/project.accion';

const projectStorage = JSON.parse(localStorage.getItem('project')!);
export const initialState: ProjecetSelected = projectStorage
  ? projectStorage
  : {
      id: '',
      name: '',
    };

export const projectSelectedReducer = createReducer(
  initialState,
  on(SelectedProjectToGlobalStorage, (state, { project }) => ({
    id: project.id,
    name: project.name,
  }))
);
