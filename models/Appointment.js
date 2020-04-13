const {DataTypes} = require('sequelize');
const {db} = require('./../config') 
'use strict';
module.exports = (db, DataTypes) => {
    const Appointment = db.define('appointment', {
        // attributes
        title: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE
        },
    },
    {
        sequelize : db,
        modelName: 'appointments'
        // options
});

  
  return Appointment;
};
