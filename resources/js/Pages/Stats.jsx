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

  const cityData = {
    labels: Object.keys(cityCount),
    datasets: [
      {
        label: '# of Orders',
        data: Object.values(cityCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const statusData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        label: '# of Orders',
        data: Object.values(statusCount),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  const priceData = {
    labels: commands.map((_, index) => `Order ${index + 1}`),
    datasets: [
      {
        label: 'Total Price',
        data: totalPrices,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };



   useEffect(()=>{
    axios.get("/commands").then(res=>{
        setCommands(res.data.commands)
      })
   },[])


  console.log("commands from stats:",commands)
  // Prepare data for each chart

  // Bar chart data for product quantities
  let countProducts = 0
  let days = []
  let years = []


  let qntMonth1 = 0

  commands.map(e=>{
    const date = new Date(e.created_at);
    if(date.getMonth().toLocaleString() == 1){
         qntMonth1+=e.products.split(" ").length
    }
  })

  console.log("month 1: ",qntMonth1)

  commands.map(e=>{
    // e.products.split(" ").map(e=>{
        countProducts +=e.products.split(" ").length
        const date = new Date(e.created_at)
        years.push(date.getFullYear())
        days.push(date.getDay()+1)
    // })
  })

  console.log(countProducts)
  console.log(years)
  console.log(days)



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

  // Line chart data for product ratings
  const productRatings = {};
  data.Reviews.forEach(review => {
    if (productRatings[review.product_id]) {
      productRatings[review.product_id].push(review.rating);
    } else {
      productRatings[review.product_id] = [review.rating];
    }
  });



  const orderCounts = commands.reduce((acc, order) => {
    const month = dayjs(order.created_at).format('MMMM');
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const months = Object.keys(orderCounts);
  const orderNumbers = Object.values(orderCounts);

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




  return (

    <Dashboard>
      <h1 className="text-2xl font-bold mb-4 border shadow mt-4 p-2 border-orange-500 text-orange-600 flex justify-between items-center bg-orange-50 rounded txt-white">Statistiques
      <FcStatistics className='w-12 h-12 '/></h1>
      <div className="mb-8 p-2 border border-orange-500 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Number of Orders Per Month</h2>
        <Bar data={chartData} />
      </div>
      <div className="mb-8 p-2 border border-orange-500 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Payment Status</h2>
        <div className=' m-auto flex justify-center lg:max-w-[30rem]'>
        <Doughnut  data={pieData} />
        </div>
      </div>
      <div className='p-2 border border-orange-500 rounded-md'>
        <h2 className="text-xl font-semibold mb-2  ">Product Ratings</h2>
      </div>
    </Dashboard>
  );
};

export default Stats;
