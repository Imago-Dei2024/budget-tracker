import React, { useState } from 'react';
import { useFinance } from '../Context/FinanceContext';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';
import Input from '../Components/UI/Input';
import { formatCurrency, generateId } from '../Utils/formatters';
import { Plus, Edit, Trash2 } from 'lucide-react';

const BudgetPage = () => {
  const { state, dispatch, actionTypes, summaryData } = useFinance();
  const { income, expenses, investments } = state;

  const [modal, setModal] = useState({ isOpen: false, type: '', data: null });

  const openModal = (type, data = null) => setModal({ isOpen: true, type, data });
  const closeModal = () => setModal({ isOpen: false, type: '', data: null });

  const handleSave = (formData) => {
    const { type, data } = modal;
    const id = data ? data.id : generateId();
    const action = data ? `UPDATE_${type.toUpperCase()}` : `ADD_${type.toUpperCase()}`;
    
    dispatch({ type: actionTypes[action], payload: { ...formData, id } });
    closeModal();
  };
  
  const handleDelete = (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch({ type: actionTypes[`DELETE_${type.toUpperCase()}`], payload: id });
    }
  };

  const renderTable = (title, data, type) => (
    <Card title={title} className="mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source/Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.source || item.category || item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.amount)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.frequency}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openModal(type, item)} className="text-indigo-600 hover:text-indigo-900 mr-3"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(type, item.id)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-200">
        <Button onClick={() => openModal(type)} size="sm" className="flex items-center">
          <Plus size={16} className="mr-1" /> Add {type}
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Budget Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {renderTable('Income', income, 'income')}
          {renderTable('Expenses', expenses, 'expense')}
          {renderTable('Investments', investments, 'investment')}
        </div>
        <div className="lg:col-span-1">
          <Card title="Budget Summary">
            <div className="space-y-4">
              <div className="flex justify-between items-center"><p>Total Income</p><p className="font-medium text-green-600">{formatCurrency(summaryData.totalIncome)}</p></div>
              <div className="flex justify-between items-center"><p>Total Expenses</p><p className="font-medium text-red-600">{formatCurrency(summaryData.totalExpenses)}</p></div>
              <div className="flex justify-between items-center"><p>Total Investments</p><p className="font-medium text-blue-600">{formatCurrency(summaryData.totalInvestments)}</p></div>
              <hr />
              <div className="flex justify-between items-center text-lg">
                <p className="font-bold">Free Cash Flow</p>
                <p className={`font-bold ${summaryData.freeCashFlow >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>{formatCurrency(summaryData.freeCashFlow)}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {modal.isOpen && <BudgetModal {...modal} onClose={closeModal} onSave={handleSave} />}
    </div>
  );
};

const BudgetModal = ({ type, data, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    source: data?.source || '',
    category: data?.category || '',
    type: data?.type || '',
    amount: data?.amount || '',
    frequency: data?.frequency || 'monthly',
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
  
  const title = data ? `Edit ${type}` : `Add ${type}`;
  const sourceFieldLabel = type === 'income' ? 'Source' : type === 'expense' ? 'Category' : 'Type';
  const sourceFieldName = type === 'income' ? 'source' : type === 'expense' ? 'category' : 'type';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <Input label={sourceFieldLabel} id={sourceFieldName} name={sourceFieldName} value={formData[sourceFieldName]} onChange={handleChange} required />
          <Input label="Amount" id="amount" name="amount" type="number" value={formData.amount} onChange={handleChange} required />
          <div className="mb-4">
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
            <select id="frequency" name="frequency" value={formData.frequency} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="annually">Annually</option>
              <option value="one-time">One-time</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetPage;