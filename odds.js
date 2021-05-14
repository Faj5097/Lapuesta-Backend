function getOdds(newMatchUp, player1, player2) {
  const player1Wins = parseInt(player1.wins + player2.loses);
  const player2Wins = parseInt(player1.loses + player2.wins);
  const draw = parseInt(player1.draws + player2.draws);
  const sum = player1Wins + player2Wins + draw;

  const oddPlayer1Wins = (95 / ((player1Wins / sum) * 100)).toFixed(2);
  const oddPlayer2Wins = (95 / ((player2Wins / sum) * 100)).toFixed(2);
  const oddDraw = (95 / ((draw / sum) * 100)).toFixed(2);

  console.log("odd player1: " + oddPlayer1Wins);
  console.log("odd player2: " + oddPlayer2Wins);
  console.log("odd draw: " + oddDraw);

  newMatchUp.probability.player1Wins = oddPlayer1Wins;
  newMatchUp.probability.draw = oddDraw;
  newMatchUp.probability.player2Wins = oddPlayer2Wins;

  return newMatchUp;
}

module.exports = getOdds;
