/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_USERS } from "../queries";

export const handleCreateUser = async (
  e: React.FormEvent<HTMLFormElement>,
  createUser: any
) => {
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

export const handleUpdateUser = async (
  e: React.FormEvent<HTMLFormElement>,
  updateUser: any,
  userId: string,
  closeModal: () => void,
) => {
  try {
    e.preventDefault()
    const form = e.target as HTMLFormElement;
    const variables: Record<string, any> = {};
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
    const username = (form.elements.namedItem('username') as HTMLInputElement)?.value;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;

    variables.id = userId;
    if (name) variables.name = name;
    if (username) variables.username = username;
    if (email) variables.email = email;
    if (password) variables.password = password;

    await updateUser({
      variables,
      refetchQueries: [{ query: GET_USERS }]
    });
    closeModal();
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

export const handleDeleteUser = async (
  id: number,
  deleteUser: any,
) => {
  try {
    await deleteUser({
      variables: { id: id.toString() },
      refetchQueries: [{ query: GET_USERS }]
    });
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}
