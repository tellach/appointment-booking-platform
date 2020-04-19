const ipc = require('electron').ipcRenderer;

function loadPatients(){
    const patient = ipc.sendSync('getPatientById')
    console.log(patient.id)
    document.getElementById('lastName').value = patient.lastName
    document.getElementById('firstName').value = patient.firstName
    document.getElementById('dateOfBirth').value = patient.dateOfBirth.split(' ')[0]
    document.getElementById('gender').value = patient.gender

}


document.addEventListener("DOMContentLoaded", function(){
    loadPatients()
});

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    var formdata = new FormData(document.querySelector('form'))
    data = {
        'firstName'     :  formdata.get('firstName'),
        'lastName'      :  formdata.get('lastName'),
        'dateOfBirth'   :  formdata.get('dateOfBirth'),
        'gender'        :  formdata.get('gender'),
    }
    ipc.sendSync('updatePatient',data)
})

    
