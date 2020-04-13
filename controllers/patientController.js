const { Patient } = require('./../config')

function getPatients(event, arg) {
  Patient.findAll().then(patiens => {

    event.returnValue = patiens;
  }).catch((err) => console.log(err))

}

function addPatient(event, arg) {
  firstName = "adel"
  lastName = "namani"
  dateOfBirth = '1999-05-30'
  gender = "femme"

  Patient.create({
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    gender: gender

  }).then(patient => {
    event.returnValue = patient;
  });

}


module.exports = { getPatients, addPatient }