import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <label className='text-sm font-medium text-gray-700'>{label}</label>
      <div className='input-box'>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className='w-full bg-transparent outline-none text-gray-800 placeholder-gray-400'
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-green-600 cursor-pointer flex-shrink-0"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-gray-400 cursor-pointer flex-shrink-0"
                onClick={() => setShowPassword(true)}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Input
