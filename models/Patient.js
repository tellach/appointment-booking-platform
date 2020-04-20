const {DataTypes} = require('sequelize');
const {db} = require('./../config') 
'use strict';
module.exports = (db, DataTypes) => {
    const Patient = db.define('patient', {
        // attributes
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING 
        },
        dateOfBirth: {
            type: DataTypes.DATE
        },
        gender: {
            type: DataTypes.STRING
        },
    },
    {
        sequelize : db,
        modelName: 'patients'
        // options
});
 
  return Patient;
};

