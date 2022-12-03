import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import React, { useReducer } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TaskList from "./participantsList";

function CreateView() {
  let PotObject = {
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

  const [state, dispatch] = useReducer(reducer, PotObject);

  const {
    pot_name,
    pot_organizer,
    contribution_amount,
    total_pot_amount,
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
      default:
        return state;
    }
  }

  function postPot2() {
    console.log(state);
    Axios.post("http://localhost:8080/create", state)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
      // this.setState({ [e.target.name]: e.target.value });
    }
  };

  const addNewRow = () => {
    console.log("new field");
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

  const handleSubmit = (e) => {
    // axios.defaults.headers.common["Authorization"] = localStorage.getItem('token');
    // axios.post("http://localhost:9000/api/task", data).then(res => {
    //     if(res.data.success) NotificationManager.success(res.data.msg);
    // }).catch(error => {
    //     if(error.response.status && error.response.status===400)
    //     NotificationManager.error("Bad Request");
    //     else NotificationManager.error("Something Went Wrong");
    //     this.setState({ errors: error })
    // });
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
      <Button variant="contained" onClick={postPot2} color="success">
        Submit
      </Button>
    </div>
  );
}

export default CreateView;
