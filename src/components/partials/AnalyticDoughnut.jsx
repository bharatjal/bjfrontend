import React,{ useState , useEffect} from "react";
import Card from "react-bootstrap/Card";
import { Doughnut, Bar } from "react-chartjs-2";

export default function AnalyticDoughnut() {
  const [values , valuesUpdate] = useState([])
  console.log(values , "valy")
  const dataLocal = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly transactions (2021) in Rs.",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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
  // const [data , dataUpdate] = useState(dataLocal)
  // console.log(data , "data")
  useEffect(()=>{
    const url= `http://3.108.223.75/delivery/graph`
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
            console.log(res?.deliveries[0]?.sum_of_amount)
            valuesUpdate(res?.deliveries[0]?.sum_of_amount.map((i,index)=>{
                if(index == 11){
                  return 0
                }
                else{
                  return i
                }
            }))
            // dataUpdate(dataLocal)
      })
      .catch((err)=>{
        console.log(err)
      })
  },[])
  return (
    <Card>
      <Card.Title className="text-center pt-3">Monthly Transactions </Card.Title>
      <Card.Body>
        <Bar
          data={dataLocal}
          width={100}
          height={300}
          options={{ maintainAspectRatio: false }}
        />
      </Card.Body>
    </Card>
  );
}
