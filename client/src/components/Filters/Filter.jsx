import { useDispatch } from "react-redux";
import { filterByDiet, orderByName, orderByRating } from "../../redux/actions";

const Filter = ({ setCurrentPage, setRating, setOrder }) => {
  const dispatch = useDispatch();

  function handlerFilterByDiet(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
  }

  function handlerOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handlerOrderByRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setRating(`Ordenado ${e.target.value}`);
  }

  return (
    <>
      <select onChange={(e) => handlerOrderByName(e)}>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>
      <select onChange={(e) => handlerOrderByRating(e)}>
        <option value="high"> High score </option>
        <option value="low"> Low score </option>
      </select>
      <select onChange={(e) => handlerFilterByDiet(e)}>
        <option value="All"> All diets</option>
        <option value="dairy free"> Dairy free</option>
        <option value="gluten free"> Gluten free</option>
        <option value="ketogenic"> Ketogenic</option>
        <option value="lacto ovo vegetarian"> Lacto ovo vegetarian</option>
        <option value="lacto vegetarian"> Lacto vegetarian</option>
        <option value="low fodmap"> Low fodmap</option>
        <option value="ovo vegetarian"> Ovo vegetarian</option>
        <option value="paleolithic"> Paleolithic</option>
        <option value="pescetarian"> Pescetarian</option>
        <option value="primal"> Primal</option>
        <option value="vegan"> Vegan</option>
        <option value="vegetarian"> Vegetarian</option>
        <option value="whole 30"> Whole 30</option>
      </select>
    </>
  );
};

export default Filter;
