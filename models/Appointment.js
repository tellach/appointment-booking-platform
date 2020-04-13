const {DataTypes} = require('sequelize');
const {db} = require('./../config') 
'use strict';
module.exports = (db, DataTypes) => {
    const Appointment = db.define('appointment', {
        // attributes
        title: {
            type: DataTypes.STRING,
        },
        Date: {
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
