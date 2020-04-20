const { Patient } = require('./../config')

function getPatients(event, arg) {
  Patient.findAll({ raw: true }).then(patiens => {
    event.returnValue = patiens;
  }).catch((err) => console.log(err))

}


function addPatient(event, arg) {
  firstName = arg['firstName']
  lastName = arg['lastName']
  dateOfBirth = arg['dateOfBirth']
  gender = arg['gender']

  Patient.create({
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    gender: gender

  }).then(patient => {
    event.returnValue = patient;
  });

}

function deletePatient(event, patientId) {
  Patient.destroy(
    {
      where: {
        id: patientId
      },

    }).then(() => event.returnValue = 'delete successfully')
    .catch((err) => event.returnValue = 'error')
}


module.exports = { getPatients, addPatient, deletePatient }