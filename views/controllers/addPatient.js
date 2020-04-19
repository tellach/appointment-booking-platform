const ipc = require('electron').ipcRenderer;

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    var formdata = new FormData(document.querySelector('form'))
    data = {
        'firstName'     :  formdata.get('firstName'),
        'lastName'      :  formdata.get('lastName'),
        'dateOfBirth'   :  formdata.get('dateOfBirth'),
        'gender'        :  formdata.get('gender'),
    }
    ipc.sendSync('addPatient',data)
})
    
