const ipc = require('electron').ipcRenderer;

const getPatients = document.getElementById('getPatients');
const getAppointments = document.getElementById('getAppointments');
const addPatient = document.getElementById('addPatient');
const addAppointment = document.getElementById('addAppointment');
const getAppointmentsByPatient = document.getElementById('getAppointmentsByPatient');
const getCurrentDayAppointments = document.getElementById('getCurrentDayAppointments');
const deleteAppointment = document.getElementById('deleteAppointment');







getPatients.addEventListener('click', function(){
    const reply = ipc.sendSync('getPatients');
    console.log(reply);
    
})
addPatient.addEventListener('click', function(){
    const reply = ipc.sendSync('addPatient');
    console.log(reply);
    
})
getAppointments.addEventListener('click', function(){
    const reply = ipc.sendSync('getAppointments');
    console.log(reply);
    
})
addAppointment.addEventListener('click', function(){
    const reply = ipc.sendSync('addAppointment');
    console.log(reply);
    
})
getAppointmentsByPatient.addEventListener('click', function(){
    const reply = ipc.sendSync('getAppointmentsByPatient');
    console.log(reply);
    
})
getCurrentDayAppointments.addEventListener('click', function(){
    const reply = ipc.sendSync('getCurrentDayAppointments');
    console.log(reply);
    
})
deleteAppointment.addEventListener('click', function(){
    const reply = ipc.sendSync('deleteAppointment');
    console.log(reply);
    
})