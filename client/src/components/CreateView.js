import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import React, { useReducer } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TaskList from "./participantsList";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

function CreateView() {
  let PotObject = {
    pot_name: "",
    pot_organizer: "",
    contribution_amount: undefined,
    total_pot_amount: undefined,
    showModal: false,
    showMessage: "",
    participants: [
      {
        index: Math.random(),
        name: "",
        date: "",
        position: "",
      },
    ],
  };

  const [state, dispatch] = useReducer(reducer, PotObject);

  const {
    pot_name,
    pot_organizer,
    contribution_amount,
    total_pot_amount,
    participants,
    showModal,
    showMessage,
  } = state;

  function reducer(state, action) {
    switch (action.type) {
      case "field": {
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
      case "appendToList": {
        return {
          ...state,
          participants: [...state.participants, action.payload],
        };
      }
      case "delete": {
        return {
          ...state,
          participants: state.participants.filter((r) => r !== action.payload),
        };
      }
      case "total": {
        return {
          ...state,
          total_pot_amount:
            state.participants.length * state.contribution_amount,
        };
      }
      case "ShowModal": {
        return {
          ...state,
          showModal: true,
        };
      }

      case "HideModal": {
        return {
          ...state,
          showModal: false,
        };
      }

      case "clearForm": {
        return {
          ...state,
          pot_name: "",
          pot_organizer: "",
          contribution_amount: undefined,
          total_pot_amount: undefined,
          participants: [
            {
              index: Math.random(),
              name: "",
              date: "",
              position: "",
            },
          ],
        };
      }
      default:
        return state;
    }
  }

  function postPot() {
    if (isEmpty() === true) {
      dispatch({
        type: "field",
        fieldName: "showMessage",
        payload: "please complete all required fields",
      });
      presentModal();
      return;
    }
    Axios.post("http://localhost:8080/create", state)
      .then(function (response) {
        console.log(response);
        dispatch({
          type: "field",
          fieldName: "showMessage",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    presentModal();
  }

  const handleChange = (e) => {
    if (["name", "date", "position"].includes(e.target.name)) {
      let participants = [...state.participants];
      participants[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      dispatch({
        type: "field",
        fieldName: e.target.name,
        payload: e.target.value,
      });
    }
  };

  const addNewRow = () => {
    let newField = {
      index: Math.random(),
      name: "",
      date: "",
      position: "",
    };
    dispatch({
      type: "appendToList",
      fieldName: participants,
      payload: newField,
    });
    dispatch({
      type: "total",
    });
  };

  function isEmpty() {
    if (
      state.pot_name === "" ||
      state.pot_organizer === "" ||
      state.contribution_amount === undefined ||
      state.total_pot_amount === undefined
    ) {
      return true;
    }
    return false;
  }
  const handleSubmit = (e) => {
    e.target.reset();
  };
  const closeModal = () => {
    dispatch({
      type: "HideModal",
    });
    dispatch({
      type: "field",
      fieldName: "showMessage",
      payload: "",
    });
    if (isEmpty() === false) {
      dispatch({
        type: "clearForm",
      });
    }
  };

  const presentModal = () => {
    dispatch({
      type: "ShowModal",
    });
  };
  const clickOnDelete = (record) => {
    dispatch({
      type: "delete",
      fieldName: participants,
      payload: record,
    });
    dispatch({
      type: "total",
    });
  };

  return (
    <div>
      <h1>Pot Details</h1>
      <div>
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
        <h4>Add a Person</h4>
        <br></br>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <div className="row" style={{ marginTop: 10 }}>
            <div>
              <div>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="required">Name</th>
                        <th className="required">Date</th>
                        <th>Position</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <TaskList
                        add={addNewRow}
                        delete={clickOnDelete.bind(this)}
                        taskList={participants}
                      />
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="7"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <br />
      <Button variant="contained" onClick={postPot} color="success">
        Submit
      </Button>
      <Modal open={showModal} onClose={closeModal}>
        <Box>
          <div className="modal-gradient">
            <h4>Status</h4>
            <h5>{showMessage}</h5>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateView;
