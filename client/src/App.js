import Home from "./components/Home";
import ViewFound from "./components/ViewFound";
import FindCard from "./components/FindCard";
import About from "./components/About";
import NavBar from "./components/NavBar";
import CreateView from "./components/CreateView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="found" element={<ViewFound />} />
          <Route path="find" element={<FindCard />} />
          <Route path="create" element={<CreateView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
