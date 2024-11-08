import React, { useEffect, useState } from 'react';
import LeagueService from '../services/LeagueService';
import Header from '../components/Header';
import { FLAGAPI_URL } from '../utils/constants';

const Schedule = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const leagueService = new LeagueService();
    leagueService
      .fetchData()
      .then(() => {
        setMatches(leagueService.getMatches());
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const formatDate = (matchDate) => {
    const date = new Date(matchDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatTime = (matchDate) => {
    const date = new Date(matchDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const tableStyles = {
    width: '90%',
    fontFamily: 'sans-serif',
    marginBottom: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderCollapse: 'collapse',
  };

  const thTdStyles = {
    padding: '0 18px',
    height: '70px',
    fontSize: '14px',
    verticalAlign: 'middle',
  };

  return (
    <div>
      <Header />
      <table style={tableStyles} className="schedule">
        <thead>
          <tr>
            <th style={thTdStyles}>Date/Time</th>
            <th style={thTdStyles}>Stadium</th>
            <th style={thTdStyles}>Home Team</th>
            <th style={thTdStyles}></th>
            <th style={thTdStyles}>Away Team</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={index}>
              <td style={thTdStyles}>
                <p>{formatDate(match.matchDate)}</p>
                <p>{formatTime(match.matchDate)}</p>
              </td>
              <td style={thTdStyles}>{match.stadium}</td>
              <td style={thTdStyles}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', columnGap: '22px' }}>
                  <p className="country-name">{match.homeTeam}</p>
                  <img src={`${FLAGAPI_URL}${match.homeTeam}.png`} alt="Country Flag" className="country-flag" />
                </div>
              </td>
              <td style={thTdStyles}>
                <span>{match.homeTeamScore}</span>
                <span>:</span>
                <span>{match.awayTeamScore}</span>
              </td>
              <td style={thTdStyles}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', columnGap: '22px' }}>
                  <img src={`${FLAGAPI_URL}${match.awayTeam}.png`} alt="Country Flag" className="country-flag" />
                  <p className="country-name">{match.awayTeam}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
