const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_accounts', 'auth_manager', 'Ssccww1015', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        useUTC: false,
    },
    timezone: '-04:00' // not working, still UTC, ignoring for now.
});

module.exports = sequelize;