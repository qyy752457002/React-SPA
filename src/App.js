import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';
// import { AppRouter } from './router/index.js';

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <AppRouter /> */}
      <Footer />
    </div>
  );
};

export default App;