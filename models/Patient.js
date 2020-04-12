const {DataTypes} = require('sequelize');
const {db} = require('./../config') 

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
/*Patient.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return Patient.create({
        firstName: 'amine',
        lastName: 'tellache',
        DateOfBirth:'30/04/1999',


    });
});*/

module.exports = {Patient:Patient};

