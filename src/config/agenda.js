const Agenda = require('agenda');
const {mongoConnection} = require('../config/vars');

const mongoConnectionString = mongoConnection;

const agenda = new Agenda({db: {address: mongoConnectionString}});

module.exports = agenda;