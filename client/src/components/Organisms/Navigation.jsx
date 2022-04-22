import { Link } from "react-router-dom";
import Search from "./Search";

const Navigation = ({ active }) => {
  return (
    <div>
      <Link to="/home">Home</Link>
      {active ? <Search /> : null}
      <Link to="/create">Create</Link>
    </div>
  );
};

export default Navigation;
