import React from "react";

import Table from "../components/table/Table";

import { useState, useEffect } from "react";
import axios from "axios";
import { HOST } from "../data";
import FormAddCategory from "../components/form/formAddCategory";
// import { AuthStr } from "../data";
export default function Categories() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(HOST + "/categories")
      .then((res) => {
        const users = res.data.data;
        setData(users);
      })
      .catch((err) => console.log(err));
  }, []);
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const customerTableHead = ["", "name"];

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
    </tr>
  );
  return (
    <div className="categories">
      <h2 className="page-header">Category</h2>
      <div className="add-category">
        <button className="btn-add">Add Category</button>
      </div>
      <div className="form-add-category">
        <FormAddCategory />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={data}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
