import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import DetailRecipe from "./components/Card/DetailRecipe";
import Landing from "./components/Home/Lading";
import Page404 from "./components/Page404/Page404";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/recipe/:id" element={<DetailRecipe />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
