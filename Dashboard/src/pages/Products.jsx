import React from "react";

import Table from "../components/table/Table";

// import customerList from "../assets/JsonData/customers-list.json";
import { useState, useEffect } from "react";
import axios from "axios";
import { HOST } from "../data";
export default function Product() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(HOST + "/products")
      .then((res) => {
        const products = res.data.data.products;
        setData(products);
      })
      .catch((err) => console.log(err));
  }, []);
  const customerTableHead = ["", "name", "rating", "quantity", "sold", "view", "price"];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.rating}</td>
      <td>{item.quantity}</td>
      <td>{item.sold}</td>
      <td>{item.view}</td>
      <td>{item.price}</td>
    </tr>
  );
  return (
    <div>
      <h2 className="page-header">products</h2>
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
