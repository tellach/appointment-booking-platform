const ipc = require('electron').ipcRenderer;

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    var formdata = new FormData(document.querySelector('form'))
    data = {
        'title'     :  formdata.get('title'),
        'date'      :  formdata.get('date'),

    }
    ipc.sendSync('addAppointment',data)
})
    