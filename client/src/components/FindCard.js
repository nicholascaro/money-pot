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
    <div className="card card-shadow find-gradient">
      <div>
        <br />
        <br />
        <h2>find</h2>
      </div>
      <div></div>
      <div className="card-body card-shadow">
        <TextField
          id="standard-basic"
          label="Money Pot ID"
          variant="standard"
          required
          size="small"
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
