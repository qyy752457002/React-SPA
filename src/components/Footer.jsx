import React, { useState, useEffect } from 'react';

function Footer() {
    const [version, setVersion] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/version') // Replace with your API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setVersion(data.version); // Update version state with the received data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array to run only on mount

    return (
        <footer style={styles.footerContainer}>
            <div className="container footer" style={styles.footer}>
                <p>API Version: {version}</p>
            </div>
        </footer>
    );
}

const styles = {
    footerContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 99,
    },
    footer: {
        backgroundColor: '#F6F7F7',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '60px',
    },
    footerText: {
        fontSize: '16px',
        fontFamily: "'Open Sans', sans-serif",
    },
};

export default Footer;
