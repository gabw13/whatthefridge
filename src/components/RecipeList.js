import { ReactComponent as EdamamBadge } from "./EdamamBadge.svg";

const RecipeList = (props) => {
  return (
    <section className="recipe-list">
      <h2>recipe box</h2>
      {props.recipes?.map((recipe) => {
        return (
          <section className="recipe-card">
            <h3>
              {recipe.recipe.recipe.label} by {recipe.recipe.recipe.source}
            </h3>
            <br></br>
            <img src={recipe.recipe.recipe.image} alt="recipe"></img>
            <br></br>
            <section>
              <h4>categories</h4>
              {recipe.recipe.recipe.dishType.map((type) => {
                return <li>{type}</li>;
              })}
              {recipe.recipe.recipe.dietLabels.map((label) => {
                return <li>{label}</li>;
              })}
            </section>
            <section className="recipe-ingredients">
              <h4>ingredients</h4>
              {recipe.recipe.recipe.ingredients.map((ingredient) => {
                return <li>{ingredient.food}</li>;
              })}
            </section>
            <br></br>
            <button>
              <a
                href={recipe.recipe.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                get recipe
              </a>
            </button>
            <br></br>
          </section>
        );
      })}
      <section className="edamam-badge">
        <EdamamBadge />
      </section>
    </section>
  );
};

export default RecipeList;
