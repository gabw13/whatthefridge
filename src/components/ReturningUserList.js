// import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ReturningUserList = (props) => {
  const navigate = useNavigate();

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
        <button type="submit" onClick={routeChange}>
          go to my kitchen
        </button>
        <br></br>
      </div>
    </section>
  );
};

export default ReturningUserList;
