import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//TODO: add data validation to text field

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DeleteCard() {
  const [id, setId] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [idError, setIdError] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //TODO: change then part of api request
  //TODO: resolve ERROR: endpoint expecting a map not a string. either change api or change input into a map
  const deleteMoneyPot = async () => {
    console.log(id);
    const res = await Axios.delete("http://localhost:8080/delete", {
      data: { _id: id },
    });

    console.log(res.data);
    setModalDescription(res.data);
    handleOpen();
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
          required
          size="small"
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <br />
        <br />
        <Button onClick={deleteMoneyPot} variant="contained">
          Submit
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Deletion Status:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalDescription}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default DeleteCard;
