import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { deleteContact, getContacts } from '../redux/operations';
import { filterContacts } from '../redux/actions/filterAction';
import { connect } from 'react-redux';
import Form from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import headerStyle from '../styles/header-style.module.css';
import '../styles/filterAnimation.css';
import style from '../styles/style.module.css';

class App extends React.Component {
  filteredContacts = (contacts, filter) => {
    return filter
      ? contacts.filter(el =>
          el.name.toLowerCase().includes(filter.toLowerCase()),
        )
      : contacts;
  };

  componentDidMount() {
    this.props.getContacts();
  }

  render() {
    const { contacts, filter, filterContacts } = this.props;
    contacts &&
      setTimeout(() => {
        contacts.length === 1 && filterContacts('');
      }, 1500);
    return (
      <div className={style.main}>
        <CSSTransition
          in={true}
          appear
          timeout={500}
          classNames={headerStyle}
          unmountOnExit
        >
          <h2 className={style.header}>Phonebook</h2>
        </CSSTransition>
        <Form />
        <h2 className={style.header}>Contacts</h2>
        {contacts.length ? (
          <CSSTransition
            in={contacts.length > 1}
            timeout={300}
            classNames="filter"
            unmountOnExit
          >
            <Filter
              value={filter}
              onChange={({ target }) => filterContacts(target.value)}
            />
          </CSSTransition>
        ) : (
          <p className={style.noContacts}>No contacts yet...</p>
        )}
        <TransitionGroup component="ul" className={style.list}>
          {this.filteredContacts(contacts, filter).map(elem => (
            <CSSTransition key={elem.id} timeout={250} classNames="form">
              <Contacts
                contact={elem}
                onDeleteContact={this.props.deleteContact}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    filter: state.filter,
  };
};

export default connect(mapStateToProps, {
  getContacts,
  filterContacts,
  deleteContact,
})(App);
