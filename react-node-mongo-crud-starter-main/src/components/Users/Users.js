import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);
    //DELETE AN UseR
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure ,you want to delete');
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                mathod: 'DELETE'
            })
                .then(res => res.json())
                .thne(data => {
                    if (data.deletedCount > 0) {
                        alert('Deleted Sucessfully');
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    }
                })
        }
    }
    return (
        <div>
            <h2>users:{users.length}</h2>
            <ul>
                {
                    users.map(user => <li
                        key={user._id}
                    >{user.name} :: {user.email}
                        <Link to={`/users/update/${user._id}`}><button>Update</button></Link>
                        <button onClick={() => handleDelete(user._id)}>X</button>
                    </li>)
                }
            </ul>
        </div >
    );
};

export default Users;