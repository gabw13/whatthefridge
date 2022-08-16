const KitchenIngredientList = (props) => {
  return (
    <section className="user-kitchen">
      {/* <h2>welcome {props.currentUser}!</h2> */}
      {/* <h2>welcome {params.username}!</h2> */}
      <h2>welcome!</h2>

      <button
        onClick={() => {
          props.getIngredients();
        }}
      >
        open my fridge
      </button>
      <button
        onClick={() => {
          props.deleteUser(props.currentUser);
        }}
      >
        delete user
      </button>
      {/* <h3>here's your kitchen: </h3> */}
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
