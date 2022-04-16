import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import Card from "../Card/Card";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <div>
      <button onClick={handleClick}>All recipes</button>
      <div>
        {allRecipes?.map((e) => {
          return (
            <Card
              key={e.id}
              image={e.image}
              name={e.name}
              diets={e.diets.map((diet) =>
                diet.name ? `${diet.name} - ` : "No hay dietas"
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
