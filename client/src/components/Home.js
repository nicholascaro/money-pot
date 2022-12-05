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

      <footer className="footer">
        {" "}
        built by nick and will | CPSC 362 | Fall 2022
      </footer>
    </div>
  );
}

export default Home;
