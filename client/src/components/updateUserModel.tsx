import { Dispatch, SetStateAction, useRef } from "react";
import { handleUpdateUser } from "../utils/functions";
import { useOnClickOutside } from 'usehooks-ts';
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../queries";

export function UpdateUserModal({ show, setShow, userId }: {
  setShow: Dispatch<SetStateAction<boolean>>;
  userId: string | null;
  show: boolean;
}) {
  const [updateUser] = useMutation(UPDATE_USER);
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setShow(false))

  if (!userId) return null;
  return (
    <div className={`${show ? "modal" : ""}`}>
      <div
        className='modalContent'
        ref={ref}
      >
        <h1 className="title"> Update user </h1>
        <form className="updateForm" onSubmit={(e) => {
          handleUpdateUser(e, updateUser, userId, () => setShow(false))

        }}>
          <label htmlFor='name'> Name </label>
          <input id='name' type='text' placeholder='Name' />
          <label htmlFor='email'> Email </label>
          <input id='email' type='text' placeholder='Email' />
          <label htmlFor='username'> Username </label>
          <input id='username' type='text' placeholder='Username' />
          <label htmlFor='password'> Password </label>
          <input id='password' type='password' placeholder='Password' />
          <div>
            <button className='' type='submit'> Update user </button>
            <button onClick={() => setShow(false)}> Close </button>
          </div>
        </form>
      </div>
    </div>
  )
}
