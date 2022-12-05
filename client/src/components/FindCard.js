import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Axios from "axios";

//TODO: add data validation to text field
function FindCard() {
  const navigate = useNavigate();

  const [id, setId] = useState("");

  const goToFound = (_id) => {
    if (id === "" || id.length !== 24) {
      alert("Enter a valid id");
      return;
    }

    const res = Axios.get("http://localhost:8080/find", {
      params: {
        id: id,
      },
    }).catch(function (error) {
      console.log(error);
      return;
    });

    if (res.data === undefined) {
      alert("money pot with this id does not exist");
      return;
    }

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
          label="Money Pot ID"
          variant="standard"
          required
          multiline
          rows={2}
          size="small"
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <br />
        <br />
        <Button variant="contained" color="success" onClick={goToFound}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default FindCard;
