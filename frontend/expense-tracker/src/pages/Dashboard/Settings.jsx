import React, { useState } from 'react'
import { User, Mail, Camera } from 'lucide-react'

const Settings = () => {
  const userInfo = JSON.parse(localStorage.getItem('user') || '{}')
  const initials = userInfo.fullName
    ? userInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  const [firstName, setFirstName] = useState(userInfo.fullName?.split(' ')[0] || '')
  const [lastName, setLastName] = useState(userInfo.fullName?.split(' ').slice(1).join(' ') || '')
  const [email, setEmail] = useState(userInfo.email || '')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // TODO: API call to update profile
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-2xl mx-auto'>

        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-1'>Settings</h1>
          <p className='text-sm text-gray-500'>Manage your account</p>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
          <h3 className='font-semibold text-gray-900 flex items-center gap-2 mb-6'>
            <User className='w-5 h-5' /> Profile Information
          </h3>

          <div className='flex items-center gap-5 mb-6'>
            <div className='w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700'>
              {initials}
            </div>
            <div>
              <button className='flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
                <Camera className='w-4 h-4' /> Change Photo
              </button>
              <p className='text-xs text-gray-400 mt-1.5'>JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='text-sm font-medium text-gray-700 mb-1.5 block'>First Name</label>
              <input
                value={firstName}
                onChange={({ target }) => setFirstName(target.value)}
                className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500'
              />
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Last Name</label>
              <input
                value={lastName}
                onChange={({ target }) => setLastName(target.value)}
                className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500'
              />
            </div>
          </div>

          <div className='mb-6'>
            <label className='text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5'>
              <Mail className='w-3.5 h-3.5' /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>

          <button
            onClick={handleSave}
            className={`px-5 py-2 text-sm font-semibold text-white rounded-lg transition-colors ${saved ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Settings