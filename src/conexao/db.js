const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    logging: false,
    dialect:'sqlite',
    storage:[__dirname,"database.sqlite"].join('\\')
})
module.exports = sequelize;