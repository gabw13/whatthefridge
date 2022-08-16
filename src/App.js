import "./App.css";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import NewUserForm from "./components/NewUserForm";
import ReturningUserList from "./components/ReturningUserList";
import KitchenIngredientList from "./components/KitchenIngredientList";
import RecipeList from "./components/RecipeList";
import AddIngredientForm from "./components/AddIngredientForm";
import { useState, useEffect } from "react";
import { db } from "./firebase.config";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const EDAMAMURL = "https://api.edamam.com/api/recipes/v2";
const APP_ID = process.env.REACT_APP_EDAMAM_ID;
const APP_KEY = process.env.REACT_APP_EDAMAM_KEY;

function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const [ingredients, setIngredients] = useState(["nothing here!"]);

  const [recipes, setRecipes] = useState([]);

  const usersCollection = collection(db, "users");

  const goHome = () => {
    let path = "/";
    navigate(path);
  };

  // event handler that updates current user state when a different user is clicked on the user drop down menu
  const handleUserChange = (event) => {
    const chosenUser = event.target.value;
    setCurrentUser(chosenUser);
    setIngredients([]);
    setRecipes([]);
  };

  // async api call to db: READ users
  const getUsers = async () => {
    const userData = await getDocs(usersCollection);
    // loop through docs in collection and set users array to be equal to array of doc data and id for each doc
    setUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // async api call to db: DELETE user
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    // getUsers();
    goHome();
  };

  // async api call to db: READ ingredients
  const getIngredients = async () => {
    const ingredientData = await getDocs(
      collection(db, `users/${currentUser}/kitchen`)
    );

    // loop through docs in collection and set ingredients array to be equal to array of doc data and id for each doc
    setIngredients(
      ingredientData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  // async api call to db: UPDATE ingredients (increase count on button click)
  const increaseIngredients = async (ingredient) => {
    const ingredientDoc = doc(
      db,
      `users/${currentUser}/kitchen/${ingredient.id}`
    );
    const newFields = { quantity: ingredient.quantity + 1 };
    await updateDoc(ingredientDoc, newFields);
    getIngredients();
  };

  // async api call to db: UPDATE ingredients (decrease count on button click)
  const decreaseIngredients = async (ingredient) => {
    const ingredientDoc = doc(
      db,
      `users/${currentUser}/kitchen/${ingredient.id}`
    );
    const newFields = { quantity: ingredient.quantity - 1 };
    await updateDoc(ingredientDoc, newFields);
    getIngredients();
  };

  // aync api call to db: DELETE ingredient
  const deleteIngredient = async (ingredient) => {
    const ingredientDoc = doc(
      db,
      `users/${currentUser}/kitchen/${ingredient.id}`
    );
    await deleteDoc(ingredientDoc);
    getIngredients();
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);
  // do NOT uncomment the line below. Putting something in the deps array will cause reads to skyrocket.
  // }, [usersCollection]);

  const getRecipes = async (ingredient) => {
    await axios
      .get(
        `${EDAMAMURL}/?type=public&q=${ingredient.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then((response) => {
        const recipeArray = response.data.hits.map((recipe) => {
          return { recipe };
        });
        setRecipes(recipeArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="App">
      <header className="App-header">
        <h1 className="App-title">🍳 what the fridge?!</h1>
        <nav>
          <Link to="/">home </Link> | <Link to="/about">about </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route
          path="users"
          element={
            <section className="user-choice">
              <NewUserForm
                db={db}
                getUsers={getUsers}
                // handleUserChange={handleUserChange}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <br></br>
              <ReturningUserList
                db={db}
                users={users}
                getUsers={getUsers}
                handleUserChange={handleUserChange}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </section>
          }
        ></Route>
        <Route
          path=":id"
          element={
            <section className="user-kitchen-page">
              <KitchenIngredientList
                db={db}
                ingredients={ingredients}
                increaseIngredients={increaseIngredients}
                decreaseIngredients={decreaseIngredients}
                getIngredients={getIngredients}
                getRecipes={getRecipes}
                deleteIngredient={deleteIngredient}
                usersCollection={usersCollection}
                currentUser={currentUser}
                handleUserChange={handleUserChange}
                deleteUser={deleteUser}
              />
              <br></br>
              <AddIngredientForm
                getIngredients={getIngredients}
                currentUser={currentUser}
              />
              <br></br>
              <RecipeList recipes={recipes} />
            </section>
          }
        ></Route>
      </Routes>

      <footer className="App-footer">
        <p>&copy; 2022 Gaby Webb </p>
      </footer>
    </section>
  );
}

function Home() {
  let navigate = useNavigate();
  const toUsers = () => {
    let path = "/users";
    navigate(path);
  };
  return (
    <>
      <main>
        {" "}
        <h1>welcome!</h1>
        <p>are you....</p>
        <section className="checklist">
          <li>✅ eating the same meals over and over?</li>
          <br></br>
          <li>✅ tired of staring blankly into your fridge?</li>
          <br></br>
          <li>✅ throwing away perfectly good food regularly?</li>
        </section>
        <br></br>
        <p>
          <i>what the fridge</i> can help with that!
        </p>
        <p>
          <button
            onClick={() => {
              toUsers();
            }}
          >
            click here to cook up some ideas!
          </button>
        </p>
      </main>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h1>about</h1>
        <p>
          What the Fridge was made in August 2022 by Gaby Webb with ReactJS +
          Google Firebase + EdamamAPI + &hearts;
        </p>
        <h2>contact</h2>
        <a href="mailto:gabw813@gmail.com">email</a>
        <br></br>
        <a href="https://www.linkedin.com/in/gabriela-webb">linkedIn</a>
        <br></br>
        <a href="https://github.com/gabw13">github</a>
      </main>
    </>
  );
}

export default App;
