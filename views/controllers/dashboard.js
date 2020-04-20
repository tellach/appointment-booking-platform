const ipc = require('electron').ipcRenderer;

function loadTodayAppointments(){
    const appoitments = ipc.sendSync('getCurrentDayAppointments');
    let date
    const appoitmentsItems = appoitments.reduce((html,app)=>{
        date = date = (parseInt(app.date.getMonth())+1) + '/' + app.date.getDate()  +'/'+ app.date.getFullYear() +' '+ (app.date.getHours()>9?app.date.getHours()-1:'0'+(app.date.getHours()-1)) + ':' + (app.date.getMinutes()>9?app.date.getMinutes():'0'+app.date.getMinutes())
        html +=`
        <div class="d-flex flex-row mb-3">
                                    <a class="d-block position-relative" href="#">

                                        <img src="${app['patient.gender'] == 'Homme' ? 'img/People-Patient-Male-icon.png' : 'img/People-Patient-Female-icon.png'}" alt="Marble Cake"
                                        class="list-thumbnail border-0"/>

                                    </a>
                                    <div class="pl-3 pt-2 pr-2 pb-2">
                                        <a href="#">
                                            <p class="list-item-heading">${app['patient.lastName']+' '+app['patient.firstName']}</p>
                                            <div class="pr-4 d-none d-sm-block">
                                                <p class="text-muted mb-1 text-small">${app.title}</p>
                                            </div>
                                            <div class="text-primary text-small font-weight-medium d-none d-sm-block">
                                                ${date}
                                            </div>
                                        </a>
                                    </div>
        </div>
        `
        return html
    }, '')
    const currentDayAppointments = document.getElementById('currentDayAppointments');
    currentDayAppointments.innerHTML = appoitmentsItems
}


document.addEventListener("DOMContentLoaded", function(){
    loadTodayAppointments()
});
    
module.exports = { loadTodayAppointments }
