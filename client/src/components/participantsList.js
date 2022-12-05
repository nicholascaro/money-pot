import React from "react";
import Button from "@mui/material/Button";
const TaskList = (props) => {
  return props.taskList.map((val, idx) => {
    let name = `name-${idx}`,
      date = `date-${idx}`,
      position = `position-${idx}`;
    return (
      <tr key={val.index}>
        <td>
          <input
            type="text"
            name="name"
            id={name}
            data-id={idx}
            className="form-control "
          />
        </td>
        <td>
          <input
            type="date"
            name="date"
            id={date}
            data-id={idx}
            className="form-control "
          />
        </td>
        <td>
          <input
            type="text"
            name="position"
            id={position}
            data-id={idx}
            className="form-control"
          />
        </td>
        <td>
          {idx === 0 ? (
            <Button
              onClick={() => props.add()}
              variant="contained"
              //   className="btn btn-primary text-center"
            >
              +
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => props.delete(val)}
              color="error"
            >
              {/* <i className="fa fa-minus" aria-hidden="true"></i> */}-
            </Button>
          )}
        </td>
      </tr>
    );
  });
};
export default TaskList;
