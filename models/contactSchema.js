const sequelize = require('../services/connectionBD');

const { DataTypes }  = require('sequelize');

const Contact = sequelize.define('contacts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    lastName:  {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    email:  {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
});

Contact.sync();

module.exports = Contact;