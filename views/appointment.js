const ipc = require('electron').ipcRenderer;

function getPatientAppointment(){
    const appoitment = ipc.sendSync('getPatientAppointment1');
    console.log('dhsdjvkdsv')
    
    profileHtml = ``
    appoitmentItem = ``

    if (appoitment){
        app = appoitment
        
        profileHtml = `
        <div class="card mb-4">
            <div class="card-body">
                <div class="text-center">
                    <img alt="Profile" src="img/People-Patient-Male-icon.png" class="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail">
                    <p class="list-item-heading mb-1">${app['patient.lastName']+' '+app['patient.firstName']}</p>
                    <p class="mb-4 text-muted text-small">Né le ${app['patient.dateOfBirth']}</p>
                </div>
            </div>
        </div>
` 
    appoitmentItem =`
    <div class="card d-flex flex-row mb-3">
        <div class="d-flex flex-grow-1 min-width-zero">
            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                <a class="list-item-heading mb-1 truncate w-20 w-xs-100" href="#">
                    ${app.title}
                </a>
                <p class="mb-1 text-muted text-small w-30 w-xs-100">${app.date.split(' ')[0] + ' ' +app.date.split(' ')[1].split('.')[0]}</p>
            </div>
        </div>
    </div>
`
    }

    const patientAppointments = document.getElementById('patientAppointments')
    const profile = document.getElementById('profile')

    patientAppointments.innerHTML =  appoitmentItem
    profile.innerHTML = profileHtml
}


document.addEventListener("DOMContentLoaded", function(){
    getPatientAppointment()
});


