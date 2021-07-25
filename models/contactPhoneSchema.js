const sequelize = require('../services/connectionBD');

const { DataTypes }  = require('sequelize');

const ContactPhone = sequelize.define('contact_phones', {
    id: {
        type: DataTypes.INTEGER,
        required: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true 
    },
    phoneNumber: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    contact_id: {
       type: DataTypes.INTEGER,
       required: true,
       allowNull: false,
    }
});

ContactPhone.sync();

module.exports = ContactPhone;