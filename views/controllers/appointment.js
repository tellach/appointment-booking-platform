const ipc = require('electron').ipcRenderer;

function getPatientAppointment(){
    const app = ipc.sendSync('getPatientAppointment1');

    document.getElementById('nom').innerHTML = app['patient.lastName']
    document.getElementById('prenom').innerHTML = app['patient.firstName']
    document.getElementById('ddn').innerHTML = app['patient.dateOfBirth'].split(' ')[0]
    document.getElementById('drdv').innerHTML = app.date.split(' ')[0] 
    document.getElementById('hrdv').innerHTML = app.date.split(' ')[1].split(':')[0] + ':' +  app.date.split(' ')[1].split(':')[1]
    document.getElementById('trdv').innerHTML = app.title
    
    const data = require('../config.json')
    document.getElementById('med').innerHTML = data.doctor_name
    document.getElementById('cabinet').innerHTML = data.medical_office_name
    document.getElementById('address').innerHTML = data.medical_office_address
    document.getElementById('phone').innerHTML = data.medical_office_phone_number

    var nowDate = new Date(); 
    var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 

    document.getElementById('today').innerHTML = date
}


document.addEventListener("DOMContentLoaded", function(){
    getPatientAppointment()
});


