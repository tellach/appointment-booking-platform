const { Patient } = require('./../config')

function getPatients(event, arg) {
  Patient.findAll().then(patiens => {

    event.returnValue = patiens;
  }).catch((err) => console.log(err))

}

function addPatient(event, arg) {
  firstName = "adel"
  lastName = "namani"
  DateOfBirth = Date.now()

  Patient.create({
    firstName: firstName,
    lastName: lastName,
    DateOfBirth: DateOfBirth

  }).then(patient => {
    event.returnValue = patient;
  });

}


module.exports = { getPatients, addPatient }