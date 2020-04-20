const ipc = require('electron').ipcRenderer;

function loadAppointment(){
    const app = ipc.sendSync('getAppointmentById')
    document.getElementById('title').value = app.title
   
    document.getElementById('date').value = (parseInt(app.date.getMonth())+1) + '/' + app.date.getDate()  +'/'+ app.date.getFullYear()
    document.getElementById('time').value = (app.date.getHours()>9?app.date.getHours()-1:'0'+(app.date.getHours()-1)) + ':' + (app.date.getMinutes()>9?app.date.getMinutes():'0'+app.date.getMinutes())
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

    
