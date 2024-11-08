import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SchedulePage from '../views/SchedulePage';
import LeaderboardPage from '../views/LeaderboardPage';
import NotFoundPage from '../views/NotFoundPage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SchedulePage} />
        <Route exact path="/schedule" component={SchedulePage} />
        <Route exact path="/leaderboard" component={LeaderboardPage} />
        {/* Fallback route for 404 Not Found */}
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
