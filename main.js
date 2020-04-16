// Modules to control application life and create native browser window
const electron = require("electron");
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { getPatients, addPatient, deletePatient } = require('./controllers/patientController')
const { getAppointments, addAppointment, getAppointmentsByPatient, getCurrentDayAppointments, deleteAppointment, updateAppointmentDate } = require('./controllers/appointmentController')
const Window = require('./helpers/Window')
const ipc = electron.ipcMain;
const dialog = require('electron').dialog;
const { Patient, Appointment } = require('./config')




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

  ipc.on('addPatient', (event, arg)=>{
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
      console.log('updatedPatients is sent !')
    });
  
  })

}

ipc.on('getPatients', getPatients)
ipc.on('getAppointments', getAppointments)



ipc.on('addAppointment', addAppointment)
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
