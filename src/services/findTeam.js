const Team = require("../models/teamModel");

const findTeam = async (teamName) => {
   try {
    const team = await Team.find({name: teamName});
    return team;
   } catch (error) {
     console.error(error.message);
   }
}

module.exports = findTeam;