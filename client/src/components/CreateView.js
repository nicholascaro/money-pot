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
import React, { useEffect, useReducer } from "react";

function CreateView() {

  var newPot = new Object();

  const [potName, setPotName] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [contributionAmount, setContribution] = useState(0);
  const [participant, setParticipant] = useState("");

  let PotObject = {
    pot_name: "",
    pot_organizer: "",
    contribution_amount: 0,
    participants: [],
  };

  const [state, dispatch] = useReducer(reducer, PotObject);

  const {
    pot_name,
    pot_organizer,
    contribution_amount,
    participants,
  } = state;

  function reducer(state, action) {
    switch (action.type) {
      case "field": {
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      }
      default:
        return state;
    }
  }

  function InputParticipant() {
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
            reducer(event.target.participants.i);
          }}
        />
        <AddParticipant/>
      </div>
    );
  }

  function AddParticipant() {
    return (
      <div>
        <Button onClick={InputParticipant}>
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
            dispatch({
              type: "field",
              fieldName: "pot_name",
              payload: event.target.value,
            });
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
            dispatch({
              type: "field",
              fieldName: "pot_organizer",
              payload: event.target.value,
            });
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
            dispatch({
              type: "field",
              fieldName: "contribution_amount",
              payload: event.target.value,
            });
          }}
        />
        <InputParticipant/>
        <br></br>
        <br></br>
        <Button variant="contained" onClick={dispatch}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CreateView;
