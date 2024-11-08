import React from 'react';
import { Link } from 'react-router-dom';
import {
  LOGO_ICON_PATH,
  SCHEDULE_ICON_PATH,
  LEADERBOARD_ICON_PATH,
} from '../utils/constants';

const Navbar = () => {
  const styles = {
    navbar: {
      height: '60px',
      backgroundColor: '#025FEB',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
    },
    linkItems: {
      display: 'flex',
      fontSize: '16px',
      fontFamily: "'Open Sans', sans-serif",
    },
    linkItem: {
      textDecoration: 'none',
      color: 'white',
      paddingLeft: '40px',
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      height: '25px',
      width: 'auto',
      marginRight: '8px',
    },
  };

  return (
    <nav style={styles.navbar}>
      <div>
        <img src={LOGO_ICON_PATH} alt="Logo" />
      </div>
      <div style={styles.linkItems}>
        <Link to="/schedule" style={styles.linkItem}>
          <img src={SCHEDULE_ICON_PATH} style={styles.icon} alt="Link Icon" />
          <p>Schedule</p>
        </Link>
        <Link to="/leaderboard" style={styles.linkItem}>
          <img src={LEADERBOARD_ICON_PATH} style={styles.icon} alt="Link Icon" />
          <p>Leaderboard</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
