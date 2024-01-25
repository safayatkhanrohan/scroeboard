const _ = require('lodash');

const dropCollection = require("../services/dropCollection");
const findTeam = require("../services/findTeam");
const makeUpdate = require("../services/makeUpdate");
const { getIO } = require("../services/socket");
const teamFindOrCreate = require("../services/teamFindOrCreate");


let currentTeam = "";
let balls = 0;

const rootController = (req, res) => {
  res.render("index");
};

const setupGetController = (req, res) => {
    dropCollection();
  res.render("setup");
};

const setupPostController = (req, res) => {
  const { team1, team2 } = req.body;
  teamFindOrCreate(_.upperCase(team1), 1);
  teamFindOrCreate(_.upperCase(team2), 2);
  res.redirect("/");
};

const displayController = async (req, res) => {
  const [cTeam] = await findTeam(currentTeam);

  let name = "Team1", score = 0, wickets = 0, overs = 0, innings = 1;
  let oTeamName = "Team2", target = 0;
  try {
    name = cTeam.name;
    score = cTeam.score;
    wickets = cTeam.wickets;
    overs = cTeam.overs;
    innings = cTeam.innings;

    const [oTeam] = await findTeam({ $ne: currentTeam });
    target = oTeam.score + 1;
    oTeamName = oTeam.name;
  } catch (error) {
    console.error("please setup teams or input batting team");
  }

  res.render("display", { name, oTeamName, target, score, wickets, overs, balls, innings });


}

const currentTeamController = (req, res) => {
  const { teamName } = req.body;
  if (teamName) {
    currentTeam = _.upperCase(teamName);
    const io = getIO();
    io.emit("message", "updated");
  }
  res.redirect("/");
};

const scoreController = async (req, res) => {
  const { inputScore } = req.body;
  try {
    const [cTeam] = await findTeam(currentTeam);
    const newScore = cTeam.score + parseInt(inputScore);
    await makeUpdate(currentTeam, "score", newScore);
    const io = getIO();
    io.emit("message", inputScore);
  } catch (error) {
    console.error(error.message);
  }
  res.redirect("/");
};

const wicketController = async (req, res) => {
  try {
    const [cTeam] = await findTeam(currentTeam);
    const newWickets = cTeam.wickets + 1;
    await makeUpdate(currentTeam, "wickets", newWickets);
    const io = getIO();
    io.emit("message", "WICKET");
  } catch (error) {
    console.error(error.message);
  }
  res.redirect("/");
};

const oversController = async (req, res) => {
    balls += 1;
    const io = getIO();
    io.emit("message", "updated");
    if (balls === 6) {
        balls = 0;
        try {
            const [cTeam] = await findTeam(currentTeam);
            const newOvers = cTeam.overs + 1;
            await makeUpdate(currentTeam, "overs", newOvers);
        } catch (error) {
            console.error(error.message);
        }
    }
    res.redirect("/");
}

module.exports = {
  rootController,
  setupGetController,
  setupPostController,
  displayController,
  currentTeamController,
  scoreController,
  wicketController,
  oversController,
  currentTeam,
};
