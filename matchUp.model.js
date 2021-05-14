const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var MatchUp = new Schema({
  dateTimeOfMatchUp: Date,
  alreadyPlayed: Boolean,
  result: {
    goals: {
      player1: Number,
      player2: Number
    },
    winner: String,
    looser: String,
    draw: Boolean
  },
  probability: {
    player1Wins: Number,
    draw: Number,
    player2Wins: Number
  },
  teams: {
    home: {
      club: {
        name: String,
        stars: Number
      },
      player1: {
        name: String,
        winsBefore: Number,
        drawsBefore: Number,
        losesBefore: Number,
        goals: {
          scored: {
            allTime: Number,
            thisMatchUp: Number
          },
          conceded: {
            allTime: Number,
            thisMatchUp: Number
          }
        }
      }
    },
    away: {
      club: {
        name: String,
        stars: Number
      },
      player2: {
        name: String,
        winsBefore: Number,
        drawsBefore: Number,
        losesBefore: Number,
        goals: {
          scored: {
            allTime: Number,
            thisMatchUp: Number
          },
          conceded: {
            allTime: Number,
            thisMatchUp: Number
          }
        }
      }
    }
  }
});

module.exports = mongoose.model("matchUp", MatchUp);
