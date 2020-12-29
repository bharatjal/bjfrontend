import React,{useState,useEffect} from "react";
import Card from "react-bootstrap/Card";
import { Pie } from "react-chartjs-2";

export default function AnalyticPie() {
  const [values , valuesUpdate] = useState([])
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        // label: "Total Transactions",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(23, 159, 64, 0.2)",
          "rgba(205, 99, 132, 0.2)",
          "rgba(54, 162, 35, 0.2)",
          "rgba(225, 206, 86, 0.2)",
          "rgba(175, 192, 92, 0.2)",
          "rgba(253, 102, 255, 0.2)",
          "rgba(244, 109, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(23, 159, 64, 0.2)",
          "rgba(205, 99, 132, 0.2)",
          "rgba(54, 162, 35, 0.2)",
          "rgba(225, 206, 86, 0.2)",
          "rgba(175, 192, 92, 0.2)",
          "rgba(253, 102, 255, 0.2)",
          "rgba(244, 100, 60, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(()=>{
    const url= `https://bharatjaldispenser.herokuapp.com/delivery/graph`
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application.json",
        "x-access-token":  localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((res)=>{
            // console.log(res?.deliveries[0]?.sum)
            console.log(res?.deliveries[0]?.sum_of_ltrs)
            valuesUpdate(res?.deliveries[0]?.sum_of_ltrs)
            // dataUpdate(dataLocal)
      })
      .catch((err)=>{
        console.log(err)
      })
  },[])

  return (
    <Card>
      <Card.Title className="text-center pt-3">Monthly Consumption</Card.Title>
      <Card.Body>
        <Pie
          data={data}
          width={100}
          height={300}
          options={{ maintainAspectRatio: false }}
        />
      </Card.Body>
    </Card>
  );
}
