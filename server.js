//jshint esversion:6
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Player = require("./player.model.js");
const MatchUp = require("./matchUp.model.js");
const Team = require("./team.model.js");
// const PORT = 4000;
const Odds = require("./odds");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// mongoose.connect('mongodb://localhost:27017/fifaDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@cluster0.iyucu.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', function( req, res) { res.send('Hello from Express!')});
//---------------------
//----- PLAYERS -------
//---------------------
app.get("/players", function(req, res){
    Player.find(function(err, playersFound){
      if(!err){
        // res.json(playersFound);
        res.send("La le lu");        
      }
      else{
        console.log(err);
      }
    })
  });

app.post("/players", function(req, res){
    const newPlayer = new Player(req.body);

    Player.updateOne(
      {nickname: req.body.nickname},
      {$set: req.body},
      {upsert: true},
      function(err){
        if(!err){
          res.send("Successfully inserted Player!");
        }
        else{
          res.send(err);
        }
      });
});

app.get("/players/:playersId", function(req, res){
    Player.findById(req.params.playersId, function(err, playerFound){
      if(playerFound){
        res.json(playerFound);
      }
      else{
        console.log(err);
      }
    });
  });

app.patch("/players/:playerId", function(req, res){
    console.log(req.body);
    Player.update(
      {_id: req.params.playerId},
      {$set: req.body},
      {overwrite: true},
      function(err){
        if(!err){
          res.send("Successfully patched Player!");
        }
        else{
          res.send(err);
        }
      })
});

//---------------------
//---- MATCH UP -------
//---------------------
app.get("/matchUps", function(req, res){
    MatchUp.find(function(err, matchUpsFound){
      if(!err){
        res.json(matchUpsFound);
      }
      else{
        console.log(err);
      }
    })
  });

app.post("/matchUps", async function(req, res){
    let newMatchUp = new MatchUp(req.body);

    const player1Name = newMatchUp.teams.home.player1.name;
    const player2Name = newMatchUp.teams.away.player2.name;
    let playerJSON = [];

    console.log("PLAYER 1 NAME: " + player1Name);
    await Player.find({$or:[{nickname: player1Name},{nickname: player2Name}]} , function(err, players){
      if(!err){
        console.log("--- PLAYERS ---");
        console.log(players);
        playerJSON = players;
      }
      else{
        console.log(err);
      }
    });

    //calculate Odds
    newMatchUp = await Odds(newMatchUp, playerJSON.filter((player) => player.nickname === player1Name)[0], playerJSON.filter((player) => player.nickname === player2Name)[0]);

    await newMatchUp.save(function(err){
      if(!err){
        res.status(200).send("Successfully added new MatchUp!");
      }
      else{
        res.status(400).send(err);
      }
    });
});

app.get("/matchUps/:matchUpId", function(req, res){
    MatchUp.findById(req.params.matchUpId, function(err, matchUpFound){
      if(matchUpFound){
        res.json(matchUpFound);
      }
      else{
        console.log(err);
      }
    });
  });

app.patch("/matchUps/:matchUpId", function(req, res){
  console.log(req.body);
    MatchUp.update(
      {_id: req.params.matchUpId},
      {$set: req.body},
      {overwrite: true},
      function(err){
        if(!err){
          res.send("Successfully updated MatchUp!");
        }
        else{
          res.send(err);
        }
      })
  });

app.delete("/matchUps/:matchUpId", function(req, res){
  MatchUp.findOneAndDelete(
    {_id: req.params.matchUpId},
    function(err){
      if(!err){
        res.send("Successfully deleted MatchUp!");
      }
      else{
        res.send(err);
      }
    })
})


//---------------------
//------ TEAMS --------
//---------------------
app.get("/teams", function(req, res){
  Team.find(function(err, teamsFound){
    if(!err){
      res.json(teamsFound);
    }
    else{
      console.log(err);
    }
  })
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});
