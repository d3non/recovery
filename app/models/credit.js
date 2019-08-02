module.exports = (sequelize, Sequelize) => {
  var Credit = sequelize.define('credit', {
    id_credit: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    first_name: { type: Sequelize.STRING, notEmpty: true },
    mid_name: { type: Sequelize.STRING, notEmpty: true },
    last_name: { type: Sequelize.STRING, notEmpty: true },
    street_name: { type: Sequelize.STRING, notEmpty: true },
    house_number: { type: Sequelize.STRING, notEmpty: true },
    apartment_number: { autoIncrement: false, primaryKey: false, type: Sequelize.INTEGER },
    neighborhood: { type: Sequelize.STRING, notEmpty: true },
    zip_code: { autoIncrement: false, primaryKey: false, type: Sequelize.INTEGER },
    id_state: { autoIncrement: false, primaryKey: false, type: Sequelize.INTEGER },
    id_city: { autoIncrement: false, primaryKey: false, type: Sequelize.INTEGER }
  });

  return Credit;
};