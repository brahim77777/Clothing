import React from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import dayjs from 'dayjs';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);
import Dashboard from './Dashboard';
import data from "../utils/data.json"
import { FcStatistics } from 'react-icons/fc';
import { useState } from 'react';
import { useEffect } from 'react';

// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);





const Stats = ({products}) => {

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];


    const [commands , setCommands] = useState([])
  // Process data
  const cities = commands.map(item => item.city);
  const cityCount = {};
  cities.forEach(city => {
    cityCount[city] = (cityCount[city] || 0) + 1;
  });

  const statuses = commands.map(item => item.status);
  const statusCount = {};
  statuses.forEach(status => {
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  const totalPrices = commands.map(item => item.total_price);



   useEffect(()=>{
    axios.get("/commands").then(res=>{
        setCommands(res.data.commands)
      })
   },[])



  // Pie chart data for payment status
  const paymentStatus = { paid: 0, pending: 0, verified:0, canceld:0, failed: 0 };
  commands.forEach(demand => {
    switch (demand.status) {
        case 'paid':
            paymentStatus.paid++;
            break;
        case 'pending':
            paymentStatus.pending++;
            break;
        case 'verified':
            paymentStatus.verified++;
            break;
        case 'canceld':
            paymentStatus.canceld++;
        case 'failed':
            paymentStatus.failed++;
            break;

        default:
            break;
    }

  });

  const pieData = {
    labels: ['Paid', 'pending','verified','failed','canceld'],
    datasets: [
      {
        data: [paymentStatus.paid, paymentStatus.pending,paymentStatus.verified,paymentStatus.failed, paymentStatus.canceld],
        backgroundColor: ['rgba(0, 223, 118, 0.5)', 'rgba(241, 123, 57, 0.5)', 'rgba(235, 25, 67,0.5)','rgba(235, 24, 50,0.8)','rgba(25, 25, 170,0.5)'],
        // borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };


 // Process data for the bar chart (Number of Orders Per Month)
 const orderCounts = commands.reduce((acc, order) => {
    const month = dayjs(order.created_at).format('MMMM');
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const sortedOrderCounts = monthNames.reduce((acc, month) => {
    if (orderCounts[month]) {
      acc[month] = orderCounts[month];
    }
    return acc;
  }, {});

  const months = Object.keys(sortedOrderCounts);
  const orderNumbers = Object.values(sortedOrderCounts);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Number of Orders',
        data: orderNumbers,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Process data for the line chart (Total Prices over Time)
  const priceTrends = commands.reduce((acc, order) => {
    const month = dayjs(order.created_at).format('MMMM');
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += order.total_price;
    return acc;
  }, {});

  const sortedPriceTrends = monthNames.reduce((acc, month) => {
    if (priceTrends[month]) {
      acc[month] = priceTrends[month];
    }
    return acc;
  }, {});

  const monthsForPrices = Object.keys(sortedPriceTrends);
  const totalPricesPerMonth = Object.values(sortedPriceTrends);

  const lineChartData = {
    labels: monthsForPrices,
    datasets: [
      {
        label: 'Total Prices',
        data: totalPricesPerMonth,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Process data for the pie chart (Free Shipping vs Paid Shipping)
  const shippingData = commands.reduce((acc, order) => {
    if (order.free_shipping) {
      acc.free++;
    } else {
      acc.paid++;
    }
    return acc;
  }, { free: 0, paid: 0 });

  const pieShippingData = {
    labels: ['Free Shipping', 'Paid Shipping'],
    datasets: [
      {
        data: [shippingData.free, shippingData.paid],
        backgroundColor: ['rgba(0, 223, 118, 0.5)', 'rgba(241, 123, 57, 0.5)'],
        borderWidth: 1,
      },
    ],
  };



  return (

    <Dashboard>

      <h1 className="text-2xl font-bold mb-4 border shadow mt-4 p-2 border-orange-500 text-orange-600 flex justify-between items-center bg-orange-50 rounded txt-white">Statistiques
            <FcStatistics className='w-12 h-12 '/>
        </h1>

        <div className="mb-8 p-2 border border-orange-500 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Number of Orders Per Month</h2>
            <Bar data={chartData} />
        </div>

        <div className="mb-8 p-2 border border-orange-500 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Payment Status</h2>
            <div className='m-auto flex justify-center lg:max-w-[30rem]'>
            <Doughnut data={pieData} />
            </div>
        </div>

        <div className="mb-8 p-2 border border-orange-500 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Total Prices Over Time</h2>
            <Line data={lineChartData} />
        </div>

        <div className="mb-8 p-2 border border-orange-500 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Free vs Paid Shipping</h2>
            <div className='m-auto flex justify-center lg:max-w-[30rem]'>
            <Pie data={pieShippingData} />
            </div>
        </div>
    </Dashboard>
  );
};

export default Stats;
