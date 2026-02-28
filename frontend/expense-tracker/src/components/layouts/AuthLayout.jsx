import React from 'react'
import { Wallet, TrendingUp, TrendingDown, ShieldCheck } from 'lucide-react'

const AuthLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-white'>
      {/* Left panel - form */}
      <div className='w-full md:w-[55vw] flex flex-col px-8 md:px-16 pt-10 pb-12'>
        {/* Logo */}
        <div className='flex items-center gap-2 mb-12'>
          <div className='w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center'>
            <Wallet className='w-5 h-5 text-white' />
          </div>
          <span className='text-lg font-semibold text-gray-900'>Expense Tracker</span>
        </div>

        <div className='flex-1 flex flex-col justify-center max-w-sm mx-auto w-full'>
          {children}
        </div>
      </div>

      {/* Right panel - decorative */}
      <div className='hidden md:flex md:w-[45vw] bg-gradient-to-br from-green-600 to-emerald-700 flex-col justify-between p-12 relative overflow-hidden'>
        {/* Background circles */}
        <div className='absolute top-0 right-0 w-64 h-64 bg-green-500/30 rounded-full -translate-y-1/2 translate-x-1/2' />
        <div className='absolute bottom-0 left-0 w-80 h-80 bg-emerald-800/30 rounded-full translate-y-1/3 -translate-x-1/3' />
        <div className='absolute top-1/2 left-1/2 w-40 h-40 bg-green-400/20 rounded-full -translate-x-1/2 -translate-y-1/2' />

        {/* Content */}
        <div className='relative z-10'>
          <h2 className='text-3xl font-bold text-white leading-snug mb-3'>
            Take control of<br />your finances
          </h2>
          <p className='text-green-100 text-sm leading-relaxed'>
            Track income and expenses in one place.<br />
            Make smarter financial decisions every day.
          </p>
        </div>

        {/* Stats cards */}
        <div className='relative z-10 space-y-3'>
          <StatCard icon={<TrendingUp className='w-5 h-5 text-green-600' />} label='Total Income' value='$6,350.00' bg='bg-white' />
          <StatCard icon={<TrendingDown className='w-5 h-5 text-red-500' />} label='Total Expenses' value='$1,385.00' bg='bg-white/90' />
          <StatCard icon={<ShieldCheck className='w-5 h-5 text-blue-600' />} label='Net Balance' value='$4,965.00' bg='bg-white/80' />
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, label, value, bg }) => (
  <div className={`flex items-center gap-4 ${bg} rounded-xl p-4 shadow-md`}>
    <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
      {icon}
    </div>
    <div>
      <p className='text-xs text-gray-500'>{label}</p>
      <p className='text-lg font-bold text-gray-900'>{value}</p>
    </div>
  </div>
)

export default AuthLayout
