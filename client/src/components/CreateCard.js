import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

function CreateCard() {
  const navigate = useNavigate();
  const goToCreateView = () => {
    navigate({
      pathname: "create",
    });
  };

  return (
    <div className="card card-shadow create-gradient">
      <div>
        <br />
        <br />
        <h2>create</h2>
      </div>
      <div></div>
      <div className="card-body card-shadow">
        <br />
        <br />
        <Button onClick={goToCreateView} variant="contained">
          Begin
        </Button>
      </div>
    </div>
  );
}

export default CreateCard;
