import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../firebase'; // Adjust the path as per your directory structure
import './Support.css';

const Support = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactRef = ref(database, 'contacts');
    push(contactRef, formData)
      .then(() => {
        setFormSubmitted(true);
      })
      .catch((error) => {
        console.error('Error storing contact message:', error);
      });
  };

  return (
    <div className="support-container">
      <h2>Support</h2>
      <p>If you need any help, please fill out the form below:</p>
      <div className="contact-form">
        {formSubmitted ? (
          <p>Thank you for your message. We will get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </label>
            <label>
              Message:
              <textarea name="message" value={formData.message} onChange={handleInputChange} required></textarea>
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Support;
