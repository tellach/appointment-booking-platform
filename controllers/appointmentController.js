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
    const date = new Date(Date.now())
    //currentDate = '\'%'+date.getFullYear().toString()+'-0'+(date.getMonth()+1).toString()+'-'+date.getDate().toString()+''
    Appointment.findAll({where: {date:date}}).then(appointments => {
      
      event.returnValue =appointments;
    }).catch((err)=>console.log(err))
  
  }
  function updateAppointment (event, arg){
            appointmentId = 1
            Appointment.findOne(        {
                where: {
                    id: appointmentId // deletes all pugs whose age is 7
                }
            }).then((appointmentfound)=>{
                    if(appointmentfound)
                    {
                        Appointment.update(
                            req.body,
                            {
                                where: {
                                    id: appointmentId
                                }
                            }).then(()=> res.json({message:'update successfully'}))
                            .catch((err)=>res.send(err))
                    }
                    else {
                        res.send('Appointment not found')
                    }
                }

            )

};

  function addAppointment(event, arg) {
    title = "rdv1"
    date = new Date(Date.now())
    patientId = 1
    Patient.findOne({where: {id:patientId}}).then((patientFound)=>{
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

  function deleteAppointment (event, arg){

            appointmentId = 1
            Appointment.destroy(
                {
                    where: {
                        id: appointmentId
                    },

                }).then(()=> event.returnValue = 'delete successfully')
                .catch((err)=> event.returnValue = 'error')
        }





module.exports = {getAppointments,addAppointment,getAppointmentsByPatient,getCurrentDayAppointments,updateAppointment,deleteAppointment}