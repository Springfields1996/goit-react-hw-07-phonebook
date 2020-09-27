import { createAction } from '@reduxjs/toolkit';
import { FILTER_CONTACTS } from '../types';

export const filterContacts = createAction(FILTER_CONTACTS);
