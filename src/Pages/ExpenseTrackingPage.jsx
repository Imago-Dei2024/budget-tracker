import React, { useState } from 'react';
import { useFinance } from '../Context/FinanceContext';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';
import Input from '../Components/UI/Input';
import { formatCurrency, formatDate, generateId } from '../Utils/formatters';
import { Plus, Edit, Trash2 } from 'lucide-react';

const ExpenseTrackingPage = () => {
  const { state, dispatch, actionTypes } = useFinance();
  const { transactions, expenses } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const expenseCategories = [...new Set(expenses.map(e => e.category))];

  const openModal = (transaction = null) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  const handleSave = (formData) => {
    const id = editingTransaction ? editingTransaction.id : generateId();
    const action = editingTransaction ? 'UPDATE_TRANSACTION' : 'ADD_TRANSACTION';
    dispatch({ type: actionTypes[action], payload: { ...formData, id } });
    closeModal();
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: actionTypes.DELETE_TRANSACTION, payload: id });
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
        <Button onClick={() => openModal()} className="flex items-center">
          <Plus size={16} className="mr-1" /> Add Transaction
        </Button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4">{formatDate(transaction.date)}</td>
                  <td className="px-6 py-4">{transaction.category}</td>
                  <td className="px-6 py-4">{transaction.description}</td>
                  <td className="px-6 py-4">{formatCurrency(transaction.amount)}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openModal(transaction)} className="text-indigo-600 hover:text-indigo-900 mr-3"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(transaction.id)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sortedTransactions.length === 0 && <p className="text-center py-10 text-gray-500">No transactions yet.</p>}
      </Card>
      {isModalOpen && <TransactionModal transaction={editingTransaction} categories={expenseCategories} onClose={closeModal} onSave={handleSave} />}
    </div>
  );
};

const TransactionModal = ({ transaction, categories, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    date: transaction?.date ? transaction.date.split('T')[0] : new Date().toISOString().split('T')[0],
    category: transaction?.category || (categories.length > 0 ? categories[0] : ''),
    description: transaction?.description || '',
    amount: transaction?.amount || '',
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSave({ ...formData, amount: parseFloat(formData.amount) }); };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{transaction ? 'Edit' : 'Add'} Transaction</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Date" id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <Input label="Description" id="description" name="description" value={formData.description} onChange={handleChange} required />
          <Input label="Amount" id="amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseTrackingPage;