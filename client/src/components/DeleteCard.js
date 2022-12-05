import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

//TODO: add data validation to text field

function DeleteCard() {
  const [id, setId] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteMoneyPot = async () => {
    if (id === "" || id.length !== 24) {
      alert("Enter a valid id");
      return;
    }
    const res = await Axios.delete("http://localhost:8080/delete", {
      data: { _id: id },
    });
    setModalDescription(res.data);
    handleOpen();
  };

  return (
    <div className="card card-shadow delete-gradient">
      <div>
        <br />
        <br />
        <h2>delete</h2>
      </div>
      <div className="card-body card-shadow">
        <TextField
          label="Money Pot ID"
          variant="standard"
          required
          size="small"
          multiline
          rows={2}
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <br />
        <br />
        <Button onClick={deleteMoneyPot} variant="contained" color="error">
          Submit
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          // aria-labelledby="modal-modal-title"
          // aria-describedby="modal-modal-description"
        >
          <Box>
            <div className="modal-gradient">
              <h4>Status</h4>
              <h5>{modalDescription}</h5>
            </div>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalDescription}
            </Typography> */}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default DeleteCard;
