import React, { useEffect, useState } from "react";

import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import axios from "axios";
import { AuthStr, HOST } from "../data";
export default function Dashboard() {
  const chartOptions = {
    options: {
      color: ["#6ab04c"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };

  const topCustomers = {
    head: ["user", "total orders", "total price"],
  };

  const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

  const renderCusomerBody = (item, index) => (
    <tr key={index}>
      <td>{item.user}</td>
      <td>{item.totalOrder}</td>
      <td>{item.totalPrice}</td>
    </tr>
  );

  const latestOrders = {
    header: ["user", "total price", "date"],
  };

  const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

  const renderOrderBody = (item, index) => (
    <tr key={index}>
      <td>{item.user}</td>
      <td>{item.totalPrice}</td>
      <td>{item.day}</td>
    </tr>
  );
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const [income, setIncome] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [topCustomer, setTopCustomer] = useState([]);
  const [latestOrder, setLatestOrder] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    axios
      .get(HOST + "/admin/stats/income", { headers: { Authorization: AuthStr } })
      .then((res) => {
        const data = res.data.data;
        setIncome(data[0].totalSaleAmount);
      })
      .catch((err) => console.log(err));
    axios
      .get(HOST + "/admin/stats/sales", { headers: { Authorization: AuthStr } })
      .then((res) => {
        const data = res.data.data;
        let total = 0;
        data.map((salesMonth) => (total += salesMonth.sold));
        setTotalSales(total);
      })
      .catch((err) => console.log(err));
    axios
      .get(HOST + "/admin/stats/top-customer", { headers: { Authorization: AuthStr } })
      .then((res) => {
        let data = [];
        let duLieu = res.data.data;
        if (duLieu.length < 5) {
          for (let i = 0; i < duLieu.length; i++) {
            duLieu[i].totalPrice = duLieu[i].totalPrice
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            data[i] = duLieu[i];
          }
        } else {
          for (let i = 0; i < 5; i++) {
            duLieu[i].totalPrice = duLieu[i].totalPrice
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            data[i] = duLieu[i];
          }
        }
        setTopCustomer(data);
      })
      .catch((err) => console.log(err));
    axios
      .get(HOST + "/admin/stats/user-orders", { headers: { Authorization: AuthStr } })
      .then((res) => {
        let data = [];
        let duLieu = res.data.data;
        if (duLieu.length < 5) {
          for (let i = 0; i < duLieu.length; i++) {
            duLieu[i].totalPrice = duLieu[i].totalPrice
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            data[i] = duLieu[i];
          }
        } else {
          for (let i = 0; i < 5; i++) {
            duLieu[i].totalPrice = duLieu[i].totalPrice
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            data[i] = duLieu[i];
          }
        }
        setLatestOrder(data);
      })
      .catch((err) => console.log(err));
    axios
      .get(HOST + "/admin/stats/income?month=true", { headers: { Authorization: AuthStr } })
      .then((res) => {
        let data = [];
        let maxMonth = 0;
        let duLieu = res.data.data;
        for (let i = 0; i < duLieu.length; i++) {
          if (duLieu[i].year === 2022) {
            if (duLieu[i].month > maxMonth) maxMonth = duLieu[i].month;
            data[duLieu[i].month - 1] = duLieu[i].totalSaleAmount;
          }
        }
        for (let i = 0; i < maxMonth; i++) data[i] = 0;
        for (let i = 0; i < duLieu.length; i++) {
          if (duLieu[i].year === 2022) {
            data[duLieu[i].month - 1] = duLieu[i].totalSaleAmount;
          }
        }
        setDataChart(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const statusCardData = [
    {
      icon: "bx bx-shopping-bag",
      count: totalSales.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      title: "Total sales",
    },
    {
      icon: "bx bx-dollar-circle",
      count: income.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      title: "Total income",
    },
  ];
  const chartSeries = [
    {
      name: "Income",
      data: dataChart,
    },
  ];
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-5">
          <div className="row">
            {statusCardData.map((item, index) => (
              <div className="col-12" key={index}>
                <StatusCard icon={item.icon} count={item.count} title={item.title} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-7">
          <div className="card full-height">
            {/* chart */}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartSeries}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="col-5">
          <div className="card">
            <div className="card__header">
              <h3>top customers</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={topCustomer}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className="card">
            <div className="card__header">
              <h3>latest orders</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrder}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
