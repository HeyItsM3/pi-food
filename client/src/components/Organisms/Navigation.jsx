import { Link } from "react-router-dom";
import Search from "./Search";

const Navigation = ({ active }) => {
  return (
    <div className="navigation">
      {active ? <Search /> : null}
      <Link to="/home">Home</Link>
      <Link to="/create">Create</Link>
    </div>
  );
};

export default Navigation;
