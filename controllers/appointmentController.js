const { Appointment, Patient } = require('./../config')
const { Op } = require("sequelize");

function getAppointments(event, arg) {
  Appointment.findAll().then(appointments => {

    event.returnValue = appointments;
  }).catch((err) => console.log(err))

}
function getAppointmentsByPatient(event, arg) {
  patientId = 1
  Appointment.findAll({ where: { patientId: patientId } }).then(appointments => {

    event.returnValue = appointments;
  }).catch((err) => console.log(err))

}

function getCurrentDayAppointments(event, arg) {
  const startDate  = new Date()
  const endDate  = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),25,59,0,1)

  Appointment.findAll({
    where: {
      date: {[Op.between]: [startDate, endDate], }
      }
  }).then(appointments => {
       event.returnValue = appointments
  }).catch((err) => console.log(err))

}
function updateAppointmentDate(event, arg) {
  appointmentId = 3
  const date = new Date()
  Appointment.findOne({
    where: {
      id: appointmentId // deletes all pugs whose age is 7
    }
  }).then((appointmentfound) => {
    if (appointmentfound) {
      Appointment.update(
        {
          date :date
        },
        {
          where: {
            id: appointmentId
          }
        }).then(() => event.returnValue = 'update successfully' )
        .catch((err) => event.returnValue = 'error')
    }
    else {
      event.returnValue = 'Appointment not found'
    }
  }

  )

};

function addAppointment(event, arg) {
  var today = new Date();

  title = "rdv6"
  date = new Date(today.getFullYear(),today.getMonth(),today.getDate(),10,0,0,1)
  patientId = 1
  Patient.findOne({ where: { id: patientId } }).then((patientFound) => {
    if (patientFound) {
      Appointment.create({
        title: title,
        date: date,
        patientId: patientId

      }).then(appointment => {
        event.returnValue = appointment;
      });
    }
    else event.returnValue = 'error'

  })
}

function deleteAppointment(event, arg) {

  appointmentId = 3
  Appointment.destroy(
    {
      where: {
        id: appointmentId
      },

    }).then(() => event.returnValue = 'delete successfully')
    .catch((err) => event.returnValue = 'error')
}





module.exports = { getAppointments, addAppointment, getAppointmentsByPatient, getCurrentDayAppointments, updateAppointmentDate, deleteAppointment }