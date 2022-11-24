import { createAction, props } from '@ngrx/store';
import { userGlobalStored } from 'src/app/Models/userGlobalStored';

export const addUserToGlobalStorageAfterLogin = createAction(
  '[user] login succesfull',
  props<{ user: userGlobalStored }>()
);
