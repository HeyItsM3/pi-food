import { useDispatch, useSelector } from "react-redux";
import { filterByDiet, orderByName, orderByRating } from "../../redux/actions";
import { useEffect } from "react";
import { getDiets } from "../../redux/actions";

const Filter = ({ setCurrentPage, setRating, setOrder }) => {
  const Diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

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
        <option value="diet"> Diets</option>
        {Diets?.map((diet) => {
          return <option value={diet.name}>{diet.name}</option>;
        })}
      </select>
    </>
  );
};

export default Filter;
