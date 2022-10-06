import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Axios } from "axios";

//TODO: add data validation to text field
function FindCard() {
  const [id, setId] = useState("");
  const checkValue = () => {
    console.log(id);
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
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <br />
        <br />
        <Button variant="contained" onClick={checkValue}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default FindCard;
