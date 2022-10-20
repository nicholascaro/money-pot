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
  const [searchParams] = useSearchParams();
  const _name = searchParams.get("_name");
  const createViewHeader = "<h1>New Pot: " + _name + "</h1>";
  //document.getElementById("content").innerHTML = createViewHeader;

  return (
    <div>
      <h1>New Money Pot Details</h1>
      <div className="card">
        <div>
          <h1>name</h1>
        </div>
        <div className="card-boy"></div>
      </div>
    </div>
  );
}

export default CreateView;
