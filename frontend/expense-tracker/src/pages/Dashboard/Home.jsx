import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const Home = () => {
  const navigate = useNavigate()
  const [timePeriod, setTimePeriod] = useState('month')

  // TODO: Replace with API data
  const recentTransactions = [
    { id: 1, name: 'Grocery Shopping', date: '2026-02-27', category: 'Food', amount: -120.50, type: 'expense' },
    { id: 2, name: 'Salary', date: '2026-02-28', category: 'Salary', amount: 5000.00, type: 'income' },
    { id: 3, name: 'Electric Bill', date: '2026-02-26', category: 'Utilities', amount: -85.00, type: 'expense' },
    { id: 4, name: 'Freelance Project', date: '2026-02-24', category: 'Freelance', amount: 800.00, type: 'income' },
    { id: 5, name: 'Restaurant', date: '2026-02-23', category: 'Food', amount: -65.00, type: 'expense' },
  ]

  const financialOverviewData = [
    { name: 'Income', value: 6350, color: '#10b981' },
    { name: 'Expenses', value: 1385, color: '#ef4444' },
    { name: 'Balance', value: 4965, color: '#3b82f6' },
  ]

  const expensesBreakdownData = [
    { month: 'Jan', Expenses: 1150 },
    { month: 'Feb', Expenses: 1350 },
    { month: 'Mar', Expenses: 920 },
    { month: 'Apr', Expenses: 1380 },
    { month: 'May', Expenses: 1020 },
    { month: 'Jun', Expenses: 1200 },
  ]

  const incomeSourcesData = [
    { name: 'Salary', value: 5000, color: '#10b981' },
    { name: 'Freelance', value: 800, color: '#8b5cf6' },
    { name: 'Investment', value: 350, color: '#3b82f6' },
    { name: 'Other', value: 200, color: '#f59e0b' },
  ]

  const expensesByCategory = [
    { category: 'Food', amount: 450, color: '#ef4444' },
    { category: 'Utilities', amount: 285, color: '#f59e0b' },
    { category: 'Transportation', amount: 180, color: '#3b82f6' },
    { category: 'Entertainment', amount: 150, color: '#ec4899' },
    { category: 'Shopping', amount: 320, color: '#06b6d4' },
  ]

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-7xl mx-auto'>

        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-1'>Welcome back!</h1>
            <p className='text-sm text-gray-500'>Here's your financial overview</p>
          </div>
          <select
            value={timePeriod}
            onChange={({ target }) => setTimePeriod(target.value)}
            className='text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-green-500'
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-8'>
          <StatCard title="Total Balance" value="$4,965.00" sub="Available funds" icon={<Wallet className='w-5 h-5 text-blue-600' />} iconBg="bg-blue-100" valueColor="text-blue-600" />
          <StatCard title="Total Income" value="$6,350.00" sub="For this month" icon={<TrendingUp className='w-5 h-5 text-green-600' />} iconBg="bg-green-100" valueColor="text-green-600" />
          <StatCard title="Total Expenses" value="$1,385.00" sub="For this month" icon={<TrendingDown className='w-5 h-5 text-red-600' />} iconBg="bg-red-100" valueColor="text-red-600" />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-semibold text-gray-900'>Recent Transactions</h3>
              <button onClick={() => navigate('/expense')} className='flex items-center gap-1 text-sm text-green-600 hover:text-green-700'>
                See All <ArrowRight className='w-4 h-4' />
              </button>
            </div>
            <div className='space-y-3'>
              {recentTransactions.map((t) => (
                <div key={t.id} className='flex items-center justify-between py-1'>
                  <div className='flex items-center gap-3'>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {t.type === 'income'
                        ? <ArrowUpRight className='w-5 h-5 text-green-600' />
                        : <ArrowDownRight className='w-5 h-5 text-red-600' />
                      }
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>{t.name}</p>
                      <p className='text-xs text-gray-400'>{t.date} · {t.category}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'income' ? '+' : ''}{t.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
            <h3 className='font-semibold text-gray-900 mb-4'>Financial Overview</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={financialOverviewData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={5} dataKey="value">
                  {financialOverviewData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className='mt-3 space-y-2'>
              {financialOverviewData.map((item) => (
                <div key={item.name} className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2.5 h-2.5 rounded-full' style={{ backgroundColor: item.color }} />
                    <span className='text-sm text-gray-600'>{item.name}</span>
                  </div>
                  <span className='text-sm font-semibold text-gray-900'>${item.value.toLocaleString()}.00</span>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
            <h3 className='font-semibold text-gray-900 mb-4'>Expenses Breakdown</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={expensesBreakdownData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="Expenses" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className='mt-4 space-y-2'>
              <p className='text-sm font-semibold text-gray-800'>By Category</p>
              {expensesByCategory.map((item) => (
                <div key={item.category} className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2.5 h-2.5 rounded-full' style={{ backgroundColor: item.color }} />
                    <span className='text-sm text-gray-600'>{item.category}</span>
                  </div>
                  <span className='text-sm font-semibold text-gray-900'>${item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-semibold text-gray-900'>Income Sources</h3>
              <button onClick={() => navigate('/income')} className='flex items-center gap-1 text-sm text-green-600 hover:text-green-700'>
                See All <ArrowRight className='w-4 h-4' />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={incomeSourcesData} cx="50%" cy="50%" outerRadius={85} dataKey="value">
                  {incomeSourcesData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className='mt-3 space-y-2'>
              {incomeSourcesData.map((item) => (
                <div key={item.name} className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2.5 h-2.5 rounded-full' style={{ backgroundColor: item.color }} />
                    <span className='text-sm text-gray-600'>{item.name}</span>
                  </div>
                  <span className='text-sm font-semibold text-gray-900'>${item.value.toLocaleString()}.00</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home

const StatCard = ({ title, value, sub, icon, iconBg, valueColor }) => (
  <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
    <div className='flex items-center justify-between mb-3'>
      <p className='text-sm font-medium text-gray-500'>{title}</p>
      <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>{icon}</div>
    </div>
    <div className={`text-3xl font-bold ${valueColor}`}>{value}</div>
    <p className='text-xs text-gray-400 mt-1'>{sub}</p>
  </div>
)