  import Button from "@mui/material/Button";
  import TextField from "@mui/material/TextField";
  import { useState } from "react";
  import Axios from "axios";
  import Modal from "@mui/material/Modal";
  import Box from "@mui/material/Box";
  import Typography from "@mui/material/Typography";
  import { useSearchParams } from "react-router-dom";
  //import { useNavigate } from "react-router-dom";
  import { useNavigate, createSearchParams } from "react-router-dom";

  function CreateView() {

    var newPot = new Object();

    const [potName, setPotName] = useState("");
    const [organizerName, setOrganizerName] = useState("");
    const [contributionAmount, setContribution] = useState(0);
    const [participant, setParticipant] = useState("");

    function GetData() {
      setPotName();
      setOrganizerName();
      setContribution();
      
    }

      function NewParticipant() {
        return (
        <div>
          <br></br>
          <TextField
            id="standard-basic"
            label="Participant Name"
            variant="standard"
            required
            size="small"
            onChange={(event) => {
              NewParticipant(event.target.value);
            }}
          />
            <Button onClick={NewParticipant}>
              +
            </Button>
          </div>
        );
      }

      return (
        <div>
        <h1>New Pot Details</h1>
        <div className="dataFields">
          <TextField
            id="standard-basic"
            label="Money Pot Name"
            variant="standard"
            required
            size="small"
            onChange={(event) => {
              setPotName(event.target.value);
            }}
          />
          <br></br>
          <TextField
            id="standard-basic"
            label="Organizer's name"
            variant="standard"
            required
            size="small"
            onChange={(event) => {
              setOrganizerName(event.target.value);
            }}
            />
          <br></br>
          <TextField
            id="standard-basic"
            label="Contribution Amount"
            variant="standard"
            required
            size="small"
            onChange={(event) => {
              setContribution(event.target.value);
            }}
            />
            <NewParticipant />
            <br></br>
            <br></br>
          <Button variant="contained" onClick={GetData}>
            Submit
          </Button>
        </div>
        </div>
    );
  }

  export default CreateView;
