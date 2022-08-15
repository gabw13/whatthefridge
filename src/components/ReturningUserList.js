// import { doc, deleteDoc } from "firebase/firestore";

const ReturningUserList = (props) => {
  // async api call to db: DELETE user
  // const deleteUser = async (id) => {
  //   const userDoc = doc(props.db, "users", id);
  //   await deleteDoc(userDoc);
  //   props.getUsers();
  // };

  return (
    <section className="user-return">
      <h2>or have you been here before? 🤔 </h2>
      <p>select your username from the list below:</p>
      <div className="select-container">
        <label htmlFor="choose username">
          users:{" "}
          <select
            onChange={(event) => {
              props.handleUserChange(event);
            }}
          >
            {props.users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        {/* <button
          onClick={() => {
            deleteUser(props.currentUser);
          }}
        >
          delete user
        </button> */}
      </div>
    </section>
  );
};

export default ReturningUserList;
