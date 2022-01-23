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
        this.props.history.push("/categories");
      })
      .catch((err) => {
        if (err.response.status === 422) {
          document.getElementById("error-message").innerHTML =
            "<span>" + err.response.data.data.email + "</span>";
        }
      });
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
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Category Name
                    <input type="text" name="name" onChange={this.handleChange} />
                  </label>
                  <button type="submit">Add</button>
                </form>
                <div id="error-message"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
