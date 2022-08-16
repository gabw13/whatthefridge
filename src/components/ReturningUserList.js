// import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ReturningUserList = (props) => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  // async api call to db: DELETE user
  // const deleteUser = async (id) => {
  //   const userDoc = doc(props.db, "users", id);
  //   await deleteDoc(userDoc);
  //   props.getUsers();
  // };

  // const handleUserChange = (event) => {
  //   // console.log(event.target.value);
  //   setSelected(event.target.value);
  //   // props.setCurrentUser(selected);
  //   // console.log(selected);
  //   goToUserKitchen();
  // };

  const routeChange = () => {
    let path = `/${props.currentUser}`;
    navigate(path);
  };

  return (
    <section className="user-return">
      <h2>or have you been here before? 🤔 </h2>
      <p>select your username from the list below:</p>
      <div className="select-container">
        <label htmlFor="choose username"></label>
        users:{" "}
        <select
          // value={props.currentUser}
          onChange={(event) => {
            props.handleUserChange(event);
          }}
          // multiple={false}
        >
          {props.users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <button type="submit" onClick={routeChange}>
          go to my kitchen
        </button>
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
