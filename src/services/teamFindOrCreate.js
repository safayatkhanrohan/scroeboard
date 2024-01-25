const Team = require("../models/teamModel");
const findOrCreate = require("mongoose-findorcreate");

const teamFindOrCreate = (teamName, innings) => {
  try {
   Team.findOrCreate({name: teamName}, {innings: innings}, function(err, team) {
    });
  } catch (error) {
    console.error(error.message);
  }
  }

module.exports = teamFindOrCreate;