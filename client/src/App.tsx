import { CREATE_USER, DELETE_USER, GET_USERS, GET_USER_BY_ID } from './queries';
import { useQuery, useMutation } from '@apollo/client';
import { user_type } from './types';
import React from 'react';
import './App.css'

function App() {
  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);
  const {
    data: getUserData,
    error: getUserError,
    loading: getUserLoading,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: "2" }
  });
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  if (getUsersLoading) return <p> Loading... </p>
  if (getUsersError) return <p> Error: {getUsersError.message} </p>

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const form = e.target as HTMLFormElement;
      const name = (form.elements.namedItem('name') as HTMLInputElement).value;
      const username = (form.elements.namedItem('username') as HTMLInputElement).value;
      const email = (form.elements.namedItem('email') as HTMLInputElement).value;
      const password = (form.elements.namedItem('password') as HTMLInputElement).value;

      await createUser({
        variables: {
          name, email, username, password, isAdmin: false,
        },
        refetchQueries: [{ query: GET_USERS }]
      })
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser({
        variables: { id: id.toString() },
        refetchQueries: [{ query: GET_USERS }]
      });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <main>
      <h1 className='title'> Create User </h1>
      <form onSubmit={handleCreateUser}>
        <input id='name' type='text' placeholder='Name' />
        <input id='email' type='text' placeholder='Email' />
        <input id='username' type='text' placeholder='Username' />
        <input id='password' type='password' placeholder='Password' />
        <button className='submitButton' type='submit'> Create user </button>
      </form>
      <h1 className='title'> Fetch users </h1>
      <div className='parentCard'>
        {getUserError
          ? <p> Error: {getUserError.message} </p>
          : getUserLoading ? <p> Loading specific user... </p>
            : (
              <>
                <h2> Find one by id: 2 </h2>
                <div className='card'>
                  <p> Id: {getUserData.getUserById.id} </p>
                  <p> Name: {getUserData.getUserById.name} </p>
                  <p> Email: {getUserData.getUserById.email} </p>
                  <p> Position: {getUserData.getUserById.isAdmin ? 'Admin' : 'User'} </p>
                </div>
              </>
            )}
      </div>
      <div className='parentCard'>
        <h2> Find all: </h2>
        {getUsersData.getUsers.map((user: user_type) => {
          return (
            <div className='card' key={user.id}>
              <p> Id: {user.id} </p>
              <p> Name: {user.name} </p>
              <p> Email: {user.email} </p>
              <p> Position: {user.isAdmin ? 'Admin' : 'User'} </p>
              <button
                className='deleteButton'
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default App