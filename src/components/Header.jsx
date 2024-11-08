import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 用于获取当前路径

const Header = () => {
  const [heading, setHeading] = useState('');
  const location = useLocation();

  useEffect(() => {
    const currentHeading = location.pathname === '/leaderboard' ? 'Standings' : 'Schedule';
    setHeading(currentHeading);
  }, [location.pathname]); // 每次路径变化时更新标题

  const headerStyle = {
    margin: '60px 0 20px',
    padding: '0',
    textAlign: 'center',
    fontSize: '24px',
    color: '#182C62',
    fontFamily: "'Open sans', sans-serif"
  };

  return (
    <header className="container">
      <h1 style={headerStyle}>League {heading}</h1>
    </header>
  );
};

export default Header;

