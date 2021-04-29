const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const Player = require("./player.model.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/fifaDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.route("/players")

  .get(function(req, res){
    Player.find(function(err, playersFound){
      if(!err){
        res.json(playersFound);
      }
      else{
        console.log(err);
      }
    })
  })

    .post(function(req, res){
      const newArticle = new Player(req.body);

      newArticle.save(function(err){
        if(!err){
          res.status(200).send("Successfully added new Article!");
        }
        else{
          res.status(400).send(err);
        }
      });
    })
;

app.route("/players/:playersId")

  .get(function(req, res){
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

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
