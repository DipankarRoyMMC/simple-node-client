import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));

  }, []);

  const handleAddUser = event => {
    event.preventDefault();
    console.log('Form submitting!!');

    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);

        console.log(data);
      })


      .catch((error) => {
        console.error('Error', error);
      });

    event.target.reset();

  }

  return (
    <div className="App">
      <h1>Welcome Simple Node Client</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='Enter your name' />
        <br></br>
        <input type="email" name="email" placeholder='Enter email address' />
        <br></br>
        <input type="submit" value="Submit" />
      </form>

      <h2>Users: {users.length}</h2>
      {
        users.map(user => <li key={user._id}>{user.name}, {user.email}</li>)
      }


    </div>
  );
}

export default App;
