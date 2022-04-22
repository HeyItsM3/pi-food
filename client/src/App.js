import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import DetailRecipe from "./components/Pages/DetailRecipe";
import Landing from "./components/Pages/Landing/Lading";
import Page404 from "./components/Pages/Page404";
import CreateRecipe from "./components/Pages/CreateRecipe";
import "./assets/styles/general.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/recipe/:id" element={<DetailRecipe />} />
        <Route exact path="/create" element={<CreateRecipe />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
