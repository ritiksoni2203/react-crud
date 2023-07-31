import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    dob: '',
    mobile: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load user list from local storage on initial render
    const storedUsers = JSON.parse(localStorage.getItem('userList')) || [];
    setUsers(storedUsers);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (
      formData.name.trim() === '' ||
      formData.dob.trim() === '' ||
      formData.mobile.trim() === ''
    ) {
      setError('All fields are required.');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setError('Mobile number should be 10 digits only.');
      return;
    }

    const updatedUsers = [...users, formData];
    setUsers(updatedUsers);

    localStorage.setItem('userList', JSON.stringify(updatedUsers));

    setFormData({
      name: '',
      gender: 'male',
      dob: '',
      mobile: '',
    });
    setError('');

    // Navigate to the home page ("/") after adding the user
    navigate('/');
  };

  return (
    <div className="add-container">
      <h1 className="add-heading">Add User</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="add-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter user name"
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleInputChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleInputChange}
            />
            Female
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Enter mobile number"
            required
          />
        </div>
        <button className="add-button" onClick={handleAddUser}>Add User</button>
      </form>
      <Link to="/list" className="view-list-link">View User List</Link>
    </div>
  );
};

export default AddUser;
