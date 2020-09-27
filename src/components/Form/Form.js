import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { addContact } from '../../redux/operations';
import style from '../../styles/style.module.css';
import { CSSTransition } from 'react-transition-group';

const Form = props => {
  const [state, setState] = useState({ name: '', number: '' });
  const [notification, setNotification] = useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();
    if (state.name && state.number) {
      if (props.contacts.find(elem => elem.name === state.name)) {
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
        }, 2500);
      } else {
        props.addContact({ id: uuidv4(), ...state });
        setState({ name: '', number: '' });
      }
    } else {
      alert('Fill all fields!');
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setState(state => ({ ...state, [name]: value }));
  };

  return (
    <>
      <CSSTransition
        in={notification}
        timeout={500}
        classNames="notification"
        unmountOnExit
      >
        <div className={style.existNotification}>
          This name is already exist
        </div>
      </CSSTransition>
      <form onSubmit={handleSubmit} className={style.form}>
        <label className={style.formLabel}>
          Name
          <input
            className={style.formInput}
            type="text"
            placeholder="Enter name"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label className={style.formLabel}>
          Number
          <input
            className={style.formInput2}
            type="text"
            placeholder="Enter number"
            name="number"
            value={state.number}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={style.addButton}>
          Add contact
        </button>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  contacts: state.contacts,
  notification: state.notification,
});

export default connect(mapStateToProps, { addContact })(Form);
