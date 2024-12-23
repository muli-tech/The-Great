import axios from 'axios';

const apiKey = '4d3d074f107f44e09123d19ed6a89950'; // Your API token
const baseUrl = 'http://api.football-data.org/v4/';

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `🚩 Please specify an endpoint or query!\n\n*Examples:*\n- ${usedPrefix + command} competitions/PL/standings\n- ${usedPrefix + command} competitions/SA/scorers\n\nCheck API documentation for more queries: https://www.football-data.org/documentation/quickstart`;

    try {
        // Make the API request
        const response = await axios.get(`${baseUrl}${text}`, {
            headers: {
                'X-Auth-Token': apiKey
            }
        });

        const data = response.data;
        const competitionCodes = ['WC', 'CL', 'BL1', 'DED', 'BSA', 'PD', 'FL1', 'ELC', 'PPL', 'EC', 'SA', 'PL', 'CLI'];

        // Handle standings data
        if (text.includes('standings')) {
            const competition = data.competition?.name || 'Unknown League';
            const standings = data.standings?.[0]?.table || [];
            if (standings.length === 0) {
                m.reply(`⚠️ No standings data found.`);
                return;
            }

            const formattedStandings = standings.slice(0, 8).map((team) => {
                return `🏆 *Position ${team.position}: ${team.team.name}*\n- Played: ${team.playedGames}\n- Won: ${team.won}\n- Draw: ${team.draw}\n- Lost: ${team.lost}\n- Points: ${team.points}\n- Goals For: ${team.goalsFor}\n- Goals Against: ${team.goalsAgainst}\n- Goal Difference: ${team.goalDifference}\n`;
            }).join('\n');

            m.reply(`📊 *${competition} Standings:*\n\n${formattedStandings}`);
            return;
        }

        // Handle scorers data
        if (text.includes('scorers')) {
            const competition = data.competition?.name || 'Unknown League';
            const scorers = data.scorers || [];
            if (scorers.length === 0) {
                m.reply(`⚠️ No scorers data found.`);
                return;
            }

            const formattedScorers = scorers.slice(0, 10).map((scorer, index) => {
                return `⚽ *${index + 1}. ${scorer.player.name} (${scorer.team.name})*\n- Goals: ${scorer.goals}\n- Assists: ${scorer.assists ?? 'N/A'}\n- Penalties: ${scorer.penalties ?? 'N/A'}\n`;
            }).join('\n');

            m.reply(`📊 *Top Scorers in ${competition}:*\n\n${formattedScorers}`);
            return;
        }

        // Handle matches data
        if (text.includes('matches')) {
            const { filters, resultSet, matches } = data;

            const filterInfo = `📅 *Filters:*\n- Date From: ${filters?.dateFrom || 'N/A'}\n- Date To: ${filters?.dateTo || 'N/A'}\n- Permission: ${filters?.permission || 'N/A'}\n\n`;

            const resultInfo = `📊 *Result Set:*\n- Total Matches: ${resultSet?.count || 0}\n- Competitions: ${resultSet?.competitions || 'N/A'}\n- First Match: ${resultSet?.first || 'N/A'}\n- Last Match: ${resultSet?.last || 'N/A'}\n- Matches Played: ${resultSet?.played || 0}\n\n`;

            const matchesInfo = matches.slice(0, 15).map((match) => {
                const { homeTeam, awayTeam, score, competition } = match;
                return `⚽ *${competition.name || 'Unknown League'}*\n- Matchday: ${match.matchday || 'N/A'}\n- Status: ${match.status || 'N/A'}\n- ${homeTeam.name} (${score.fullTime.home ?? '-'} Goals) 🆚 ${awayTeam.name} (${score.fullTime.away ?? '-'} Goals)\n- Winner: ${score.winner === 'HOME_TEAM' ? homeTeam.name : score.winner === 'AWAY_TEAM' ? awayTeam.name : 'Draw'}\n`;
            }).join('\n');

            m.reply(`${filterInfo}${resultInfo}${matchesInfo}`);
            return;
        }

        // Handle Champions League matches
       /*  if (text.includes('competitions/CL/matches')) {
            const { filters, resultSet, competition, matches } = data;

            const competitionInfo = `🏆 *Competition: ${competition.name || 'N/A'}*\n- Type: ${competition.type || 'N/A'}\n- Matches Played: ${resultSet?.played || 0}/${resultSet?.count || 0}\n- Season: ${filters?.season || 'N/A'}\n\n`;

            const matchDetails = matches.slice(0, 8).map((match) => {
                const { homeTeam, awayTeam, score, matchday, status } = match;
                return `⚽ *Matchday ${matchday || 'N/A'} - ${status || 'N/A'}*\n- ${homeTeam.name} (${score.fullTime.home ?? '-'}) 🆚 ${awayTeam.name} (${score.fullTime.away ?? '-'})\n- Winner: ${score.winner === 'HOME_TEAM' ? homeTeam.name : score.winner === 'AWAY_TEAM' ? awayTeam.name : 'Draw'}\n`;
            }).join('\n');

            m.reply(`${competitionInfo}${matchDetails}`);
            return;
        } */

        // Handle All League matches soon to add current date dates back to the first match
        const isCompetitionMatch = competitionCodes.some((code) => text.includes(`competitions/${code}/matches`));

        if (isCompetitionMatch) {
            /* const response = await axios.get(`${baseUrl}${text}`, {
                headers: {
                    'X-Auth-Token': apiKey
                }
            }); */

            const data = response.data;
            const { filters, resultSet, competition, matches } = data;

            const today = new Date().toISOString().split('T')[0];
            const upcomingMatches = matches.filter((match) => match.utcDate >= today);

            const competitionInfo = `🏆 *Competition: ${competition.name || 'N/A'}*\n- Type: ${competition.type || 'N/A'}\n- Matches Played: ${resultSet?.played || 0}/${resultSet?.count || 0}\n- Season: ${filters?.season || 'N/A'}\n\n`;

            const matchDetails = upcomingMatches.slice(0, 15).map((match) => {
                const { homeTeam, awayTeam, utcDate, matchday } = match;
                return `📅 *Matchday ${matchday || 'N/A'}*\n- Date: ${new Date(utcDate).toLocaleString()}\n- ${homeTeam.name} 🆚 ${awayTeam.name}\n`;
            }).join('\n');

            m.reply(`${competitionInfo}${matchDetails}`);
            return;
        }

        // Fallback for other endpoints
        const fallbackOutput = Object.entries(data).slice(0, 15).map(([key, value]) => {
            return `- *${key}*: ${JSON.stringify(value, null, 2)}`;
        }).join('\n');

        m.reply(`📊 *Data Summary:*\n\n${fallbackOutput}`);
    } catch (e) {
        console.error(e);
        m.reply(`❌ An error occurred while fetching data. Ensure the query is valid and try again.\n\n*Examples:*\n- ${usedPrefix + command} competitions/PL/standings\n- ${usedPrefix + command} competitions/SA/scorers`);
    }
};

// Command metadata
handler.command = ['football', 'soccer', 'sports'];
handler.tags = ['football'];
handler.help = [
    'football <endpoint>',
    'football matches',
    'football competitions/PL/standings',
    'football competitions/PL/scorers',
    'football teams/86/matches?status=SCHEDULED',
    'football competitions/PL/matches'
].map(cmd => `${cmd}`);
handler.limit = false;

export default handler;
