import { useSearchParams } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

function ViewFound() {
  const [searchParams] = useSearchParams();
  const [moneyPot, setMoneyPot] = useState([]);
  const id = searchParams.get("_id");

  useEffect(() => {
    // Update the document title using the browser API
    Axios.get("http://localhost:8080/find", {
      params: {
        id: id,
      },
    }).then((response) => {
      console.log(response.data);
      setMoneyPot(response.data);
    });
  }, [id]);

  return (
    <div>
      <h1> Found Page</h1>
      <br />
      <br />
      <pre>{JSON.stringify(moneyPot, null, 2)}</pre>
    </div>
  );
}

export default ViewFound;
