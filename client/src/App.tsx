/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, GET_USER_BY_ID } from './queries';
import { user_type } from './types';
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

  if (getUsersLoading) return <p> Loading... </p>
  if (getUsersError) return <p> Error: {getUsersError.message} </p>

  return (
    <main>
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
            <>
              <div className='card' key={user.id}>
                <p> Id: {user.id} </p>
                <p> Name: {user.name} </p>
                <p> Email: {user.email} </p>
                <p> Position: {user.isAdmin ? 'Admin' : 'User'} </p>
              </div>
            </>
          )
        })}
      </div>
    </main>
  )
}

export default App