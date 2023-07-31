import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const list = JSON.parse(localStorage.getItem('userList'));

    useEffect(() => {
        setUsers(list);
    }, []);

    const handleCheckboxChange = (event, user) => {
        if (event.target) {
            const { checked } = event.target;

            if (checked) {
                setSelectedUsers((prevSelected) => [...prevSelected, user]);
            } else {
                setSelectedUsers((prevSelected) =>
                    prevSelected.filter((selectedUser) => selectedUser !== user)
                );
            }
        }
    };

    const handleSelectAll = (checked) => {
        setSelectAll(checked);

        if (checked) {
            setSelectedUsers([...users]);
        } else {
            setSelectedUsers([]);
        }
    };

    const handleDeleteSelected = () => {
        const filteredUsers = users.filter((user) => !selectedUsers.includes(user));
        setUsers(filteredUsers);
        localStorage.setItem('userList', JSON.stringify(filteredUsers));
        setSelectedUsers([]);
        setSelectAll(false);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter((user) => {
        const searchQuery = searchTerm.toLowerCase();
        const userName = user.name.toLowerCase();
        const userGender = user.gender.toLowerCase();
        const userDob = user.dob.toLowerCase();
        const userMobile = user.mobile.toLowerCase();

        return (
            userName.includes(searchQuery) ||
            userGender.includes(searchQuery) ||
            userDob.includes(searchQuery) ||
            userMobile.includes(searchQuery)
        );
    });

    return (
        <div className="list-container">
            <h1 className="list-heading">User List</h1>
            <div className='btn_container'>
                <Link to="/add" className='add_btn'>Add User</Link>
                <div className='search'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button
                    onClick={handleDeleteSelected}
                    disabled={selectedUsers.length === 0}
                    className="delete-button"
                >
                    Delete
                </button>
                </div>
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={() => handleSelectAll(!selectAll)}
                            />
                        </th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Mobile Number</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user)}
                                    onChange={(event) => handleCheckboxChange(event, user)}
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.gender}</td>
                            <td>{user.dob}</td>
                            <td>{user.mobile}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;
