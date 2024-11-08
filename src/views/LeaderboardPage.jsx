import React, { useEffect, useState } from 'react';
import LeagueService from '../services/LeagueService';
import Header from '../components/Header';
import { FLAGAPI_URL } from '../utils/constants';

const LeaderBoard = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const leagueService = new LeagueService();
    leagueService.fetchData().then(() => {
      setMatches(leagueService.getLeaderboard());
    });
  }, []);

  const styles = {
    table: {
      width: '90%',
      fontFamily: 'sans-serif',
      marginBottom: '10px',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderCollapse: 'collapse',
    },
    th: {
      height: '40px',
      fontSize: '12px',
      verticalAlign: 'middle',
      backgroundColor: '#E4EDF2',
      padding: '0 18px',
    },
    td: {
      height: '70px',
      fontSize: '14px',
      verticalAlign: 'middle',
      padding: '0 18px',
    },
    flag: {
      width: '53px',
      height: '37px',
    },
    teamNameCell: {
      display: 'flex',
      alignItems: 'center',
      columnGap: '22px',
      fontSize: '16px',
      fontWeight: 700,
      color: '#182C62',
    },
    points: {
      fontSize: '16px',
      fontWeight: 700,
      color: '#025FEB',
      textAlign: 'center',
    },
    evenRow: {
      backgroundColor: 'unset',
    },
  };

  return (
    <div>
      <Header />

      <table style={styles.table} className="leader-board">
        <thead>
          <tr>
            <th style={styles.th}>Team Name</th>
            <th style={styles.th}>MP</th>
            <th style={styles.th}>GF</th>
            <th style={styles.th}>GA</th>
            <th style={styles.th}>GD</th>
            <th style={styles.th}>Points</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={index} style={index % 2 === 0 ? styles.evenRow : {}}>
              <td>
                <div style={styles.teamNameCell}>
                  <img
                    src={`${FLAGAPI_URL}${match.teamName}.png`}
                    style={styles.flag}
                    alt="Country Flag"
                  />
                  <p className="country-name">{match.teamName}</p>
                </div>
              </td>
              <td style={styles.td}>{match.matchesPlayed}</td>
              <td style={styles.td}>{match.goalsFor}</td>
              <td style={styles.td}>{match.goalsAgainst}</td>
              <td style={styles.td}>{match.goalsFor - match.goalsAgainst}</td>
              <td style={styles.points}>{match.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
