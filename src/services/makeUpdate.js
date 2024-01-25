const Team = require("../models/teamModel");

const makeUpdate = async (currentTeam, updateType, updateValue) => {
    let update = {$set: {}};
    update.$set[updateType] = updateValue;
    try {
       await Team.findOneAndUpdate({name: currentTeam}, update);
    } catch (error) {
        console.error(error.message);
    }
}


module.exports = makeUpdate;