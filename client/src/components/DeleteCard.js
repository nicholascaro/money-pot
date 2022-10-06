import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Axios from "axios";

//TODO: add data validation to text field
function DeleteCard() {
  const [id, setId] = useState("");
  //TODO: change then [art of api request
  //TODO: resolve ERROR: endpoint expecting a map not a string. either change api or change input into a map
  const deleteMoneyPot = () => {
    console.log(id);
    Axios.delete("http://localhost:8080/delete", { potId: id }).then(
      (responce) => {
        console.log(responce);
      }
    );
  };

  return (
    <div className="card">
      <div>
        <h1>delete</h1>
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
        <Button variant="contained" onClick={deleteMoneyPot}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default DeleteCard;
