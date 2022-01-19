import React from "react";

import Table from "../components/table/Table";

import { useState, useEffect } from "react";
import axios from "axios";
import { AuthStr, HOST } from "../data";
export default function Customers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // const AuthStr =
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTNkNTNmOTZhOTJmMGY3NDc0NDkwYiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciIsIkFkbWluIl0sImNyZWF0ZWRfYXQiOiIyMDIyLTAxLTE3VDEyOjU4OjA1LjQ5MFoiLCJpYXQiOjE2NDI0MjQyODUsImV4cCI6MTY0MzAyOTA4NX0.jeVlBXSjIE1Qrikg73vF-P5982ZcyOV9Kt4GdY-MvRo";
    axios
      .get(HOST + "/admin/users", { headers: { Authorization: AuthStr } })
      .then((res) => {
        const users = res.data.data;
        setData(users);
      })
      .catch((err) => console.log(err));
  }, []);
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const customerTableHead = ["", "name", "email", "phone", "address"];

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.address}</td>
    </tr>
  );
  return (
    <div>
      <h2 className="page-header">users</h2>
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
