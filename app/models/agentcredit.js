module.exports = (sequelize, Sequelize) => {
  var AgentCredit = sequelize.define('agentcredit', {
    id_credit: { autoIncrement: false, primaryKey: true, type: Sequelize.INTEGER },
    id_user: { autoIncrement: false, type: Sequelize.INTEGER }
  });

  return AgentCredit;
};