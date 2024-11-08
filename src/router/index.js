import React from 'react';
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import SchedulePage from '../views/SchedulePage';
import LeaderboardPage from '../views/LeaderboardPage';
import NotFoundPage from '../views/NotFoundPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<SchedulePage />} />
      <Route exact path="/schedule" element={<SchedulePage />} />
      <Route exact path="/leaderboard" element={<LeaderboardPage />} />
      {/* Fallback route for 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export { AppRouter };
