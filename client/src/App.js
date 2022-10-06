import "./App.css";
import DeleteCard from "./components/DeleteCard";
import FindCard from "./components/FindCard";
import CreateCard from "./components/CreateCard";

function App() {
  return (
    <div className="App">
      <h1>Money Pot: Calculator + Manager</h1>
      <div className="right-container">
        <DeleteCard />
        <FindCard />
        <CreateCard />
      </div>
    </div>
  );
}

export default App;
