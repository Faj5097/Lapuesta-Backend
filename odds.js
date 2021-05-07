function getOdds(newMatchUp) {
  newMatchUp.probability.player1Wins = (Math.random() * 9 + 1).toFixed(2);
  newMatchUp.probability.draw = (Math.random() * 9 + 1).toFixed(2);
  newMatchUp.probability.player2Wins = (Math.random() * 9 + 1).toFixed(2);

  return newMatchUp;
}

module.exports = getOdds;
