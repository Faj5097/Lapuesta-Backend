//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Player = require("./player.model.js");
const MatchUp = require("./matchUp.model.js");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/fifaDB', {useNewUrlParser: true, useUnifiedTopology: true});

app.get("/players", function(req, res){
    Player.find(function(err, playersFound){
      if(!err){
        res.json(playersFound);
      }
      else{
        console.log(err);
      }
    })
  });

app.post("/players", function(req, res){
    const newPlayer = new Player(req.body);
    newPlayer.save(function(err){
      if(!err){
        res.status(200).send("Successfully added new Player!");
      }
      else{
        res.status(400).send(err);
      }
    });
});

app.route("/players/:playersId").get(function(req, res){
    Player.findById(req.params.playersId, function(err, playerFound){
      if(playerFound){
        res.json(playerFound);
      }
      else{
        console.log(err);
      }
    });
  })
;

app.get("/matchUps", function(req, res){
    MatchUp.find(function(err, matchUpsFound){
      if(!err){
        res.json(playersFound);
      }
      else{
        console.log(err);
      }
    })
  });

app.post("/matchUps", function(req, res){
    const newMatchUp = new MatchUp(req.body);
    newMatchUp.save(function(err){
      if(!err){
        res.status(200).send("Successfully added new Player!");
      }
      else{
        res.status(400).send(err);
      }
    });
});

app.route("/matchUps/:matchUpsId").get(function(req, res){
    MatchUp.findById(req.params.playersId, function(err, matchUpFound){
      if(matchUpFound){
        res.json(matchUpFound);
      }
      else{
        console.log(err);
      }
    });
  })
;

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
