import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "redux/actions";

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
    <div>
      <input
        value={name}
        type="text"
        placeholder="Recipe..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
};

export default Search;
