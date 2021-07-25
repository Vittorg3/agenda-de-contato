const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({   
    database: process.env.DATABASE,
    username: process.env.DBUSERNAME || '',
    password: process.env.DBPASSWORD || '',
    host: process.env.DBHOST,
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established with database');
} catch(error) {
    console.log(`Something went wrong. Error: ${error}`);
}

module.exports = sequelize;