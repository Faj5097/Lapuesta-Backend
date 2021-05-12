function getOdds(newMatchUp, player1, player2) {
  const player1Wins = player1.wins + player2.loses;
  const player2Wins = player1.loses + player2.wins;
  const draw = player1.draws + player2.draws;

  const oddPlayer1Wins = (100 / (player1Wins / (player1Wins + player2Wins + draw) * 0,95)).toFixed(2);
  const oddPlayer2Wins = (100 / (player2Wins / (player1Wins + player2Wins + draw) * 0,95)).toFixed(2);
  const oddDraw = (100 / (draw / (player1Wins + player2Wins + draw) * 0,95)).toFixed(2);

  newMatchUp.probability.player1Wins = oddPlayer1Wins;
  newMatchUp.probability.draw = oddDraw;
  newMatchUp.probability.player2Wins = oddPlayer2Wins;

  return newMatchUp;
}

module.exports = getOdds;
