import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { filterContacts } from '../actions/filterAction';
import {
  addContactSuccess,
  getContactSuccess,
  deleteContactSuccess,
} from '../actions/contactActions';

export const contactReducer = createReducer([], {
  [getContactSuccess]: (state, action) => [...action.payload],
  [addContactSuccess]: (state, action) => [...state, action.payload],
  [deleteContactSuccess]: (state, action) => [
    ...state.filter(el => el.id !== action.payload),
  ],
});

export const filterReducer = createReducer('', {
  [filterContacts]: (state, action) => action.payload,
});

export const rootReducer = combineReducers({
  filter: filterReducer,
  contacts: contactReducer,
});
