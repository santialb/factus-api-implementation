import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState({ title: '', amount: '' });

  useEffect(() => {
    api.get('/bills')
      .then(response => setBills(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCreateBill = () => {
    api.post('/bills', newBill)
      .then(response => {
        setBills([...bills, response.data]);
        setNewBill({ title: '', amount: '' });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteBill = (id) => {
    api.delete(`/bills/${id}`)
      .then(() => {
        setBills(bills.filter(bill => bill.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Bills</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newBill.title}
          onChange={(e) => setNewBill({ ...newBill, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Amount"
          value={newBill.amount}
          onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
        />
        <button onClick={handleCreateBill}>Create Bill</button>
      </div>
      <ul>
        {bills.map(bill => (
          <li key={bill.id}>
            {bill.title} - ${bill.amount}
            <button onClick={() => handleDeleteBill(bill.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bills;