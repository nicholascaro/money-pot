// import "./App.css";
import "/Users/nicholascaro/Desktop/projects/money-pot/client/src/App.css";
import CreateCard from "./CreateCard";
import DeleteCard from "./DeleteCard";
import FindCard from "./FindCard";
function Home() {
  return (
    <div>
      <h1>Money Pot: Calculator + Manager</h1>
      <div className="right-container">
        <DeleteCard />
        <FindCard />
        <CreateCard />
      </div>
    </div>
  );
}

export default Home;
