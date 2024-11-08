import React from 'react';
import Header from '../components/Header';
import { NOTFOUNT_IMAGE_PATH } from '../utils/constants';

const NotFound = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // 添加高度使其居中
    },
  };

  return (
    <div>
      <Header />
      <div style={styles.container} className="not-found">
        <img src={NOTFOUNT_IMAGE_PATH} alt="Page not Found" />
      </div>
    </div>
  );
};

export default NotFound;
