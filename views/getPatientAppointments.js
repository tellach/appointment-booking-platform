const ipc = require('electron').ipcRenderer;

function getPatientAppointments(id){
    const appoitments = ipc.sendSync('getPatientAppointments');
    
    profileHtml = ``

    if (appoitments[0]){
        app = appoitments[0]
        app['patient.lastName']+' '+app['patient.firstName']
        
        profileHtml = `
        <div class="card mb-4">
            <div class="card-body">
                <div class="text-center">
                    <img alt="Profile" src="img/People-Patient-Male-icon.png" class="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail">
                    <p class="list-item-heading mb-1">${app['patient.lastName']+' '+app['patient.firstName']}</p>
                    <p class="mb-4 text-muted text-small">Né le ${app['patient.dateOfBirth'].split(' ')[0]}</p>
                </div>
            </div>
        </div>
    ` 
    }
    
    let appoitmentsItems = appoitments.reduce((html,app)=>{
        html +=`
            <div class="card d-flex flex-row mb-3">
                <div class="d-flex flex-grow-1 min-width-zero">
                    <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                        <a class="list-item-heading mb-1 truncate w-20 w-xs-100" href="#">
                            ${app.title}
                        </a>
                        <p class="mb-1 text-muted text-small w-30 w-xs-100">${app.date.split(' ')[0] + ' ' +app.date.split(' ')[1].split('.')[0]}</p>
                        <button type="button" class="btn btn-xs btn-outline-secondary" onClick="updateAppoitment(${app.id})" >Modifier</button>
                        <button type="button" class="btn btn-xs btn-outline-danger" onClick="deleteAppoitment(${app.id})" >Supprimer</button>
                    </div>
                </div>
            </div>
        `
        return html
    }, '')
    const patientAppointments = document.getElementById('patientAppointments')
    const profile = document.getElementById('profile')

    patientAppointments.innerHTML = appoitmentsItems == '' ? 'Le patient n\' aucun rendez-vous' : appoitmentsItems
    profile.innerHTML = profileHtml
}


document.addEventListener("DOMContentLoaded", function(){
    getPatientAppointments()
    ipc.on('updatedAppointments',()=>{
        getPatientAppointments()
    })
});

function deleteAppoitment(id){
    console.log('deleteAppointment sent !')
    ipc.sendSync('deleteAppointment',id)
    getPatientAppointments()
}

function updateAppoitment(id){
    data = {
        'id': id,
    }
    ipc.sendSync('updateAppoitmentPage',data)
}

    
module.exports = { getPatientAppointments }