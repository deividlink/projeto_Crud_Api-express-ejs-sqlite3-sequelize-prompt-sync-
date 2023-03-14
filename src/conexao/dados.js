const Sequelize = require('sequelize')
const root = require('../../root')
const conexao = require(root.conexao + '\\db')

const info = conexao.define('info',{
    id :{ 
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    pais:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    iso3161_alpha2:{
        type:Sequelize.STRING(2),
        allowNull:false,
        unique:true
    },
    iso3161_alpha3:{
        type:Sequelize.STRING(3),
        allowNull:false,
        unique:true
    },
    numerico:{
        type:Sequelize.INTEGER(3),
        allowNull:false,
        unique:true
    }
})

module.exports = info