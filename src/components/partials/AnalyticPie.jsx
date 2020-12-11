import React from "react";
import Card from "react-bootstrap/Card";
import { Pie } from "react-chartjs-2";

export default function AnalyticPie() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        // label: "Total Transactions",
        data: [31500, 42190, 26360, 22638, 28332, 83833],
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
