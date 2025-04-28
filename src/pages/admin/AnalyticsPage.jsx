import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

// Register Chart.js components
ChartJS.register(...registerables);

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Total Orders",
        data: [10, 20, 30, 40],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  });

  // Dummy data for other stats
  const [mostPerformingProduct, setMostPerformingProduct] = useState({
    name: "Product A",
    orders: 100,
  });
  const [underPerformingProduct, setUnderPerformingProduct] = useState({
    name: "Product B",
    orders: 10,
  });
  const [returnCustomerPercentage, setReturnCustomerPercentage] = useState(30);
  const [customerRefunds, setCustomerRefunds] = useState({ number: 5, percentage: 2 });

  useEffect(() => {
    // Here, you would fetch your actual data from the API.
    // For now, we are using dummy data.
    const fetchData = async () => {
      // Dummy API fetch simulation
      setChartData({
        labels: ["May", "June", "July", "August"],
        datasets: [
          {
            label: "Total Orders",
            data: [15, 25, 35, 45],
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
        ],
      });

      setMostPerformingProduct({
        name: "Product A",
        orders: 150,
      });

      setUnderPerformingProduct({
        name: "Product C",
        orders: 5,
      });

      setReturnCustomerPercentage(35);
      setCustomerRefunds({ number: 3, percentage: 1 });
    };

    fetchData();
  }, []);

  return (
    <div className="analytics-page">
      <h1 className="text-3xl font-bold mb-6">E-Commerce Analytics</h1>

      {/* Live chart of total orders */}
      <div className="chart-container mb-8">
        <h5 className="text-xl mb-4 text-green-600">Total Orders Over Time</h5>
        <Line data={chartData} />
      </div>

      {/* Stats Section */}
      <div className="stats-container grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Most Performing Product */}
        <div className="stat-item p-6 border rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">Most Performing Product</h3>
          <p>Name: {mostPerformingProduct.name}</p>
          <p>Orders: {mostPerformingProduct.orders}</p>
        </div>

        {/* Underperforming Product */}
        <div className="stat-item p-6 border rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">Underperforming Product</h3>
          <p>Name: {underPerformingProduct.name}</p>
          <p>Orders: {underPerformingProduct.orders}</p>
        </div>

        {/* Return Customer Percentage */}
        <div className="stat-item p-6 border rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">Return Customer Percentage</h3>
          <p>{returnCustomerPercentage}%</p>
        </div>

        {/* Customer Refunds */}
        <div className="stat-item p-6 border rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">Customer Refunds</h3>
          <p>Number of Refunds: {customerRefunds.number}</p>
          <p>Refund Percentage: {customerRefunds.percentage}%</p>
        </div>
      </div>
    </div>
  );
}
