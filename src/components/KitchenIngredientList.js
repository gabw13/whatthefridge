// import { useEffect } from "react";
import { useParams } from "react-router-dom";

const KitchenIngredientList = (props) => {
  let params = useParams();
  // useEffect(() => {
  //   props.getIngredients();
  //   // eslint-disable-next-line
  // }, []);
  // console.log(props.testProp);

  return (
    <section className="user-kitchen">
      {/* <h2>welcome back {props.currentUser}!</h2> */}
      <h2>welcome back {params.username}!</h2>
      <button onClick={props.getIngredients()}>open my fridge</button>
      <h3>here's your kitchen: </h3>
      {props.ingredients?.map((ingredient) => {
        return (
          <section>
            <li key={ingredient.id}>
              <h3>{ingredient.name}</h3>
            </li>
            <button
              className="increase-button"
              onClick={() => {
                props.increaseIngredients(ingredient);
              }}
            >
              ⬆
            </button>
            <p>{ingredient.quantity}</p>
            <p>{ingredient.unit}</p>
            <button
              className="decrease-button"
              onClick={() => {
                props.decreaseIngredients(ingredient);
              }}
            >
              ⬇
            </button>
            <br></br>
            <button
              onClick={() => {
                props.getRecipes(ingredient);
              }}
            >
              get recipes that use {ingredient.name}
            </button>
            <br></br>
            <button
              onClick={() => {
                props.deleteIngredient(ingredient);
              }}
            >
              delete {ingredient.name}
            </button>
            <p>______</p>
          </section>
        );
      })}
    </section>
  );
};

export default KitchenIngredientList;
