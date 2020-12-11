import React from "react";
import Card from "react-bootstrap/Card";
import { Doughnut } from "react-chartjs-2";

export default function AnalyticDoughnut() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "# of Votes",
        data: [35, 19, 30, 21, 32, 43],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card>
      <Card.Title className="text-center pt-3">Monthly Transactions </Card.Title>
      <Card.Body>
        <Doughnut
          data={data}
          width={100}
          height={300}
          options={{ maintainAspectRatio: false }}
        />
      </Card.Body>
    </Card>
  );
}
