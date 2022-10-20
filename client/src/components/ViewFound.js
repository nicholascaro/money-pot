import { useSearchParams } from "react-router-dom";
import Axios from "axios";
import React, { useEffect, useReducer } from "react";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Button } from "@mui/material";

function ViewFound() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("_id");
  const initialValue = {
    pot_object: [],
    pot_name: "",
    pot_organizer: "",
    contribution_amount: 0,
    total_pot_amount: 0,
    particpants: [],
  };
  const [state, dispatch] = useReducer(reducer, initialValue);

  //TODO: figure out how to update the state of the person fields
  const {
    pot_name,
    pot_organizer,
    contribution_amount,
    total_pot_amount,
    particpants,
  } = state;

  //TODO: create cases for keeping track of the state of each const
  function reducer(state, action) {
    switch (action.type) {
      case "init": {
        console.log(action.payload);
        return {
          ...state,
          [action.fieldName[0]]: action.payload.potName,
          [action.fieldName[1]]: action.payload.potOrganizer,
          [action.fieldName[2]]: action.payload.contributionAmount,
          [action.fieldName[3]]: action.payload.totalPotAmount,
          [action.fieldName[4]]: action.payload.participantArrayList,
        };
      }
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

  function style_person(person, i) {
    i++;
    const date = new Date(person.date).toDateString();
    return (
      <div key={person.name}>
        <br />

        <Divider />
        <br />
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
        >
          {" "}
          <TextField
            id="standard-basic"
            label={"Person " + i + " Name"}
            variant="outlined"
            value={person.name}
            multiline={true}
          />
          <TextField
            id="standard-basic"
            label={"Person " + i + " Position"}
            variant="outlined"
            value={person.position}
            multiline={true}
          />
          <TextField
            id="standard-basic"
            label={"Person " + i + " Date"}
            variant="outlined"
            value={date}
            multiline={true}
          />
        </Box>
      </div>
    );
  }

  useEffect(() => {
    Axios.get("http://localhost:8080/find", {
      params: {
        id: id,
      },
    }).then((response) => {
      dispatch({
        type: "init",
        fieldName: [
          "pot_name",
          "pot_organizer",
          "contribution_amount",
          "total_pot_amount",
          "particpants",
        ],
        payload: response.data,
      });
    });
  }, [id]);

  return (
    <div>
      <h1> We found your pot!</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <TextField
          id="standard-basic"
          label="Money Pot Name"
          variant="outlined"
          multiline={true}
          value={pot_name}
          onChange={(event) => {
            dispatch({
              type: "field",
              fieldName: "pot_name",
              payload: event.target.value,
            });
          }}
        />
        <TextField
          id="standard-basic"
          label="Pot Organizer"
          variant="outlined"
          multiline={true}
          value={pot_organizer}
          onChange={(event) => {
            dispatch({
              type: "field",
              fieldName: "pot_organizer",
              payload: event.target.value,
            });
          }}
        />
        <TextField
          id="standard-basic"
          label="Indivdual Contribution Amount"
          variant="outlined"
          multiline={true}
          value={contribution_amount}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">USD</InputAdornment>
            ),
          }}
          onChange={(event) => {
            dispatch({
              type: "field",
              fieldName: "contribution_amount",
              payload: event.target.value,
            });
          }}
        />
        <TextField
          id="standard-basic"
          label="Total Pot Amount"
          variant="outlined"
          multiline={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">USD</InputAdornment>
            ),
          }}
          value={total_pot_amount}
          onChange={(event) => {
            dispatch({
              type: "field",
              fieldName: "total_pot_amount",
              payload: event.target.value,
            });
          }}
        />
      </Box>

      {particpants
        ?.sort((a, b) => (a.position > b.position ? 1 : -1))
        .map((person, i) => {
          return (
            <div>
              {/* <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                > */}

              {style_person(person, i)}
              {/* </Box> */}
            </div>
          );
        })}
      <br />
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>Submit Changes</Button>
        </ButtonGroup>
      </Box>
    </div>
  );
}

export default ViewFound;
