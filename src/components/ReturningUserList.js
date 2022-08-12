// import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

const ReturningUserList = (props) => {
  // async api call to db: DELETE user
  const deleteUser = async (id) => {
    const userDoc = doc(props.db, "users", id);
    await deleteDoc(userDoc);
    props.getUsers();
  };

  return (
    <section className="user-return">
      <h2>Have you been here before?</h2>
      <h3>Select a name from the list of users below:</h3>
      <div className="select-container">
        <label>
          Select a username:
          <select
            onChange={(event) => {
              props.handleUserChange(event);
            }}
          >
            {props.users.map((user) => (
              <option value={user.id}>{user.username}</option>
            ))}
          </select>
        </label>
        <br></br>
        <button
          onClick={() => {
            deleteUser(props.currentUser);
          }}
        >
          delete user
        </button>
      </div>
    </section>
  );
};

export default ReturningUserList;
