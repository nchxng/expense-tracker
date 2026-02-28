import React, { useState } from 'react'
import { Plus, TrendingUp, Calendar, Download, Trash2, X } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Income = () => {
  const [timePeriod, setTimePeriod] = useState('month')
  const [showModal, setShowModal] = useState(false)
  const [emoji, setEmoji] = useState('💰')
  const [incomeSource, setIncomeSource] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  // TODO: Replace with API data
  const [incomeData, setIncomeData] = useState([
    { id: 1, emoji: '💰', source: 'Salary', amount: 5000, date: '2026-02-28' },
    { id: 2, emoji: '💼', source: 'Freelance Project', amount: 800, date: '2026-02-24' },
    { id: 3, emoji: '📈', source: 'Investment Returns', amount: 350, date: '2026-02-20' },
    { id: 4, emoji: '⭐', source: 'Other Income', amount: 200, date: '2026-02-15' },
  ])

  const commonEmojis = ['💰', '💵', '💸', '💳', '🏦', '💼', '📊', '📈', '⭐']

  const chartData = [
    { month: 'Jan', Income: 5800 },
    { month: 'Feb', Income: 6350 },
    { month: 'Mar', Income: 5200 },
    { month: 'Apr', Income: 6800 },
    { month: 'May', Income: 5500 },
    { month: 'Jun', Income: 6100 },
  ]

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0)

  // handle add income
  const handleAddIncome = () => {
    if (!incomeSource.trim()) { setError('Please enter an income source'); return }
    if (!amount || isNaN(amount) || Number(amount) <= 0) { setError('Please enter a valid amount'); return }
    if (!date) { setError('Please select a date'); return }

    setError('')
    const newEntry = { id: Date.now(), emoji, source: incomeSource.trim(), amount: parseFloat(amount), date }
    setIncomeData(prev => [newEntry, ...prev])
    // TODO: API call to save income

    setShowModal(false)
    setEmoji('💰')
    setIncomeSource('')
    setAmount('')
    setDate('')
  }

  const handleDelete = (id) => {
    setIncomeData(prev => prev.filter(item => item.id !== id))
    // TODO: API call to delete income
  }

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-7xl mx-auto'>

        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-1'>Income</h1>
            <p className='text-sm text-gray-500'>Track your income sources</p>
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

            <button onClick='' className='flex items-center gap-2 px-4 py-2 text-sm font-medium border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors'>
              <Download className='w-4 h-4' /> Download CSV
            </button>

            <button onClick={() => setShowModal(true)} className='flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'>
              <Plus className='w-4 h-4' /> Add Income
            </button>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-sm font-medium text-gray-500'>Total Income This Month</p>
            <div className='w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center'>
              <TrendingUp className='w-5 h-5 text-green-600' />
            </div>
          </div>
          <div className='text-4xl font-bold text-green-600'>${totalIncome.toLocaleString()}.00</div>
          <p className='text-sm text-gray-400 mt-1'>February 2026</p>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6'>
          <h3 className='font-semibold text-gray-900 mb-4'>Income Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
          <h3 className='font-semibold text-gray-900 mb-4'>Income Transactions</h3>

          {incomeData.length === 0 ? (
            <div className='text-center py-10 text-gray-400'>
              <TrendingUp className='w-10 h-10 mx-auto mb-2 opacity-40' />
              <p className='text-sm'>No income entries yet. Add your first one!</p>
            </div>
          ) : (
            <div className='space-y-3'>
              {incomeData.map((income) => (
                <div key={income.id} className='flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl'>
                      {income.emoji}
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900'>{income.source}</p>
                      <span className='text-sm text-gray-400 flex items-center gap-1'>
                        <Calendar className='w-3 h-3' /> {income.date}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='text-xl font-bold text-green-600'>+${income.amount.toLocaleString()}.00</span>
                    <button
                      onClick={() => handleDelete(income.id)}
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
        <AddIncomeModal
          emoji={emoji}
          setEmoji={setEmoji}
          incomeSource={incomeSource}
          setIncomeSource={setIncomeSource}
          amount={amount}
          setAmount={setAmount}
          date={date}
          setDate={setDate}
          error={error}
          commonEmojis={commonEmojis}
          onAdd={handleAddIncome}
          onClose={() => { setShowModal(false); setError('') }}
        />
      )}
    </div>
  )
}

export default Income

const AddIncomeModal = ({ emoji, setEmoji, incomeSource, setIncomeSource, amount, setAmount, date, setDate, error, commonEmojis, onAdd, onClose }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
    <div className='absolute inset-0 bg-black/50' onClick={onClose} />
    <div className='relative z-10 bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6'>

      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-gray-900'>Add New Income</h2>
        <button onClick={onClose} className='text-gray-400 hover:text-gray-600'>
          <X className='w-5 h-5' />
        </button>
      </div>
      <p className='text-sm text-gray-500 mb-5'>Add a new income transaction to track your earnings.</p>

      <div className='space-y-4'>
        <div>
          <label className='text-sm font-medium text-gray-700 mb-2 block'>Choose an Emoji</label>
          <div className='flex gap-2 flex-wrap'>
            {commonEmojis.map((e) => (
              <button
                key={e}
                type='button'
                onClick={() => setEmoji(e)}
                className={`text-2xl w-11 h-11 rounded-lg border-2 transition-all hover:scale-105 ${emoji === e ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
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
              className='w-20 text-center text-lg border border-gray-300 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-green-500'
            />
            <span className='text-sm text-gray-500'>Selected: <span className='text-lg'>{emoji}</span></span>
          </div>
        </div>

        <div>
          <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Income Source</label>
          <input
            placeholder="e.g., Salary, Freelance, Investment"
            value={incomeSource}
            onChange={({ target }) => setIncomeSource(target.value)}
            className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500'
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
              className='w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>
        </div>

        <div>
          <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Date</label>
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>

        {error && <p className='text-red-500 text-xs'>⚠ {error}</p>}
      </div>

      <div className='flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100'>
        <button onClick={onClose} className='px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
          Cancel
        </button>
        <button onClick={onAdd} className='px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'>
          Add Income
        </button>
      </div>

    </div>
  </div>
)