import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* React Router 中的占位符，用于渲染匹配的子路由 */}
      <Footer />
    </div>
  );
};

export default App;