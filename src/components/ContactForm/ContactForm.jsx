import React, { useState } from 'react';
import css from './ContactForm.module.css';
import {
  useAddContactMutation,
  useGetContactsApiQuery,
} from 'redux/contactsApi'

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addContact] = useAddContactMutation();
  const { data } =  useGetContactsApiQuery();

  const handleChange = evt => {
    const prop = evt.currentTarget.name;
    switch (prop) {
      case 'name':
        setName(evt.currentTarget.value);
        break;
      case 'phone':
        setPhone(evt.currentTarget.value);
        break;
      default:
        throw new Error('Error');
    }
  };

  const handleAddContact = async evt => {
    evt.preventDefault();
    if (
      data.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    ) {
      setName('');
      setPhone('');
      return alert(`Number: ${name} is already in phonebook`);
    }
    if (name && phone) {
      await addContact({ name: name, phone: phone }).unwrap();
      setName('');
      setPhone('');
    }
  };

  return (
    <form className={css.form} onSubmit={handleAddContact}>
      <label>
        Name
        <input
          className={css.inputName}
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input
          className={css.inputNumber}
          value={phone}
          onChange={handleChange}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
}
