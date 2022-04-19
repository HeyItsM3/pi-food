import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div>
        <h1>Foods</h1>
        <Link to="/home">
          <button>Go</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
