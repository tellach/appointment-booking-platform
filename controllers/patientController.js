const {Patient} = require('./../models/Patient')

function getPatients(event, arg) {
    Patient.findAll().then(patiens => {
      
      event.returnValue = patiens;
    }).catch((err)=>console.log(err))
    
  }

module.exports = {getPatients}