import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [user, setUser] = useState({
    name: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in user.address) {
      setUser({ ...user, address: { ...user.address, [name]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/submit', user);
      setMessage('User and address added successfully!');
      setUser({
        name: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      });
    } catch (error) {
      setMessage('Error submitting the form.');
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md mt-10">
      <h2 className="text-xl font-bold mb-4">User Address Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="street">
            Street
          </label>
          <input
            type="text"
            name="street"
            value={user.address.street}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="city">
            City
          </label>
          <input
            type="text"
            name="city"
            value={user.address.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="state">
            State
          </label>
          <input
            type="text"
            name="state"
            value={user.address.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="zipCode">
            Zip Code
          </label>
          <input
            type="text"
            name="zipCode"
            value={user.address.zipCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
    </div>
  );
};

export default Form;
