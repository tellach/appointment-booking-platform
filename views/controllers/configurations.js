const ipc = require('electron').ipcRenderer;

function updateConfigsForm (){
    let data = require('../config.json')
    document.getElementById('medical_office_address').value = data.medical_office_address
    document.getElementById('medical_office_phone_number').value = data.medical_office_phone_number
    document.getElementById('medical_office_name').value = data.medical_office_name
    document.getElementById('doctor_name').value = data.doctor_name
}

document.addEventListener("DOMContentLoaded", function(){
    updateConfigsForm()
})

document.querySelector('form').addEventListener('submit',function(e){
    e.preventDefault();
    var formdata = new FormData(document.querySelector('form'))
    data = {
        'medical_office_address'     :  formdata.get('medical_office_address'),
        'medical_office_phone_number'      :  formdata.get('medical_office_phone_number'),
        'medical_office_name'   :  formdata.get('medical_office_name'),
        'doctor_name'        :  formdata.get('doctor_name'),
    }
    console.log('updateConfigs is sent!')
    ipc.sendSync('updateConfigs',data)
})