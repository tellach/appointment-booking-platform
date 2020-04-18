const ipc = require('electron').ipcRenderer;

function loadAppointment(){
    const rdv = ipc.sendSync('getAppointmentById')
    document.getElementById('title').value = rdv.title
    document.getElementById('date').value = rdv.date.split(' ')[0]
    document.getElementById('time').value = rdv.date.split(' ')[1].split(':').slice(0,2).join(':')
    return rdv.date.split(' ')[1]
}

document.addEventListener("DOMContentLoaded", function(){
    t = loadAppointment()

    $('.timepicker').timepicker({
        timeFormat: 'H:mm ',
        interval: 15,
        minTime: '8',
        maxTime: '6:00pm',
        defaultTime: t,
        startTime: '8:00',
        dropdown: true,
        scrollbar: true
    });
});

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    var formdata = new FormData(document.querySelector('form'))
    data = {
        'title'     :  formdata.get('title'),
        'date'      :  formdata.get('date'),
        'time'      :  formdata.get('time'),
    }
    ipc.sendSync('updateAppointment',data)
})

    
