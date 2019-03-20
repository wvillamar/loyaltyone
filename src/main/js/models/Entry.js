const Sequelize = require('sequelize');
const db = require('../config/database');

const Entry = db.define('entry', {
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    username: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.STRING
    },
    parent_id: {
        type: Sequelize.UUIDV4
    },
});

module.exports = Entry;
