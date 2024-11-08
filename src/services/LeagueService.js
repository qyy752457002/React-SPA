/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 * 
 */
class LeagueService {
    constructor() {
        this.matches = []; // Initialize matches data
    }
    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */
    setMatches(matches) {
        this.matches = matches;
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {
        const originMatches = this.getMatches()

        const allTeams = [...new Set(originMatches.flatMap(match => [match.homeTeam, match.awayTeam]))];

        let allTeamInfos = []

        // init variable
        for (let teamName of allTeams) {
            const teamInfo = {}
            teamInfo['teamName'] = teamName
            teamInfo['matchesPlayed'] = 0
            teamInfo['goalsFor'] = 0
            teamInfo['goalsAgainst'] = 0
            teamInfo['points'] = 0
            allTeamInfos.push(teamInfo)
        }

        originMatches.forEach(match => {
            let tempTeamHome = allTeamInfos.find((item) => { return item.teamName == match.homeTeam })
            if (match.matchPlayed) {
                tempTeamHome['matchesPlayed']++;
                tempTeamHome['goalsFor'] += match.homeTeamScore
                tempTeamHome['goalsAgainst'] += match.awayTeamScore
                if (match.homeTeamScore == match.awayTeamScore) {
                    tempTeamHome['points']++
                } else if (match.homeTeamScore > match.awayTeamScore) {
                    tempTeamHome['points'] += 3
                }
            }

            let tempTeamAway = allTeamInfos.find((item) => { return item.teamName == match.awayTeam })
            if (match.matchPlayed) {
                tempTeamAway['matchesPlayed']++;
                tempTeamAway['goalsFor'] += match.awayTeamScore
                tempTeamAway['goalsAgainst'] += match.homeTeamScore
                if (match.awayTeamScore == match.homeTeamScore) {
                    tempTeamAway['points']++
                } else if (match.awayTeamScore > match.homeTeamScore) {
                    tempTeamAway['points'] += 3
                }
            }
        });
        // Sort the teams based on points, goal difference, goals scored, and name
        const sortedTeams = allTeamInfos.sort((a, b) => {
            if (a.points !== b.points) {
                return b.points - a.points; // Sort by points
            } else {
                // Calculate goal difference
                const goalDifferenceA = a.goalsFor - a.goalsAgainst;
                const goalDifferenceB = b.goalsFor - b.goalsAgainst;

                if (goalDifferenceA !== goalDifferenceB) {
                    return goalDifferenceB - goalDifferenceA; // Sort by goal difference
                } else {
                    if (a.goalsFor !== b.goalsFor) {
                        return b.goalsFor - a.goalsFor; // Sort by goals scored
                    } else {
                        return a.teamName.localeCompare(b.teamName); // Sort alphabetically by team name
                    }
                }
            }
        });

        return sortedTeams
    }

    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData() {
        const accessTokenResponse = await fetch('http://localhost:3001/api/v1/getAccessToken');
        const { access_token } = await accessTokenResponse.json();

        const matchesResponse = await fetch('http://localhost:3001/api/v1/getAllMatches', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        })

        const data = await matchesResponse.json();
        this.setMatches(data.matches);
    } catch(error) {
        console.error('Error fetching data:', error)
    }
}

export default LeagueService;