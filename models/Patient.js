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
        DateOfBirth: {
            type: DataTypes.DATE
        },
    },
    {
        sequelize : db,
        modelName: 'patients'
        // options
});
 
  return Patient;
};

