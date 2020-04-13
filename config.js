// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { Sequelize, DataTypes } = require('sequelize');
const PatientModel = require('./models/Patient')
const AppointmentModel = require('./models/Appointment')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './db/mydb.sqlite'
});
db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Patient = PatientModel(db, DataTypes)
const Appointment = AppointmentModel(db, DataTypes)

Appointment.belongsTo(Patient)
Patient.hasMany(Appointment)

db.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })


module.exports = {Patient,Appointment };
