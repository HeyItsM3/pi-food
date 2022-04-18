import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const iOfLastRecipe = currentPage * recipesPerPage;
  const iOfFirstRecipe = iOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Handlers
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <div>
      <button onClick={handleClick}>All recipes</button>
      <div>
        {currentRecipes?.map((e) => {
          return (
            <Link to={`/recipe/${e.id}`} key={e.id}>
              <Card
                key={e.id}
                image={e.image}
                name={e.name}
                diets={e.diets.map((diet) =>
                  diet.name ? `${diet.name} - ` : "No hay dietas"
                )}
              />
            </Link>
          );
        })}
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginado={paginado}
      />
    </div>
  );
};

export default Home;
