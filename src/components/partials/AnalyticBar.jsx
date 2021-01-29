import React from "react";
import Card from "react-bootstrap/Card";
import { Doughnut, Bar, Line, Pie, Radar, Polar } from "react-chartjs-2";

export default function AnalyticBar(props) {
  const data = {
    // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: props?.labels,
    datasets: [
      {
        label: props?.head,
        data: props?.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 142, 255, 0.2)",
          "rgba(222, 129, 64, 0.2)",
          "rgba(155, 219, 14, 0.2)",
          "rgba(25, 153, 24, 0.2)",
          "rgba(15, 109, 24, 0.2)",
          "rgba(95, 19, 12, 0.2)",
          "rgba(65, 119, 154, 0.2)",
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
      <Card.Title className="text-center pt-3">{props?.topHead}</Card.Title>
      <Card.Body>
        <Bar
          data={data}
          width={100}
          height={300}
          options={{ maintainAspectRatio: false }}
        />
      </Card.Body>
    </Card>
  );
}
