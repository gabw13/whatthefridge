import React, { useState, addDoc } from "react";
// import firestore from "./firestore";

const UserForm = (props) => {
  const [newUser, setNewUser] = useState("");

  const createUser = async () => {
    await addDoc(props.usersCollection, { username: newUser });
  };

  const updateInput = (event) => {
    setNewUser(event.target.value);
  };

  // const updateInput = (event) => {
  //   setNewUser(event.target.value);
  // };

  // return (
  //   <form onSubmit={createUser}>
  //     <input type="text" name="username" onChange={updateInput} />
  //     <button type="submit">submit</button>
  //   </form>
  // );

  return (
    <form onSubmit={createUser}>
      <input type="text" name="username" onChange={updateInput} />
      <button type="submit">submit</button>
    </form>
  );
};
export default UserForm;
