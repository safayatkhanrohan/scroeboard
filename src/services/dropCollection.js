const Team = require("../models/teamModel");

const dropCollection = async () => {
    try {
        await Team.collection.drop();
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = dropCollection;