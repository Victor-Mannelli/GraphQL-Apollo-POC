import { CREATE_USER, DELETE_USER, GET_USERS, GET_USER_BY_ID } from './queries';
import { handleCreateUser, handleDeleteUser } from './utils/functions';
import { useCallback, useMemo, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UpdateUserModal } from './components';
import { CreateUserType, UserType } from './types';
import './App.css'

function App() {
  const { data: getUsersData, error: getUsersError, loading: getUsersLoading } = useQuery(GET_USERS);
  const { data: getUserData, error: getUserError, loading: getUserLoading } = useQuery(GET_USER_BY_ID, {
    variables: { id: "2" }
  });
  const [createUser] = useMutation<UserType, CreateUserType>(CREATE_USER);
  const [deleteUser] = useMutation<UserType, { id: string }>(DELETE_USER);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const handleDelete = useCallback((id: number) => handleDeleteUser(id, deleteUser), [deleteUser]);
  const handleCreate = useCallback((e: React.FormEvent<HTMLFormElement>) => handleCreateUser(e, createUser), [createUser]);

  const updateUserModal = useMemo(() => {
    return showUpdateModal ? (
      <UpdateUserModal
        user={selectedUser}
        show={showUpdateModal}
        setShow={setShowUpdateModal}
      />
    ) : null;
  }, [showUpdateModal, selectedUser]);

  const specificUserCard = useMemo(() => {
    if (getUserLoading) return <p> Loading specific user... </p>;
    if (getUserError) return <p> Error: {getUserError.message} </p>;
    const user = getUserData.getUserById;
    return (
      <>
        <h2> Find one by id: 2 </h2>
        <div className='card'>
          <p> Id: {user.id} </p>
          <p> Name: {user.name} </p>
          <p> Username: {user.username} </p>
          <p> Email: {user.email} </p>
          <p> Position: {user.isAdmin ? 'Admin' : 'User'} </p>
        </div>
      </>
    );
  }, [getUserLoading, getUserError, getUserData]);

  if (getUsersLoading) return <p> Loading... </p>
  if (getUsersError) return <p> Error: {getUsersError.message} </p>

  return (
    <main>
      <h1 className='title'> Create User </h1>
      <form className='createform' onSubmit={(e) => handleCreate(e)}>
        <input id='name' required type='text' placeholder='Name' />
        <input id='email' required type='text' placeholder='Email' />
        <input id='username' required type='text' placeholder='Username' />
        <input id='password' required type='password' placeholder='Password' />
        <button className='submitButton' type='submit'> Create user </button>
      </form>
      <h1 className='title'> Fetch users </h1>
      <div id='findByIdCard' className='parentCard'>
        {getUserError
          ? <p> Error: {getUserError.message} </p>
          : getUserLoading ? <p> Loading specific user... </p>
            : specificUserCard
        }
      </div>
      <div className='parentCard'>
        <h2> Find all: </h2>
        {getUsersData.getUsers.map((user: UserType) => {
          return (
            <div className='card' key={user.id}>
              <p> Id: {user.id} </p>
              <p> Name: {user.name} </p>
              <p> Username: {user.username} </p>
              <p> Email: {user.email} </p>
              <p> Position: {user.isAdmin ? 'Admin' : 'User'} </p>
              <div className='sideButtons'>
                <button onClick={() => {
                  setSelectedUser(user)
                  setShowUpdateModal(!showUpdateModal)
                }}>
                  Update
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
      {updateUserModal}
    </main>
  )
}

export default App