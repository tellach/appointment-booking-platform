// Modules to control application life and create native browser window
const electron = require("electron");
const { Op } = require("sequelize");
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { getPatients, addPatient, deletePatient } = require('./controllers/patientController')
const { getAppointments, addAppointment, getAppointmentsByPatient, getCurrentDayAppointments, deleteAppointment, updateAppointmentDate } = require('./controllers/appointmentController')
const Window = require('./helpers/Window')
const ipc = electron.ipcMain;
const dialog = require('electron').dialog;
const { Patient, Appointment } = require('./config')

const url = require('url')
const fs = require('fs')
const os = require('os')




app.allowRendererProcessReuse = false;



function main() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join('views', 'index.html'))
  mainWindow.maximize()
  // Open the DevTools.
  mainWindow.webContents.openDevTools()




   ////////////////////////////////// getPatientAppointment /////////////////////////////////////
   var appointmentId;

   ipc.on('getAppoitmentPatientPage', (event,arg) =>{
     appointmentId = arg['id']
     event.returnValue = appointmentId;

   })
  
   ipc.on('getPatientAppointment1', (event,arg) =>{
     Appointment.findOne({ where: { id: appointmentId }, raw : true,      
       include: [{
       model: Patient
     }]
    }).then(appointment => {
       event.returnValue = appointment;
     }).catch((err) => console.log(err))
   })

  ////////////////////////////////// getAppointmentsByDate /////////////////////////////////////

  ipc.on('getAppointmentsByDate', (event, arg)=>{
    date = arg['date']
    console.log(date)
    Appointment.findAll({where: { date: date },raw : true,
      include: [{
      model: Patient
    }]
  }).then(appointments => {

      event.returnValue = appointments;
    }).catch((err) => console.log(err))
  })


  
  ////////////////////////////////// addAppointment /////////////////////////////////////

  var patientId3;
  let addAppointmentWin
  ipc.on('addAppointmentPage', (event, arg) => {
    patientId3 = arg['id']
    if (!addAppointmentWin) {
      addAppointmentWin = new Window({
        file: path.join('views', 'addAppointment.html'),
        width: 500,
        height: 600,
        parent: mainWindow
      })

      addAppointmentWin.on('close', () => {
        addAppointmentWin = null
      })
    }
    // for synchronization  
    event.returnValue = patientId3
  })

  ipc.on('addAppointment', (event, arg) => {
    title = arg['title']
    date = arg['date'].split('/')
    time = arg['time'].split(':')
    date = date.map(e => parseInt(e))
    time = time.map(e => parseInt(e))
    datetime = new Date(date[2],date[0] - 1,date[1],time[0] - 1,time[1],0)
    console.log(datetime)
    Appointment.create({
      title: title,
      date: datetime,
      patientId: patientId3


    }).then(() => {
      mainWindow.send('updatedAppointments')
      addAppointmentWin.close()
      console.log('updatedAppointments is sent !')
    });

  })

  ////////////////////////////////// updatePatient /////////////////////////////////////
  var patientId2;
  let updatePatientWin
  ipc.on('updatePatientPage', (event, arg) => {
    console.log(arg)
    patientId2 = arg['id']
    if (!updatePatientWin) {
      updatePatientWin = new Window({
        file: path.join('views', 'updatePatient.html'),
        width: 500,
        height: 700,
        parent: mainWindow
      })

      updatePatientWin.on('close', () => {
        updatePatientWin = null
      })
    }
    // for synchronization  
    event.returnValue = patientId2
  })

  ////////////////////////////////// updatePatient /////////////////////////////////////
  var AppoitmentId2
  let updateAppoitmentWin
  ipc.on('updateAppoitmentPage', (event, arg) => {
    console.log('updateAppoitmentPage recieved with '+arg)
    AppoitmentId2 = arg['id']
    if (!updateAppoitmentWin) {
      updateAppoitmentWin = new Window({
        file: path.join('views', 'updateAppoitment.html'),
        width: 500,
        height: 700,
        parent: mainWindow
      })

      updateAppoitmentWin.on('close', () => {
        updateAppoitmentWin = null
      })
    }
    // for synchronization  
    event.returnValue = AppoitmentId2
  })



  ipc.on('getPatientById', (event, arg) => {
    Patient.findOne({ where: { id: patientId2 }, raw: true }).then(patien => {

      event.returnValue = patien;
    }).catch((err) => console.log(err))
  })

  ipc.on('getAppointmentById', (event, arg) => {
    Appointment.findOne({ where: { id: AppoitmentId2 }, raw: true }).then(app => {

      event.returnValue = app;
    }).catch((err) => console.log(err))
  })


  ipc.on('updatePatient', (event, arg) => {
    firstName = arg['firstName']
    lastName = arg['lastName']
    dateOfBirth = arg['dateOfBirth']
    gender = arg['gender']
    Patient.findOne({
      where: {
        id: patientId2 // deletes all pugs whose age is 7
      }
    }).then((patientfound) => {
      if (patientfound) {
        Patient.update(
          {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            gender: gender
          },
          {
            where: {
              id: patientId2
            }
          }).then(() => {
            mainWindow.send('updatedPatients')
            updatePatientWin.close()
            event.returnValue = 'update successfully'
          })
          .catch((err) => event.returnValue = 'error')
      }
      else {
        event.returnValue = 'Appointment not found'
      }
    })
  })

  ipc.on('updateAppointment', (event, arg) => {
    title = arg['title']
    date = arg['date'].split('/')
    time = arg['time'].split(':')
    date = date.map(e => parseInt(e))
    time = time.map(e => parseInt(e))
    datetime = new Date(date[2],date[0] - 1,date[1],time[0] - 1,time[1],0)

    Appointment.findOne({
      where: {
        id: AppoitmentId2 
      }
    }).then((appfound) => {
      if (appfound) {
        Appointment.update(
          {
            title: title,
            date: datetime,
          },
          {
            where: {
              id: AppoitmentId2
            }
          }).then(() => {
            getPatientAppointmentWin.send('updatedAppointments')
            updateAppoitmentWin.close()
            event.returnValue = 'update successfully'
          })
          .catch((err) => event.returnValue = 'error')
      }
      else {
        event.returnValue = 'Appointment not found'
      }
    })
  })
  

  ////////////////////////////////// getPatientAppointments /////////////////////////////////////


  var patientId1;
  let getPatientAppointmentWin
  ipc.on('getPatientAppointmentsPage', (event, arg) => {
    console.log(arg)
    patientId1 = arg['id']
    if (!getPatientAppointmentWin) {
      getPatientAppointmentWin = new Window({
        file: path.join('views', 'patient.html'),
        width: 1200,
        height: 700,
        //parent: mainWindow
      })

      getPatientAppointmentWin.on('close', () => {
        getPatientAppointmentWin = null
      })
    }
    // for synchronization  
    event.returnValue = patientId1
  })

  ipc.on('getPatientAppointments', (event, arg) => {
    Appointment.findAll({
      where: { patientId: patientId1 }, raw: true,
      include: [{
        model: Patient
      }]
    }).then(appointments => {
      event.returnValue = appointments;
    }).catch((err) => console.log(err))
  })


  ////////////////////////////////// createPatient /////////////////////////////////////


  let addPatientWin
  ipc.on('createPatient', () => {
    if (!addPatientWin) {
      addPatientWin = new Window({
        file: path.join('views', 'addPatient.html'),
        width: 500,
        height: 700,
        parent: mainWindow
      })

      addPatientWin.on('close', () => {
        addPatientWin = null
      })
    }
  })


  ipc.on('addPatient', (event, arg) => {
    firstName = arg['firstName']
    lastName = arg['lastName']
    dateOfBirth = arg['dateOfBirth']
    gender = arg['gender']

    Patient.create({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gender: gender

    }).then(() => {
      mainWindow.send('updatedPatients')
      addPatientWin.close()
    });

  })
    ////////////////////////////////////////printAppointment//////////////////////////////////////////
    let appointmentWin
    ipc.on('imprimerPage', (event, arg) => {
      appointmentId = arg['id']
      if (!appointmentWin) {
        appointmentWin = new Window({

          file: path.join('views', 'appointment.html'),
          show:false,
          width: 500,
          height: 600,
          parent: mainWindow
        })
  
        appointmentWin.on('close', () => {
          appointmentWin = null
        })
      }
      // for synchronization  
      event.returnValue = appointmentId;
    })

    var delayInMilliseconds = 1000; //1 second


    ipc.on('print-to-pdf', function (event) {
      appointmentWin.webContents.print({printBackground: true, landscape: true}, function (error, data) {
       if (error) appointmentWin.close()
      })
    })

}



ipc.on('getPatients', getPatients)
ipc.on('getAppointments', getAppointments)

ipc.on('getAppointmentsByPatient', getAppointmentsByPatient)
ipc.on('getCurrentDayAppointments', getCurrentDayAppointments)
ipc.on('deleteAppointment', deleteAppointment)
ipc.on('deletePatient', deletePatient)
ipc.on('updateAppointmentDate', updateAppointmentDate)








// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(main)

// Quit when all windows are closed.`
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) main()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.