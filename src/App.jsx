import { useState } from 'react'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import NotAuthorized from './components/NotAuthorized'
import Login from './components/auth/Login'
import ProtectedRoute from './context/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import PorterLayout from './components/potter/PotterLayout'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <Router>
      <AuthProvider>

      <Routes>

        <Route path="/admin-dashboard"
          element={
              <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLayout />
              </ProtectedRoute>
          }/>

        <Route path="/farmer-dashboard"
          element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                  {/* <FarmerDashboard /> */}
              </ProtectedRoute>
          }/>

        <Route path="/porter-dashboard"
          element={
              <ProtectedRoute allowedRoles={["porter"]}>
                <PorterLayout/>
              </ProtectedRoute>
          } />

        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/not-authorized' element={<NotAuthorized/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    
      </AuthProvider>
    </Router>
  )
}

export default App
