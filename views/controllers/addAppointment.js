const ipc = require('electron').ipcRenderer;

$(document).ready(function(){
    $('.timepicker').timepicker({
        timeFormat: 'H:mm ',
        interval: 15,
        minTime: '8',
        maxTime: '6:00pm',
        defaultTime: '8',
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
        'time'      :  formdata.get('time')
    }
    ipc.sendSync('addAppointment',data)
})
    