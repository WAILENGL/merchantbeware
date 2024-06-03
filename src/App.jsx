import { useState } from 'react';
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Orders from './components/Orders/orders';
/* import Layout from '../src/components/Layout/layout'; */
function App() {
		return (
		
			<Routes>
				<Route path="/" element={<Orders />} />
			</Routes>
		
		
	);
}

export default App;
