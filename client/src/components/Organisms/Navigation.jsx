import { Link } from "react-router-dom";
import Search from "./Search";

const Navigation = ({ active }) => {
  return (
    <div className="navigation">
      <Link to="/home">Home</Link>
      <Link to="/create">Create</Link>
      {active ? <Search /> : null}
    </div>
  );
};

export default Navigation;
