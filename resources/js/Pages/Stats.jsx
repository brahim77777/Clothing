import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
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

const datas = {
  Demands: [
    {
      user_id: 1,
      cart: [
        { product_id: 1, quantity: 4 },
        { product_id: 2, quantity: 1 }
      ],
      status: 'pending',
      payStatus: 'paid'
    },
    {
      user_id: 2,
      cart: [
        { product_id: 3, quantity: 2 }
      ],
      status: 'completed',
      payStatus: 'paid'
    },
    {
      user_id: 3,
      cart: [
        { product_id: 1, quantity: 1 },
        { product_id: 2, quantity: 2 },
        { product_id: 4, quantity: 1 }
      ],
      status: 'pending',
      payStatus: 'unpaid'
    }
  ],
  Favorites: [
    { user_id: 1, product_id: 1 },
    { user_id: 2, product_id: 2 },
    { user_id: 1, product_id: 3 },
    { user_id: 3, product_id: 1 }
  ],
  Reviews: [
    { user_id: 1, product_id: 1, rating: 5 },
    { user_id: 2, product_id: 2, rating: 4 },
    { user_id: 1, product_id: 3, rating: 3 },
    { user_id: 3, product_id: 1, rating: 2 }
  ]
};

const Stats = ({products}) => {
  console.log("hshshhhsh:",products)
  // Prepare data for each chart

  // Bar chart data for product quantities
  const productQuantities = {};
  data.Demands.forEach(demand => {
    demand.cart.forEach(item => {
      if (productQuantities[item.product_id]) {
        productQuantities[item.product_id] += item.quantity;
      } else {
        productQuantities[item.product_id] = item.quantity;
      }
    });
  });

  const barData = {
    labels: Object.keys(productQuantities).map(id => `Product ${id}`),
    datasets: [
      {
        label: 'Quantity',
        data: Object.values(productQuantities),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data for payment status
  const paymentStatus = { paid: 0, unpaid: 0 };
  data.Demands.forEach(demand => {
    if (demand.payStatus === 'paid') {
      paymentStatus.paid++;
    } else {
      paymentStatus.unpaid++;
    }
  });

  const pieData = {
    labels: ['Paid', 'Unpaid'],
    datasets: [
      {
        data: [paymentStatus.paid, paymentStatus.unpaid],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
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

  const lineData = {
    labels: Object.keys(productRatings).map(id => `Product ${id}`),
    datasets: Object.keys(productRatings).map(productId => ({
      label: `Product ${productId}`,
      data: productRatings[productId],
      fill: false,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      tension: 0.1,
    })),
  };

  axios.get("/rating").then(res=>{
    console.log("chart: ",res.data)
  })


  return (

    <Dashboard>
      <h1 className="text-2xl font-bold mb-4 border shadow mt-4 p-2 border-orange-500 text-orange-600 flex justify-between items-center bg-orange-50 rounded txt-white">Statistiques
      <FcStatistics className='w-12 h-12 '/></h1>
      <div className="mb-8 p-2 border border-orange-500 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Product Quantities</h2>
        <Bar data={barData} />
      </div>
      <div className="mb-8 p-2 border border-orange-500 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Payment Status</h2>
        <Pie data={pieData} />
      </div>
      <div className='p-2 border border-orange-500 rounded-md'>
        <h2 className="text-xl font-semibold mb-2  ">Product Ratings</h2>
        <Line data={lineData} />
      </div>
    </Dashboard>
  );
};

export default Stats;
