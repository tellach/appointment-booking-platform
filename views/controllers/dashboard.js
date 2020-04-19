const ipc = require('electron').ipcRenderer;

function loadTodayAppointments(){
    const appoitments = ipc.sendSync('getCurrentDayAppointments');
    console.log(appoitments)
    const appoitmentsItems = appoitments.reduce((html,app)=>{
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
                                                ${app.date.split(' ')[1].split('.')[0]}
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
