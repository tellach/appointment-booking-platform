const ipc = require('electron').ipcRenderer;

function getPatientAppointment(){
    const app = ipc.sendSync('getPatientAppointment1');

    document.getElementById('nom').innerHTML = app['patient.lastName']
    document.getElementById('prenom').innerHTML = app['patient.firstName']
    let dateOfBirth = (parseInt(app['patient.dateOfBirth'].getMonth())+1) + '/' + app['patient.dateOfBirth'].getDate()  +'/'+ app['patient.dateOfBirth'].getFullYear()
    document.getElementById('ddn').innerHTML = dateOfBirth
    document.getElementById('drdv').innerHTML = (parseInt(app.date.getMonth())+1) + '/' + app.date.getDate()  +'/'+ app.date.getFullYear()
    document.getElementById('hrdv').innerHTML = (app.date.getHours()>9?app.date.getHours()-1:'0'+(app.date.getHours()-1)) + ':' + (app.date.getMinutes()>9?app.date.getMinutes():'0'+app.date.getMinutes())
    document.getElementById('trdv').innerHTML = app.title
    
    const data = require('../config.json')
    document.getElementById('med').innerHTML = data.doctor_name
    document.getElementById('cabinet').innerHTML = data.medical_office_name
    document.getElementById('address').innerHTML = data.medical_office_address
    document.getElementById('phone').innerHTML = data.medical_office_phone_number

    var nowDate = new Date(); 
    var date = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear(); 

    document.getElementById('today').innerHTML = date
}


document.addEventListener("DOMContentLoaded", function(){
    getPatientAppointment()
});


