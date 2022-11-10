import CreateCard from "./CreateCard";
import DeleteCard from "./DeleteCard";
import FindCard from "./FindCard";

function Home() {
  return (
    <div>
      <div className="container">
        <DeleteCard />
        <FindCard />
        <CreateCard />
      </div>
    </div>
  );
}

export default Home;
