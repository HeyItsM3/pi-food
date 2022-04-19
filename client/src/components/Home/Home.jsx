import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Search from "../Card/Search";
import Filter from "../Filters/Filter";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  // Loader
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getRecipes());
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const iOfLastRecipe = currentPage * recipesPerPage;
  const iOfFirstRecipe = iOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe);

  // Local states for filters
  const [, setOrder] = useState("");
  const [, setRating] = useState("");

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handlers
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <div>
      <button onClick={handleClick}>All recipes</button>
      <Search />
      <Filter
        setCurrentPage={setCurrentPage}
        setRating={setRating}
        setOrder={setOrder}
      />
      <div>
        {/* {loader ? (
          <p>Loading...</p>
        ) : ( */}
        <>
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
        </>
        {/* )} */}
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
