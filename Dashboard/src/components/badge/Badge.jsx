import { React } from "react";
import DoneIcon from "@mui/icons-material/Done";
import "./badge.css";
import { AuthStr, HOST } from "../../data";
import { axios } from "axios";

const Badge = (props) => {
  if (props.type === 2)
    return (
      <span className="badge-span">
        {" "}
        <DoneIcon /> Confirmed
      </span>
    );
  if (props.type === 1) return <button onClick={props.click}>Confirm</button>;
};

export default Badge;
