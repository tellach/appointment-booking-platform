const ipc = require('electron').ipcRenderer;

function getPatientAppointment(){
    const app = ipc.sendSync('getPatientAppointment1');

    document.getElementById('nom').innerHTML = app['patient.lastName']
    document.getElementById('prenom').innerHTML = app['patient.firstName']
    document.getElementById('ddn').innerHTML = app['patient.dateOfBirth'].split(' ')[0]
    document.getElementById('drdv').innerHTML = app.date.split(' ')[0] 
    document.getElementById('hrdv').innerHTML = app.date.split(' ')[1].split(':')[0] + ':' +  app.date.split(' ')[1].split(':')[1]
    document.getElementById('trdv').innerHTML = app.title
    
}


document.addEventListener("DOMContentLoaded", function(){
    getPatientAppointment()
});


