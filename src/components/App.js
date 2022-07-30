import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactForm/ContactList';
import data from './Data/contacts.json';
import ContactForm from './ContactForm/ContactForm';
import ContactFilter from './ContactForm/ContactFilter';
import s from './ContactForm/contactForm.module.css';

function App() {
  const [contacts, setContacts] = useState(data);
  const [filter, setFilter] = useState('');

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const addContact = ({ id, name, number }) => {
    const todo = {
      id: nanoid(),
      name,
      number,
    };
    const normalaze = contacts.find(
      e => e.name === name || e.number === number
    );
    normalaze
      ? alert(`${name} is already in contacts ${number}`)
      : setContacts([todo, ...contacts]);
  };

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, [setContacts]);

  useEffect(() => {
    if (contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const normalizeFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );
  return (
    <div className={s.container}>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={filterContacts} onSubmitAdd={addContact} />
      <h2>Contacts</h2>
      <ContactFilter value={filter} onChange={changeFilter} />
      <ContactList contacts={filterContacts} ondeleteContact={deleteContact} />
    </div>
  );
}
export default App;
