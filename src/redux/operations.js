import axios from 'axios';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  getContactRequest,
  getContactSuccess,
  getContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from './actions/contactActions';

axios.defaults.baseURL = 'http://localhost:3000';

export const getContacts = () => dispatch => {
  dispatch(getContactRequest());

  axios
    .get('/contacts')
    .then(({ data }) => dispatch(getContactSuccess(data)))
    .catch(error => dispatch(getContactError(error)));
};

export const addContact = contact => dispatch => {
  dispatch(addContactRequest());
  axios
    .post('./contacts', contact)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch(error => dispatch(addContactError(error)));
};

export const deleteContact = id => dispatch => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(deleteContactSuccess(id)))
    .catch(error => dispatch(deleteContactError(error)));
};
