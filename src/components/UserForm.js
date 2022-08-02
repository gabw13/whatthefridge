import React, { useState, addDoc } from "react";
// import firestore from "./firestore";

const UserForm = (props) => {
  const [newUser, setNewUser] = useState("");

  const createUser = async () => {
    await addDoc(props.usersCollection, { username: newUser });
  };

  return (
    <form>
      <input
        type="text"
        name="username"
        onChange={(event) => {
          setNewUser(event.target.value);
        }}
      />
      <button type="submit" onSubmit={createUser}>
        submit
      </button>
    </form>
  );
};
export default UserForm;
