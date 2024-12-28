// Frontend Code - React.js Portfolio Tracker

// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add" element={<StockForm />} />
                    <Route path="/list" element={<StockList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

// Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <h1>Portfolio Tracker</h1>
            <div className="actions">
                <Link to="/add">Add Stock</Link>
                <Link to="/list">View Stocks</Link>
            </div>
        </div>
    );
}

export default Dashboard;

// StockForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './StockForm.css';

function StockForm() {
    const [stock, setStock] = useState({ name: '', ticker: '', quantity: 1, buyPrice: 0 });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStock({ ...stock, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/stocks', stock)
            .then((response) => alert('Stock added successfully!'))
            .catch((error) => console.error(error));
    };

    return (
        <form className="stock-form" onSubmit={handleSubmit}>
            <h2>Add Stock</h2>
            <label>Name</label>
            <input type="text" name="name" value={stock.name} onChange={handleChange} required />

            <label>Ticker</label>
            <input type="text" name="ticker" value={stock.ticker} onChange={handleChange} required />

            <label>Quantity</label>
            <input type="number" name="quantity" value={stock.quantity} onChange={handleChange} required />

            <label>Buy Price</label>
            <input type="number" name="buyPrice" value={stock.buyPrice} onChange={handleChange} required />

            <button type="submit">Add Stock</button>
        </form>
    );
}

export default StockForm;

// StockList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StockList.css';

function StockList() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        axios.get('/api/stocks')
            .then((response) => setStocks(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/stocks/${id}`)
            .then(() => setStocks(stocks.filter((stock) => stock.id !== id)))
            .catch((error) => console.error(error));
    };

    return (
        <div className="stock-list">
            <h2>Stock Holdings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Quantity</th>
                        <th>Buy Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock) => (
                        <tr key={stock.id}>
                            <td>{stock.name}</td>
                            <td>{stock.ticker}</td>
                            <td>{stock.quantity}</td>
                            <td>{stock.buyPrice}</td>
                            <td>
                                <button onClick={() => handleDelete(stock.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StockList;

// App.css
.App {
    font-family: Arial, sans-serif;
    text-align: center;
}

// Dashboard.css
.dashboard {
    padding: 20px;
}
.actions a {
    margin: 10px;
    padding: 10px 15px;
    text-decoration: none;
    color: white;
    background-color: #007BFF;
    border-radius: 5px;
}

// StockForm.css
.stock-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.stock-form label {
    display: block;
    margin: 10px 0 5px;
}

// StockList.css
.stock-list {
    padding: 20px;
}
.stock-list table {
    width: 100%;
    border-collapse: collapse;
}
.stock-list th, .stock-list td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
}
.stock-list button {
    background-color: #DC3545;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
}
