import React, { useState, useRef, useEffect, createContext, useContext } from 'react'

// ─── Card ────────────────────────────────────────────────────────────────────
export const Card = ({ className = '', children, ...props }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`} {...props}>
    {children}
  </div>
)

export const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`p-6 pb-3 ${className}`} {...props}>{children}</div>
)

export const CardTitle = ({ className = '', children, ...props }) => (
  <h3 className={`text-base font-semibold text-gray-900 ${className}`} {...props}>{children}</h3>
)

export const CardContent = ({ className = '', children, ...props }) => (
  <div className={`px-6 pb-6 ${className}`} {...props}>{children}</div>
)

// ─── Button ──────────────────────────────────────────────────────────────────
export const Button = ({ className = '', variant = 'default', size = 'default', children, ...props }) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-50'
  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    ghost: 'text-gray-600 hover:bg-gray-100 bg-transparent',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  }
  const sizes = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2',
  }
  return (
    <button className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>
      {children}
    </button>
  )
}

// ─── Input ───────────────────────────────────────────────────────────────────
export const UIInput = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${className}`}
    {...props}
  />
)

// ─── Label ───────────────────────────────────────────────────────────────────
export const Label = ({ className = '', children, ...props }) => (
  <label className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
    {children}
  </label>
)

// ─── Select ──────────────────────────────────────────────────────────────────
const SelectCtx = createContext(null)

export const Select = ({ value, onValueChange, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <SelectCtx.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectCtx.Provider>
  )
}

export const SelectTrigger = ({ className = '', children }) => {
  const { open, setOpen } = useContext(SelectCtx)
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={`flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors ${className}`}
    >
      {children}
      <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
  )
}

export const SelectValue = ({ placeholder }) => {
  const { value } = useContext(SelectCtx)
  return <span className="text-gray-700">{value || placeholder}</span>
}

export const SelectContent = ({ children }) => {
  const { open, setOpen } = useContext(SelectCtx)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [setOpen])

  if (!open) return null
  return (
    <div ref={ref} className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      {children}
    </div>
  )
}

export const SelectItem = ({ value, children }) => {
  const { onValueChange, setOpen, value: selected } = useContext(SelectCtx)
  return (
    <button
      type="button"
      className={`w-full px-3 py-2 text-sm text-left hover:bg-green-50 transition-colors ${selected === value ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'}`}
      onClick={() => { onValueChange(value); setOpen(false) }}
    >
      {children}
    </button>
  )
}

// ─── Dialog ──────────────────────────────────────────────────────────────────
const DialogCtx = createContext(null)

export const Dialog = ({ open, onOpenChange, children }) => (
  <DialogCtx.Provider value={{ open, onOpenChange }}>
    {children}
  </DialogCtx.Provider>
)

export const DialogTrigger = ({ asChild, children, ...props }) => {
  const { onOpenChange } = useContext(DialogCtx)
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: () => onOpenChange(true), ...props })
  }
  return <button onClick={() => onOpenChange(true)} {...props}>{children}</button>
}

export const DialogContent = ({ className = '', children }) => {
  const { open, onOpenChange } = useContext(DialogCtx)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className={`relative z-10 bg-white rounded-xl shadow-xl w-full max-h-[90vh] overflow-y-auto ${className || 'max-w-lg'}`}>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>
export const DialogTitle = ({ children }) => <h2 className="text-xl font-semibold text-gray-900">{children}</h2>
export const DialogDescription = ({ children }) => <p className="text-sm text-gray-500 mt-1">{children}</p>
export const DialogFooter = ({ children }) => <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">{children}</div>

// ─── Switch ──────────────────────────────────────────────────────────────────
export const Switch = ({ defaultChecked = false, checked, onChange }) => {
  const [on, setOn] = useState(defaultChecked)
  const isControlled = checked !== undefined
  const value = isControlled ? checked : on

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => { if (!isControlled) setOn(!on); onChange?.(!value) }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${value ? 'bg-green-600' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${value ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}

// ─── Avatar ──────────────────────────────────────────────────────────────────
export const Avatar = ({ className = '', children }) => (
  <div className={`relative inline-flex rounded-full overflow-hidden bg-gray-200 ${className}`}>{children}</div>
)
export const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
)
export const AvatarFallback = ({ children }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-green-100 text-green-700 font-semibold text-sm">{children}</div>
)