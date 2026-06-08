import { useState } from 'react'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import NotAuthorized from './components/NotAuthorized'
import Login from './components/auth/Login'

function App() {

  return (
    <Router>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/not-authorized' element={<NotAuthorized/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    
    </Router>
  )
}

export default App
