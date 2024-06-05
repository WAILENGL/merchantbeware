import React from 'react';
import OrderTable from './ordertable';
import { useState, useEffect } from 'react';

const Orders = () => {
	const [orders, setOrders] = useState([]);
  
	useEffect(() => {
		fetch('/api/admin/customersinfo')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			console.log('Fetched data:', data);
			setOrders(data);
		})
		.catch((error) => console.error('Error fetching data:', error));
}, []);

 	return (
	  <div>
		<h2>Orders</h2>
		<OrderTable orders={orders} />
	  </div>
	);
  };
  
  export default Orders;
