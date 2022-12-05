import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createSearchParams, useNavigate } from "react-router-dom";

//TODO: write code

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

function CreateCard() {
    const [name, setName] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [idError, setIdError] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const goToCreateView = (_name) => {
      navigate({
        pathname: "create",
        search: createSearchParams({
          _name: name,
        }).toString(),
      });
    };

    const createMoneyPot = async () => {
      console.log(name);
      const res = Axios.put("http://localhost:8080/create", {
        pot_name: name
      });

      console.log(res.name);
      setModalDescription(res.name);
      handleOpen();
    };

  return (
    <div className="card card-shadow create-gradient">
      <div>
        <br />
        <br />
        <h2>create</h2>
      </div>
      <div className="card-boy"></div>
      <div>
          <br />
          <br />
          <Button onClick={goToCreateView} variant="contained">
            Create
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Creation Status:
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

export default CreateCard;
