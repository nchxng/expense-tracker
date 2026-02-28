import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import DashboardLayout from './components/layouts/DashboardLayout'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import Settings from './pages/Dashboard/Settings'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token')
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
}

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token')
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}