import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<Navigate to='/login' replace/>} />
      </Routes>
    </>
  );
}

export default App
