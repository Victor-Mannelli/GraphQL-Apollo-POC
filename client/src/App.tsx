/* eslint-disable @typescript-eslint/no-unused-vars */
import { CREATE_USER, DELETE_USER, GET_USERS, GET_USER_BY_ID } from './queries';
import { handleCreateUser, handleDeleteUser } from './utils/functions';
import { useQuery, useMutation } from '@apollo/client';
import { UpdateUserModal } from './components';
import { user_type } from './types';
import { useState } from 'react';
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
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  if (getUsersLoading) return <p> Loading... </p>
  if (getUsersError) return <p> Error: {getUsersError.message} </p>

  return (
    <main>
      <h1 className='title'> Create User </h1>
      <form className='createform' onSubmit={(e) => handleCreateUser(e, createUser)}>
        <input id='name' required type='text' placeholder='Name' />
        <input id='email' required type='text' placeholder='Email' />
        <input id='username' required type='text' placeholder='Username' />
        <input id='password' required type='password' placeholder='Password' />
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
              <div className='sideButtons'>
                <button onClick={() => {
                  setSelectedUserId(user.id.toString())
                  setShowUpdateModal(!showUpdateModal)
                }}>
                  Update
                </button>
                <button onClick={() => handleDeleteUser(user.id, deleteUser)}>
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
      {showUpdateModal
        ? <UpdateUserModal userId={selectedUserId} show={showUpdateModal} setShow={setShowUpdateModal} />
        : null
      }
    </main>
  )
}

export default App