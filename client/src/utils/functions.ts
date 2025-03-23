import { CreateUserType, UpdateUserType, UserType } from "../types";
import { MutationFunction } from "@apollo/client";
import { GET_USERS } from "../queries";

export const handleCreateUser = async (
  e: React.FormEvent<HTMLFormElement>,
  createUser: MutationFunction<UserType, CreateUserType>,
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

export const handleUpdateUser = async ({
  e, updateUser, userId, closeModal
}: {
  e: React.FormEvent<HTMLFormElement>,
  userId: string,
  closeModal: () => void,
  updateUser: MutationFunction<UserType, UpdateUserType>
}) => {
  try {
    if (!userId) throw new Error("No user id provided");
    e.preventDefault()
    const form = e.target as HTMLFormElement;
    const variables: UpdateUserType = { id: userId };
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
    const username = (form.elements.namedItem('username') as HTMLInputElement)?.value;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;

    if (name) variables.name = name;
    if (username) variables.username = username;
    if (email) variables.email = email;

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
  deleteUser: MutationFunction<UserType, { id: string }>
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
