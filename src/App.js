import "./App.css";
import axios from "axios";
import { Routes, Route, Link, Outlet } from "react-router-dom";
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
  // addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const EDAMAMURL = "https://api.edamam.com/api/recipes/v2";
const APP_ID = process.env.REACT_APP_EDAMAM_ID;
const APP_KEY = process.env.REACT_APP_EDAMAM_KEY;

function App() {
  const [users, setUsers] = useState(["testuser777"]);
  const [currentUser, setCurrentUser] = useState(["testuser777"]);

  const [ingredients, setIngredients] = useState([]);

  const [recipes, setRecipes] = useState([]);

  const usersCollection = collection(db, "users");

  // const checkKitchen = () => {
  //   if (ingredients === null) {
  //     return "Kitchen is empty! Add some ingredients to get started.";
  //   }
  // };

  // event handler that updates current user state when a different user is clicked on the user drop down menu
  const handleUserChange = (event) => {
    setCurrentUser(event.target.value);
    // setRecipes([]);
  };

  // async api call to db: READ users
  const getUsers = async () => {
    const userData = await getDocs(usersCollection);
    // loop through docs in collection and set users array to be equal to array of doc data and id for each doc
    // setUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

  // useEffect(() => {
  //   getIngredients();
  //   // eslint-disable-next-line
  // }, [currentUser]);

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
        <h1>what the fridge?!</h1>
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
                handleUserChange={handleUserChange}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
              <br></br>
              <ReturningUserList
                db={db}
                users={users}
                getUsers={getUsers}
                handleUserChange={handleUserChange}
                currentUser={currentUser}
              />
            </section>
          }
        ></Route>
        <Route
          path=":username"
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
                currentUser={currentUser}
                testProp={"1,2"}
              />
              <br></br>
              <AddIngredientForm
                getIngredients={getIngredients}
                currentUser={currentUser}
              />
              <br></br>
            </section>
          }
        ></Route>
      </Routes>

      {/* <NewUserForm
        db={db}
        getUsers={getUsers}
        handleUserChange={handleUserChange}
      />

      <ReturningUserList
        db={db}
        users={users}
        getUsers={getUsers}
        handleUserChange={handleUserChange}
        currentUser={currentUser}
      /> */}

      {/* <KitchenIngredientList
        db={db}
        ingredients={ingredients}
        increaseIngredients={increaseIngredients}
        decreaseIngredients={decreaseIngredients}
        getRecipes={getRecipes}
        deleteIngredient={deleteIngredient}
      />

      <AddIngredientForm
        getIngredients={getIngredients}
        currentUser={currentUser}
      />

      <RecipeList recipes={recipes} /> */}

      <footer className="App-footer">
        {/* <p>made with ReactJS + Google Firebase + &hearts;</p> */}
        <p>&copy; 2022 Gaby Webb </p>
      </footer>
    </section>
  );
}

function Home() {
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
        <p> well, what are you waiting for?</p>
        <p>
          <a href="/users">let's get cookin', good lookin'!</a>
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
