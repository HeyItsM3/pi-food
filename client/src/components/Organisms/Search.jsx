import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "redux/actions";
import search from "assets/images/search-icon.svg";

const Search = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchByName(name.toLowerCase()));
    setName("");
  }

  return (
    <div className="search">
      <input
        value={name}
        type="text"
        placeholder="Recipe..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        <img src={search} alt="search" />
      </button>
    </div>
  );
};

export default Search;
