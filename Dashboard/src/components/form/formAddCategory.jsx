import React from "react";
import axios from "axios";
import { AuthStr, HOST } from "../../data";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./category.css";
import { Link } from "react-router-dom";
export default class FormAddCategory extends React.Component {
  state = {
    name: "",
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: this.state.name,
    };

    axios
      .post(HOST + "/admin/categories", user, { headers: { Authorization: AuthStr } })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <Link to="/categories">
            <ArrowBackIcon className="icon-back" />
          </Link>
        </div>
        <h2 className="page-header">Add Category</h2>
        <div className="row">
          <div className="col-5">
            <div className="card">
              <div className="card__body">
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Category Name
                    <input type="text" name="name" onChange={this.handleChange} />
                  </label>
                  <button type="submit">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
