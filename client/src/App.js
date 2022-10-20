import "./App.css";
import Home from "./components/Home";
import ViewFound from "./components/ViewFound";
import FindCard from "./components/FindCard";
import CreateView from "./components/CreateView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="found" element={<ViewFound />} />
          <Route path="find" element={<FindCard />} />
          <Route path="create" element={<CreateView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
