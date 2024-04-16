import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navebar from './components/Navbar';
import Home from './Pages/Home';
import Footer from './components/Footer';
import VerifiedUser from './Pages/VerifiedUser';
import Publish from './Pages/Publish';
import Streaming from './components/Streaming';
import Feedback from './Pages/Feedback';


function App() {
  return (
    <div className='bg-black'>
      <Navebar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='verifiedUser' element={<VerifiedUser />} />
        <Route path='publishUser' element={<Publish />} />
        <Route path='streaming' element={<Streaming />} />
        <Route path='feedback' element={<Feedback />} />
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;