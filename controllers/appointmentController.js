const {Appointment,Patient} = require('./../config')


function getAppointments(event, arg) {
    Appointment.findAll().then(appointments => {
      
      event.returnValue =appointments;
    }).catch((err)=>console.log(err))
    
  }
  function getAppointmentsByPatient(event, arg) {
    patientId = 1
    Appointment.findAll({where: {patientId:patientId}}).then(appointments => {
      
      event.returnValue =appointments;
    }).catch((err)=>console.log(err))
    
  }

  function getCurrentDayAppointments(event, arg) {
    currentDate = Date.now()
    Appointment.findAll({where: {Date:currentDate}}).then(appointments => {
      
      event.returnValue =appointments;
    }).catch((err)=>console.log(err))
    
  }

  function addAppointment(event, arg) {
    title = "rdv3"
    DateA = new Date('2020-12-17T03:24:00');
    patientId = 1
    Patient.findOne({where: {id:patientId}}).then((patientFound)=>{
        if (patientFound) {
            Appointment.create({
                title: title,
                Date: DateA,
                patientId: patientId
            
              }).then(appointment => {
                event.returnValue = appointment;
              });
        }
        else event.returnValue = 'error'

    })
  }

module.exports = {getAppointments,addAppointment,getAppointmentsByPatient,getCurrentDayAppointments}