import React, { useState } from 'react'
import { Plus, TrendingDown, Calendar, Download, Trash2, X } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'

const Expense = () => {
  const [timePeriod, setTimePeriod] = useState('month')
  const [showModal, setShowModal] = useState(false)
  const [emoji, setEmoji] = useState('🛒')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  // TODO: Replace with API data
  const [expenseData, setExpenseData] = useState([
    { id: 1, emoji: '🛒', name: 'Grocery Shopping', amount: 120.50, date: '2026-02-27' },
    { id: 2, emoji: '💡', name: 'Electric Bill', amount: 85.00, date: '2026-02-26' },
    { id: 3, emoji: '🍔', name: 'Restaurant', amount: 65.00, date: '2026-02-23' },
    { id: 4, emoji: '🚗', name: 'Gas', amount: 45.00, date: '2026-02-22' },
    { id: 5, emoji: '🎬', name: 'Netflix Subscription', amount: 15.99, date: '2026-02-20' },
    { id: 6, emoji: '👕', name: 'Shopping', amount: 120.00, date: '2026-02-18' },
  ])

  const commonEmojis = ['🛒', '🍔', '🚗', '🏠', '🎬', '👕', '🎮', '✈️', '💊']

  const chartData = [
    { month: 'Jan', Spending: 1150 },
    { month: 'Feb', Spending: 1350 },
    { month: 'Mar', Spending: 920 },
    { month: 'Apr', Spending: 1380 },
    { month: 'May', Spending: 1020 },
    { month: 'Jun', Spending: 1200 },
  ]

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0)

  // handle add expense
  const handleAddExpense = () => {
    if (!category.trim()) { setError('Please enter a category'); return }
    if (!amount || isNaN(amount) || Number(amount) <= 0) { setError('Please enter a valid amount'); return }
    if (!date) { setError('Please select a date'); return }

    setError('')
    const newEntry = { id: Date.now(), emoji, name: category.trim(), amount: parseFloat(amount), date }
    setExpenseData(prev => [newEntry, ...prev])
    // TODO: API call to save expense

    setShowModal(false)
    setEmoji('🛒')
    setCategory('')
    setAmount('')
    setDate('')
  }

  const handleDelete = (id) => {
    setExpenseData(prev => prev.filter(item => item.id !== id))
    // TODO: API call to delete expense
  }

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-7xl mx-auto'>

        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-1'>Expenses</h1>
            <p className='text-sm text-gray-500'>Track your spending</p>
          </div>
          <div className='flex items-center gap-3'>
            <select
              value={timePeriod}
              onChange={({ target }) => setTimePeriod(target.value)}
              className='text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-green-500'
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            <button onClick='' className='flex items-center gap-2 px-4 py-2 text-sm font-medium border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors'>
              <Download className='w-4 h-4' /> Download CSV
            </button>

            <button onClick={() => setShowModal(true)} className='flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
              <Plus className='w-4 h-4' /> Add Expense
            </button>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-sm font-medium text-gray-500'>Total Expenses This Month</p>
            <div className='w-11 h-11 bg-red-100 rounded-lg flex items-center justify-center'>
              <TrendingDown className='w-5 h-5 text-red-600' />
            </div>
          </div>
          <div className='text-4xl font-bold text-red-600'>${totalExpenses.toFixed(2)}</div>
          <p className='text-sm text-gray-400 mt-1'>February 2026</p>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6'>
          <h3 className='font-semibold text-gray-900 mb-4'>Spending Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Spending" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
          <h3 className='font-semibold text-gray-900 mb-4'>Expense Transactions</h3>

          {expenseData.length === 0 ? (
            <div className='text-center py-10 text-gray-400'>
              <TrendingDown className='w-10 h-10 mx-auto mb-2 opacity-40' />
              <p className='text-sm'>No expenses yet. Add your first one!</p>
            </div>
          ) : (
            <div className='space-y-3'>
              {expenseData.map((expense) => (
                <div key={expense.id} className='flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl'>
                      {expense.emoji}
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900'>{expense.name}</p>
                      <span className='text-sm text-gray-400 flex items-center gap-1'>
                        <Calendar className='w-3 h-3' /> {expense.date}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='text-xl font-bold text-red-600'>-${expense.amount.toFixed(2)}</span>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className='opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {showModal && (
        <AddExpenseModal
          emoji={emoji}
          setEmoji={setEmoji}
          category={category}
          setCategory={setCategory}
          amount={amount}
          setAmount={setAmount}
          date={date}
          setDate={setDate}
          error={error}
          commonEmojis={commonEmojis}
          onAdd={handleAddExpense}
          onClose={() => { setShowModal(false); setError('') }}
        />
      )}
    </div>
  )
}

export default Expense

const AddExpenseModal = ({ emoji, setEmoji, category, setCategory, amount, setAmount, date, setDate, error, commonEmojis, onAdd, onClose }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
    <div className='absolute inset-0 bg-black/50' onClick={onClose} />
    <div className='relative z-10 bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6'>

      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-gray-900'>Add New Expense</h2>
        <button onClick={onClose} className='text-gray-400 hover:text-gray-600'>
          <X className='w-5 h-5' />
        </button>
      </div>
      <p className='text-sm text-gray-500 mb-5'>Add a new expense transaction to track your spending.</p>

      <div className='space-y-4'>
        <div>
          <label className='text-sm font-medium text-gray-700 mb-2 block'>Choose an Emoji</label>
          <div className='flex gap-2 flex-wrap'>
            {commonEmojis.map((e) => (
              <button
                key={e}
                type='button'
                onClick={() => setEmoji(e)}
                className={`text-2xl w-11 h-11 rounded-lg border-2 transition-all hover:scale-105 ${emoji === e ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
              >
                {e}
              </button>
            ))}
          </div>
          <div className='flex items-center gap-2 mt-2'>
            <input
              placeholder="Custom emoji"
              value={emoji}
              onChange={({ target }) => setEmoji(target.value)}
              maxLength={2}
              className='w-20 text-center text-lg border border-gray-300 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-red-500'
            />
            <span className='text-sm text-gray-500'>Selected: <span className='text-lg'>{emoji}</span></span>
          </div>
        </div>

        <div>
          <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Category</label>
          <input
            placeholder="e.g., Food, Transportation, Utilities"
            value={category}
            onChange={({ target }) => setCategory(target.value)}
            className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500'
          />
        </div>

        <div>
          <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Amount</label>
          <div className='relative'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm'>$</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={({ target }) => setAmount(target.value)}
              className='w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500'
            />
          </div>
        </div>

        <div>
          <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Date</label>
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500'
          />
        </div>

        {error && <p className='text-red-500 text-xs'>⚠ {error}</p>}
      </div>

      <div className='flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100'>
        <button onClick={onClose} className='px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
          Cancel
        </button>
        <button onClick={onAdd} className='px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
          Add Expense
        </button>
      </div>

    </div>
  </div>
)