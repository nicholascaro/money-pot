import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Axios from "axios";
import React, { useReducer } from "react";
import InputAdornment from "@mui/material/InputAdornment";

function CreateView() {
  let PotObject = {
    pot_name: "",
    pot_organizer: "",
    contribution_amount: undefined,
    total_pot_amount: undefined,
    participants: [],
  };

  const [state, dispatch] = useReducer(reducer, PotObject);

  const {
    pot_name,
    pot_organizer,
    contribution_amount,
    total_pot_amount,
    particpants,
  } = state;

  function PostNewPot() {
    console.log("Pot object", state);
  }
  function reducer(state, action) {
    console.log("before switch", action);
    switch (action.type) {
      case "field": {
        console.log("in field", action);
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      }
      case "updateTotal1": {
        return {
          ...state,
          [action.fieldName[0]]: action.payload[0],
          [action.fieldName[1]]: action.payload[0] * state.participants.length,
        };
      }
      default:
        return state;
    }
  }

  function InputParticipant() {
    const [inputFields, setInputFields] = useState([{ name: "", date: "" }]);

    const handleFormChange = (index, event) => {
      let data = [...inputFields];
      data[index][event.target.name] = event.target.value;
      setInputFields(data);
    };

    const addFields = () => {
      let newfield = { name: "", date: "" };

      setInputFields([...inputFields, newfield]);
    };

    const removeFields = (index) => {
      let data = [...inputFields];
      data.splice(index, 1);
      setInputFields(data);
    };

    return (
      <div className="Participant">
        <form>
          {inputFields.map((input, index) => {
            return (
              <div key={index}>
                <TextField
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                  required
                  name="name"
                  size="small"
                  value={input.name}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <Button onClick={addFields}> + </Button>
                <Button onClick={() => removeFields(index)}> - </Button>
              </div>
            );
          })}
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Pot Details</h1>
      <div className="dataFields">
        <div className="potName">
          <TextField
            id="standard-basic"
            label="Money Pot Name"
            variant="standard"
            required
            size="small"
            value={pot_name || ""}
            onChange={(event) => {
              dispatch({
                type: "field",
                fieldName: "pot_name",
                payload: event.target.value,
              });
              console.log("name", pot_name);
            }}
          />
        </div>
        <br></br>
        <div className="organizer">
          <TextField
            id="standard-basic"
            label="Organizer's Name"
            variant="standard"
            required
            size="small"
            value={pot_organizer}
            onChange={(event) => {
              dispatch({
                type: "field",
                fieldName: "pot_organizer",
                payload: event.target.value,
              });
            }}
          />
        </div>
        <br></br>
        <div className="contribution">
          <TextField
            id="standard-basic"
            label="Individual Contribution Amount"
            variant="standard"
            required
            size="small"
            value={contribution_amount || ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={(event) => {
              dispatch({
                type: "updateTotal1",
                fieldName: ["contribution_amount", "total_pot_amount"],
                payload: [event.target.value],
              });
            }}
          />
        </div>
        <br />
        <TextField
          id="standard-basic"
          variant="standard"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          label="Total Pot Amount"
          value={total_pot_amount || ""}
          disabled
        />
        <br />
        <br />
        <h4>Members</h4>
        <br />
        <div className="participantContainer">
          <InputParticipant />
        </div>
        <br></br>
        <br></br>
        <Button variant="contained" onClick={PostNewPot}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CreateView;
