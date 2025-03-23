import { Dispatch, SetStateAction, useRef } from "react";
import { handleUpdateUser } from "../utils/functions";
import { UpdateUserType, UserType } from "../types";
import { useOnClickOutside } from 'usehooks-ts';
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../queries";

export function UpdateUserModal({ show, setShow, user }: {
  setShow: Dispatch<SetStateAction<boolean>>;
  user: UserType | null;
  show: boolean;
}) {
  const [updateUser] = useMutation<UserType, UpdateUserType>(UPDATE_USER);
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setShow(false))

  if (!user) return null;
  return (
    <div className={`${show ? "modal" : ""}`}>
      <div
        className='modalContent'
        ref={ref}
      >
        <h1 className="title"> Update user </h1>
        <form className="updateForm" onSubmit={(e) => {
          handleUpdateUser({
            e,
            updateUser,
            userId: user.id.toString(),
            closeModal: () => setShow(false),
          })
        }}>
          <label htmlFor='name'> Name </label>
          <input id='name' type='text' placeholder={user.name} />
          <label htmlFor='email'> Email </label>
          <input id='email' type='text' placeholder={user.email} />
          <label htmlFor='username'> Username </label>
          <input id='username' type='text' placeholder={user.username} />
          <div>
            <button className='' type='submit'> Update user </button>
            <button onClick={() => setShow(false)}> Close </button>
          </div>
        </form>
      </div>
    </div >
  )
}
