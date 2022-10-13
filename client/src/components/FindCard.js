import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

//TODO: add data validation to text field
function FindCard() {
  const navigate = useNavigate();

  const [id, setId] = useState("");

  const goToFound = (_id) => {
    navigate({
      pathname: "found",
      search: createSearchParams({
        _id: id,
      }).toString(),
    });
  };

  return (
    <div className="card">
      <div>
        <h1>find</h1>
      </div>
      <div className="card-boy"></div>
      <div>
        <TextField
          id="standard-basic"
          label="Money Pot ID"
          variant="standard"
          required
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <br />
        <br />
        <Button variant="contained" onClick={goToFound}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default FindCard;
