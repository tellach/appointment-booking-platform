const ipc = require('electron').ipcRenderer;

function loadAppointment(){
    const rdv = ipc.sendSync('getAppointmentById')
    document.getElementById('title').value = rdv.title
    document.getElementById('date').value = rdv.date.split(' ')[0]
}


document.addEventListener("DOMContentLoaded", function(){
    loadAppointment()
});

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    var formdata = new FormData(document.querySelector('form'))
    data = {
        'title'     :  formdata.get('title'),
        'date'      :  formdata.get('date'),
    }
    ipc.sendSync('updateAppointment',data)
})

    
